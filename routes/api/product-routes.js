const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// GET all products
router.get("/", async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });

    if (!productData) {
      res.status(404).json({ message: "No product found with this id!" });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new product
router.post("/", async (req, res) => {
  try {
    const productData = await Product.create(req.body);

    // If there are product tags, bulk create in the ProductTag model
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: productData.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update a product by ID
router.put("/:id", async (req, res) => {
  try {
    // Update product data
    await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // Find all associated tags from ProductTag
    const productTags = await ProductTag.findAll({
      where: { product_id: req.params.id },
    });

    // Create an array of current tag_ids
    const productTagIds = productTags.map(({ tag_id }) => tag_id);

    // Filter out the ones that are not in the new list of tag IDs
    const newProductTags = req.body.tagIds
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id,
        };
      });

    // Determine which tags to remove
    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id);

    // Run both actions: removing and adding tags
    await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);

    res.status(200).json({ message: "Product updated successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a product by ID
router.delete("/:id", async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Tag, through: ProductTag }],
    });

    if (!productData) {
      res.status(404).json({ message: "No products found with this id!" });
      return;
    }
    const tags = productData.tags.map((tag) => {
      return tag.id;
    });
    await ProductTag.destroy({ where: { id: tags } });
    await productData.destroy();

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
