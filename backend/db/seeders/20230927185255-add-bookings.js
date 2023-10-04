'use strict';

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const bookings = [
  {
    spotId: 5,
    userId: 1,
    startDate: "2024-02-15",
    endDate: "2024-02-20"
  },
  {
    spotId: 1,
    userId: 2,
    startDate: "2024-03-10",
    endDate: "2024-03-15"
  },
  {
    spotId: 4,
    userId: 3,
    startDate: "2024-04-05",
    endDate: "2024-04-10"
  }
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
    await Booking.bulkCreate(bookings, {validate: true});
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
