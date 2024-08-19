const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Electronics',
  },
  {
    category_name: 'Clothing',
  },
  {
    category_name: 'Home Appliances',
  },
  {
    category_name: 'Books',
  },
  {
    category_name: 'Toys',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;