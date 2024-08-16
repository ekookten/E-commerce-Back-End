const { Product } = require('../models');

const productData = [
  {
    product_name: 'Laptop',
    price: 999.99,
    stock: 20,
    category_id: 1
  },
  {
    product_name: 'T-Shirt',
    price: 19.99,
    stock: 50,
    category_id: 2
  },
  {
    product_name: 'Microwave',
    price: 149.99,
    stock: 15,
    category_id: 3
  }
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
