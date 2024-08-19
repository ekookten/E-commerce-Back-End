const { Tag } = require('../models');

const tagData = [
  {
    tag_name: 'On Sale',
  },
  {
    tag_name: 'New Arrival',
  },
  {
    tag_name: 'Best Seller',
  },
  {
    tag_name: 'Limited Edition',
  },
  {
    tag_name: 'Online Exclusive',
  },
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;