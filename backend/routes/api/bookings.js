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


router.delete('/:bookingId', requireAuth, async (req, res) => {
    const { user } = req;
    const { bookingId } = req.params;

    const booking = await Booking.findByPk(bookingId);

    const { spotId } = booking;
    const spot = await Spot.findByPk(spotId);


    if (!booking) {
        res.status(404);
        return res.json({ message: "Booking couldn't be found" });
    }

    if (booking.userId !== user.id && spot.ownerId !== user.id) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    const currentTime = new Date();

    if (currentTime >= booking.startDate) {
        return res.status(403).json({ message: "Bookings that have been started can't be deleted"});
    }

    await booking.destroy();

    return res.json({ message: "Successfully deleted" });

});

module.exports = router;
