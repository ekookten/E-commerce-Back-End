const { Tag } = require('../models');

const tagData = [
  { tag_name: 'New' },
  { tag_name: 'Sale' },
  { tag_name: 'Popular' }
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;
