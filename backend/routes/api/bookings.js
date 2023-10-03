const express = require('express');
const { Op } = require('sequelize');
const { Booking, Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const convertDates = (req, _res, next) => {
    const { startDate, endDate } = req.body;
    req.body.startDate = new Date(startDate);
    req.body.endDate = new Date(endDate);

    next();
};

const validateBooking = [
    check('startDate')
        .exists({ checkFalsy: true })
        .custom((value, { req }) => {
            if (new Date(value) >= new Date(req.body.endDate)) {
                throw new Error('endDate cannot be on or before startDate');
            }
            return true;
        }),
    handleValidationErrors,
    convertDates
];

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


router.put('/:bookingId', requireAuth, validateBooking, async (req, res, next) => {
    const { user } = req;
    const { bookingId } = req.params;
    const { startDate, endDate } = req.body;

    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
        res.status(404);
        return res.json({ message: "Booking couldn't be found" });
    }

    if (booking.userId !== user.id) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    const currentTime = new Date();

    if (currentTime >= booking.startDate) {
        return res.status(403).json({ message: "Past bookings can't be modified"});
    }

    const conflictBooking = await Booking.findOne({
        where: {
            id: {
                [Op.not]: bookingId
            },
            spotId: booking.spotId,
            [Op.or]: [
                {
                    [Op.or]: {
                        //start is within
                        startDate: {
                            [Op.and]: [{[Op.gte]: startDate}, {[Op.lte]: endDate}],
                          },
                          //end is within
                          endDate: {
                            [Op.and]: [{[Op.gte]: startDate}, {[Op.lte]: endDate}],
                          },
                    }
                },
                {
                  //booking range is within
                  startDate: { [Op.lte]: startDate },
                  endDate: { [Op.gte]: endDate },
                },
            ],
        }
    });

    if (conflictBooking) {
        const err = {};
        const errors = err.errors = {};
        if (startDate >= conflictBooking.startDate && endDate <= conflictBooking.endDate) {
            errors.startDate = "Start date conflicts with an existing booking";
            errors.endDate = "End date conflicts with an existing booking";
        }
        else if (startDate >= conflictBooking.startDate && startDate <= conflictBooking.endDate) {
            errors.startDate = "Start date conflicts with an existing booking";
        }
        else if (endDate >= conflictBooking.startDate && endDate <= conflictBooking.endDate) {
            errors.endDate = "End date conflicts with an existing booking";
        }
        else if (startDate <= conflictBooking.startDate && endDate >= conflictBooking.endDate) {
            errors.startDate = "Start date conflicts with an existing booking";
            errors.endDate = "End date conflicts with an existing booking";
        }
        err.status = 403;
        err.message = "Sorry, this spot is already booked for the specified dates"

        return next(err);
    }

    const updates = {
        startDate,
        endDate
    }

    await booking.update(updates);

    return res.json( booking );

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
