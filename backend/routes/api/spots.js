const express = require('express');
// const sequelize = require('sequelize');
const { Op, fn, col } = require('sequelize');
const { Spot, User, Review, Booking, Image } = require('../../db/models');
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
        include: [
            {
                model: User,
                attributes: ['id','firstName','lastName']
            },
            {
                model: Image,
                attributes: ['id', 'url'],
                as: 'ReviewImages'
            },
        ]
    });

    if (!reviews.length) {
        res.status(404);
        return res.json({ message: "Spot couldn't be found" });
    }

    return res.json({ Reviews: reviews })
});

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const spots = await Spot.findAll({
        where: {
            ownerId: user.id
        },
        include: [
            {
                model: Review,
                attributes: [ [fn('AVG', col('stars')), 'avgRating'] ],
            },
            {
                model: Image,
                attributes: ['url', 'preview']
            }
        ]

    });

    const addAvgRating = spots.map(spot => {
        const { id, ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt, Reviews, Images } = spot;

        const avgRating = Reviews[0].dataValues.avgRating;
        const preview = Images.find(image => image.dataValues.preview === true);
        let previewImage;

        if (preview) previewImage = { previewImage: preview.dataValues.url };
        else previewImage = {};

        return {
          id,
          ownerId,
          address,
          city,
          state,
          country,
          lat,
          lng,
          name,
          description,
          price,
          createdAt,
          updatedAt,
          avgRating,
          ...previewImage
        };
    });

    return res.json( { Spots: addAvgRating });
});

router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId, {
        include: [
            {
                model: Review,
                attributes: [
                    [fn('COUNT', col('Reviews.id')), 'numReviews'],
                    [fn('AVG', col('stars')), 'avgStarRating'],
                ],
            },
            {
                model: Image,
                attributes: ['id', 'url', 'preview'],
                as: 'SpotImages'
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
                as: 'Owner'
            },
        ]

    });

    if (!spot.dataValues.id) {
        res.status(404);
        return res.json({ message: "Spot couldn't be found" });
    }


    const { id, ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt, Reviews, SpotImages, Owner } = spot;

    const avgStarRating = Reviews[0].dataValues.avgStarRating;
    const numReviews = Reviews[0].dataValues.numReviews;

    const reformattedSpots = {
        id,
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        createdAt,
        updatedAt,
        numReviews,
        avgStarRating,
        SpotImages,
        Owner
    };

    return res.json( { Spots: reformattedSpots });

});

router.get('/', async (req, res) => {
    // const spots = await Spot.findAll();
    const spots = await Spot.findAll({
        include: [
            {
                model: Review,
                attributes: [ [fn('AVG', col('stars')), 'avgRating'] ],
            },
            {
                model: Image,
                attributes: ['url', 'preview']
            }
        ],
        group: ['Spot.id']
    });

    const addAvgRating = spots.map(spot => {
        const { id, ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt, Reviews, Images } = spot;

        const avgRating = Reviews[0].dataValues.avgRating;
        const preview = Images.find(image => image.dataValues.preview === true);
        let previewImage;

        if (preview) previewImage = { previewImage: preview.dataValues.url };
        else previewImage = {};

        return {
          id,
          ownerId,
          address,
          city,
          state,
          country,
          lat,
          lng,
          name,
          description,
          price,
          createdAt,
          updatedAt,
          avgRating,
          ...previewImage
        };
    });

    return res.json( { Spots: addAvgRating });
});

module.exports = router;
