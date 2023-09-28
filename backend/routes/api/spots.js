const express = require('express');
const { Op } = require('sequelize');
const { Spot, User, Review, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const { user } = req;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.status(404);
        return res.json({ message: "Spot couldn't be found" });
    }

    if (user.id === spot.ownerId) {
        const bookings = await Booking.findAll({
            where: {
                spotId
            },
            include: { model: User, attributes: ['id','firstName','lastName'] }
        });

        const filteredBookings = bookings.map(booking => {
            const { id, spotId, userId, startDate, endDate, createdAt, updatedAt, User } = booking;
            return {
              User: User.toJSON(),
              id,
              spotId,
              userId,
              startDate,
              endDate,
              createdAt,
              updatedAt,
            };
        });

        return res.json({ Bookings: filteredBookings })

    } else {
        const bookings = await Booking.findAll({
            where: {
                spotId
            },
            attributes: ['spotId','startDate','endDate']
        });

        return res.json({ Bookings: bookings })

    }

});

router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params;
    const reviews = await Review.findAll({
        where: {
            spotId
        },
        include: { model: User, attributes: ['id','firstName','lastName'] }
    });

    return res.json({ Reviews: reviews})
});

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    console.log
    const spots = await Spot.findAll({
        where: {
            ownerId: user.id
        }
    });
    return res.json( { Spots: spots });
});

router.get('/', async (req, res) => {
    const spots = await Spot.findAll();
    return res.json( { Spots: spots });
});

module.exports = router;
