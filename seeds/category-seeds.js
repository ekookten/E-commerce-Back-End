const { Category } = require('../models');

const categoryData = [
  { category_name: 'Electronics' },
  { category_name: 'Clothing' },
  { category_name: 'Home Appliances' }
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
