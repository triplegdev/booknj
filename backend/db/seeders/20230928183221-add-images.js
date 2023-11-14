'use strict';

const { Image } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const images = [
  { "imageableId": 1, "imageableType": "Spot", "url": "http://booknj.aa/images/spot1.jpg", "preview": true },
  { "imageableId": 2, "imageableType": "Spot", "url": "http://booknj.aa/images/spot2.jpg", "preview": true },
  { "imageableId": 3, "imageableType": "Spot", "url": "http://booknj.aa/images/spot3.jpg", "preview": true },
  { "imageableId": 4, "imageableType": "Spot", "url": "http://booknj.aa/images/spot4.jpg", "preview": true },
  { "imageableId": 5, "imageableType": "Spot", "url": "http://booknj.aa/images/spot5.jpg", "preview": true },
  { "imageableId": 6, "imageableType": "Spot", "url": "http://booknj.aa/images/spot6.jpg", "preview": true },
  { "imageableId": 1, "imageableType": "Review", "url": "http://booknj.aa/images/review1-user2-spot1.jpg", "preview": true },
  { "imageableId": 2, "imageableType": "Review", "url": "http://booknj.aa/images/review2-user1-spot2.jpg", "preview": false },
  // { "imageableId": 3, "imageableType": "Review", "url": "http://booknj.aa/images/review3-user2-spot3.jpg", "preview": true },
  // { "imageableId": 4, "imageableType": "Review", "url": "http://booknj.aa/images/review4-user1-spot4.jpg", "preview": false },
  // { "imageableId": 5, "imageableType": "Review", "url": "http://booknj.aa/images/review5-user2-spot5.jpg", "preview": true },
  { "imageableId": 3, "imageableType": "Review", "url": "http://booknj.aa/images/review3-user3-spot6.jpg", "preview": false },
//   { "imageableId": 7, "imageableType": "Review", "url": "http://booknj.aa/images/review7-user3-spot1.jpg", "preview": true },
//   { "imageableId": 8, "imageableType": "Review", "url": "http://booknj.aa/images/review8-user3-spot2.jpg", "preview": false }
]


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Image.bulkCreate(images, {validate: true});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Images';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      imageableType: {[Op.in]: ['Spot','Review']}
    }, {});
  }
};
