const seedCategories = require("./category-seeds");
const seedProducts = require("./product-seeds");
const seedTags = require("./tag-seeds");
const seedProductTags = require("./product-tag-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n--- Database Synced ---\n");

  await seedCategories();
  console.log("\n--- Categories Seeded ---\n");

  await seedProducts();
  console.log("\n--- Products Seeded ---\n");

  await seedTags();
  console.log("\n--- Tags Seeded ---\n");

  await seedProductTags();
  console.log("\n--- Product Tags Seeded ---\n");

  process.exit(0);
};

seedAll();
