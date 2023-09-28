const express = require('express');
const { Op } = require('sequelize');
const { Booking, Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    console.log
    const bookings = await Booking.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: Spot,
                attributes: {exclude: ['createdAt', 'updatedAt']}
            }
        ]
    });

    const moveSpotUp = bookings.map(booking => {
        const { id, spotId, userId, startDate, endDate, createdAt, updatedAt, Spot } = booking;
        return {
          id,
          spotId,
          Spot: Spot.toJSON(),
          userId,
          startDate,
          endDate,
          createdAt,
          updatedAt,
        };
    });

    return res.json( { Bookings: moveSpotUp });
});

module.exports = router;
