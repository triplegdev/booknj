'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const reviews = [
  { userId: 2, spotId: 1, review: "This place is fantastic!", stars: 5 },
  { userId: 1, spotId: 2, review: "Had a great time here.", stars: 4 },
  // { userId: 2, spotId: 3, review: "Not the best experience.", stars: 2 },
  // { userId: 1, spotId: 4, review: "Amazing spot, would visit again.", stars: 5 },
  // { userId: 2, spotId: 5, review: "Average at best.", stars: 3 },
  { userId: 3, spotId: 6, review: "Lovely place for a getaway.", stars: 4 },
  // { userId: 3, spotId: 1, review: "Terrible service, avoid this place.", stars: 1 },
  // { userId: 3, spotId: 2, review: "Decent spot, had a good time.", stars: 3 }
  { userId: 3, spotId: 8, review: "Beautiful spot, perfect for a relaxing weekend.", stars: 5 },
];


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
    await Review.bulkCreate(reviews, {validate: true});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: {[Op.in]: [1, 2, 3]}
    }, {});
  }
};
