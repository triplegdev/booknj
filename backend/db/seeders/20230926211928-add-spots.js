'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const spotsData = [
  {
    ownerId: 1,
    address: "123 Riverside Drive",
    city: "Jersey City",
    state: "New Jersey",
    country: "United States of America",
    lat: 40.728157,
    lng: -74.077642,
    name: "Jersey City Retreat",
    description: "A stylish retreat in Jersey City, NJ",
    price: 125
  },
  {
    ownerId: 2,
    address: "456 Downtown Street",
    city: "Newark",
    state: "New Jersey",
    country: "United States of America",
    lat: 40.735657,
    lng: -74.172366,
    name: "Downtown Newark Oasis",
    description: "An urban oasis in Newark, NJ",
    price: 135
  },
  {
    ownerId: 3,
    address: "789 Waterfront Road",
    city: "Hoboken",
    state: "New Jersey",
    country: "United States of America",
    lat: 40.744118,
    lng: -74.032426,
    name: "Hoboken Waterfront Retreat",
    description: "Relax on the waterfront in Hoboken, NJ",
    price: 115
  },
  {
    ownerId: 2,
    address: "101 Princeton Blvd",
    city: "Princeton",
    state: "New Jersey",
    country: "United States of America",
    lat: 40.349274,
    lng: -74.651103,
    name: "Princeton Tech Haven",
    description: "Innovation hub in Princeton, NJ",
    price: 105
  },
  {
    ownerId: 3,
    address: "222 Oceanfront Avenue",
    city: "Atlantic City",
    state: "New Jersey",
    country: "United States of America",
    lat: 39.364285,
    lng: -74.422935,
    name: "Atlantic City Beachfront Bliss",
    description: "Enjoy the beach in Atlantic City, NJ",
    price: 95
  },
  {
    ownerId: 2,
    address: "333 Lakeside Road",
    city: "Asbury Park",
    state: "New Jersey",
    country: "United States of America",
    lat: 40.220215,
    lng: -74.012238,
    name: "Lakeside Escape in Asbury Park",
    description: "Relax by the lakeside in Asbury Park, NJ",
    price: 110
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
    await Spot.bulkCreate(spotsData, {validate: true});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: {[Op.in]: [1, 2, 3]}
    }, {});
  }
};
