'use strict';

const { Image } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const images = [
  { "imageableId": 1, "imageableType": "Spot", "url": "https://i.imgur.com/t8nZyIp.jpeg", "preview": true },
  { "imageableId": 1, "imageableType": "Spot", "url": "https://i.imgur.com/PB19OaW.jpeg", "preview": false },
  { "imageableId": 1, "imageableType": "Spot", "url": "https://i.imgur.com/MVuAA9N.jpeg", "preview": false },
  { "imageableId": 1, "imageableType": "Spot", "url": "https://i.imgur.com/V1asKf9.jpeg", "preview": false },
  { "imageableId": 1, "imageableType": "Spot", "url": "https://i.imgur.com/CXEDcKt.jpeg", "preview": false },

  { "imageableId": 2, "imageableType": "Spot", "url": "https://i.imgur.com/n0kFIKG.jpeg", "preview": true },
  { "imageableId": 2, "imageableType": "Spot", "url": "https://i.imgur.com/Gova9r1.jpeg", "preview": false },
  { "imageableId": 2, "imageableType": "Spot", "url": "https://i.imgur.com/UfEY7xJ.jpeg", "preview": false },
  { "imageableId": 2, "imageableType": "Spot", "url": "https://i.imgur.com/QvpdBCX.jpeg", "preview": false },
  { "imageableId": 2, "imageableType": "Spot", "url": "https://i.imgur.com/UgXZfhI.jpeg", "preview": false },

  { "imageableId": 3, "imageableType": "Spot", "url": "https://i.imgur.com/OzAenBi.jpeg", "preview": true },
  { "imageableId": 3, "imageableType": "Spot", "url": "https://i.imgur.com/As0BeuQ.jpeg", "preview": false },
  { "imageableId": 3, "imageableType": "Spot", "url": "https://i.imgur.com/G82WuCM.jpeg", "preview": false },
  { "imageableId": 3, "imageableType": "Spot", "url": "https://i.imgur.com/A0PSOAW.jpeg", "preview": false },
  { "imageableId": 3, "imageableType": "Spot", "url": "https://i.imgur.com/inRYk6x.jpeg", "preview": false },

  { "imageableId": 4, "imageableType": "Spot", "url": "https://i.imgur.com/bxswkx7.jpeg", "preview": true },
  { "imageableId": 4, "imageableType": "Spot", "url": "https://i.imgur.com/d3SflM1.jpeg", "preview": false },
  { "imageableId": 4, "imageableType": "Spot", "url": "https://i.imgur.com/gaabytI.jpeg", "preview": false },
  { "imageableId": 4, "imageableType": "Spot", "url": "https://i.imgur.com/sRvhqEQ.jpeg", "preview": false },
  { "imageableId": 4, "imageableType": "Spot", "url": "https://i.imgur.com/abwVsoG.jpeg", "preview": false },


  { "imageableId": 5, "imageableType": "Spot", "url": "https://i.imgur.com/RW7vR05.jpeg", "preview": true },
  { "imageableId": 5, "imageableType": "Spot", "url": "https://i.imgur.com/EA4lB3t.jpeg", "preview": false },
  { "imageableId": 5, "imageableType": "Spot", "url": "https://i.imgur.com/OMQsosl.jpeg", "preview": false },
  { "imageableId": 5, "imageableType": "Spot", "url": "https://i.imgur.com/IyAKTs5.jpeg", "preview": false },
  { "imageableId": 5, "imageableType": "Spot", "url": "https://i.imgur.com/Z2yxRCM.jpeg", "preview": false },

  { "imageableId": 6, "imageableType": "Spot", "url": "https://i.imgur.com/RE2JdAC.jpeg", "preview": true },
  { "imageableId": 6, "imageableType": "Spot", "url": "https://i.imgur.com/jgHqdX4.jpeg", "preview": false },
  { "imageableId": 6, "imageableType": "Spot", "url": "https://i.imgur.com/FzrXjWM.jpeg", "preview": false },
  { "imageableId": 6, "imageableType": "Spot", "url": "https://i.imgur.com/SpHbBiW.jpeg", "preview": false },
  { "imageableId": 6, "imageableType": "Spot", "url": "https://i.imgur.com/kOLYi4S.jpeg", "preview": false },

  { "imageableId": 7, "imageableType": "Spot", "url": "https://i.imgur.com/ZGjyp41.jpeg", "preview": true },
  { "imageableId": 7, "imageableType": "Spot", "url": "https://i.imgur.com/fFbl93q.jpeg", "preview": false },
  { "imageableId": 7, "imageableType": "Spot", "url": "https://i.imgur.com/2TR0Mzo.jpeg", "preview": false },
  { "imageableId": 7, "imageableType": "Spot", "url": "https://i.imgur.com/ZtgAphF.jpeg", "preview": false },
  { "imageableId": 7, "imageableType": "Spot", "url": "https://i.imgur.com/wihOdUS.jpeg", "preview": false },

  { "imageableId": 8, "imageableType": "Spot", "url": "https://i.imgur.com/VVg1IQx.jpeg", "preview": true },
  { "imageableId": 8, "imageableType": "Spot", "url": "https://i.imgur.com/SJkrr0n.jpeg", "preview": false },
  { "imageableId": 8, "imageableType": "Spot", "url": "https://i.imgur.com/IokpTjS.jpeg", "preview": false },
  { "imageableId": 8, "imageableType": "Spot", "url": "https://i.imgur.com/DIc8DpD.jpeg", "preview": false },
  { "imageableId": 8, "imageableType": "Spot", "url": "https://i.imgur.com/8PpRJ7T.jpeg", "preview": false },


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
