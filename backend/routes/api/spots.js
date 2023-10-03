const express = require('express');
// const sequelize = require('sequelize');
const { Op, fn, col } = require('sequelize');
const { Spot, User, Review, Booking, Image } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is required'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Longitude is required'),
    check('name')
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
];

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { user } = req;
    const { url, preview } = req.body;
    const { spotId } = req.params;
    const imageableId = spotId;
    const imageableType = 'Spot';

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.status(404);
        return res.json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId !== user.id) {
        res.status(403);
        return res.json({ message: "Forbidden" });
    }

    const image = await Image.create({ imageableId, imageableType, url, preview });

    const safeImage = {
        id: image.id,
        url: image.url,
        preview: image.preview
    };

    return res.json( safeImage );
});

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

router.post('/:spotId/bookings', requireAuth, validateBooking, async (req, res, next) => {
    console.log(check('startDate').selectFields('startDate'));
    const { user } = req;
    const userId = user.id;
    const { startDate, endDate } = req.body;
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId);

    if (spot.ownerId === user.id) {
        res.status(403);
        return res.json({ message: "Forbidden" });
    }


    const conflictBooking = await Booking.findOne({
        where: {
            spotId,
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

    if (!spot) {
        res.status(404);
        return res.json({ message: "Spot couldn't be found" });
    }

    if (conflictBooking) {
        const err = {};
        const errors = err.errors = {};
        if (startDate >= conflictBooking.startDate && startDate <= conflictBooking.endDate) {
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

    const booking = await Booking.create({ userId, spotId, startDate, endDate });
    return res.json( booking );

});

router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.status(404);
        return res.json({ message: "Spot couldn't be found" });
    }

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

    return res.json({ Reviews: reviews })
});

router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
    const { user } = req;
    const userId = user.id;
    const { review, stars } = req.body;
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.status(404);
        return res.json({ message: "Spot couldn't be found" });
    }

    try {
        const userReview = await Review.create({ userId, spotId, review, stars });
        return res.json( userReview );

    } catch (err) {
        err.message = 'User already has a review for this spot';
        return next(err);
    }

});

router.get('/current', requireAuth, async (req, res, next) => {
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
                attributes: ['url', 'preview'],
                as: 'SpotImages'
            }
        ]

    });

    if (!spots[0].dataValues.id) return res.json( { Spots: [] } );

    const addAvgRating = spots.map(spot => {
        const { id, ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt, Reviews, SpotImages } = spot;

        const avgRating = Reviews[0].dataValues.avgRating;
        const preview = SpotImages.find(image => image.dataValues.preview === true);
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


router.delete('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.status(404);
        return res.json({ message: "Spot couldn't be found" });
    }

    await spot.destroy();

    return res.json({ message: "Successfully deleted" });

});


const convertQueryParams = (req, _res, next) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
    req.query.page = parseInt(page)
    req.query.size = parseInt(size);
    req.query.minLat = parseFloat(minLat);
    req.query.maxLat = parseFloat(maxLat);
    req.query.minLng = parseFloat(minLng);
    req.query.maxLng = parseFloat(maxLng);
    req.query.minPrice = parseFloat(minPrice);
    req.query.maxPrice = parseFloat(maxPrice);

    next();
};

const queryValidators = [
    convertQueryParams,
    check('page')
        .optional({
            nullable: true,
            checkFalsy: true,
          })
        .isInt({ min: 1 })
        .withMessage('Page must be greater than or equal to 1'),
    check('size')
        .optional({
            nullable: true,
            checkFalsy: true,
          })
        .isInt({ min: 1 })
        .withMessage('Size must be greater than or equal to 1'),
    check('maxLat')
        .optional({
            nullable: true,
            checkFalsy: true,
          })
        .isFloat({ min: -90, max: 90 })
        .withMessage('Maximum latitude is invalid'),
    check('minLat')
        .optional({
            nullable: true,
            checkFalsy: true,
          })
        .isFloat({ min: -90, max: 90 })
        .withMessage('Minimum latitude is invalid'),
    check('maxLng')
        .optional({
            nullable: true,
            checkFalsy: true,
          })
        .isFloat({ min: -180, max: 180 })
        .withMessage('Maximum longitude is invalid'),
    check('minLng')
        .optional({
            nullable: true,
            checkFalsy: true,
          })
        .isFloat({ min: -180, max: 180 })
        .withMessage('Minimum longitude is invalid'),
    check('minPrice')
        .optional({
            nullable: true,
            checkFalsy: true,
          })
        .isFloat({ min: 0 })
        .withMessage('Minimum price must be greater than or equal to 0'),
    check('maxPrice')
        .optional({
            nullable: true,
            checkFalsy: true,
          })
        .isFloat({ min: 0 })
        .withMessage('Maximum price must be greater than or equal to 0'),
    handleValidationErrors
];

router.get('/', queryValidators, async (req, res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    if (!page || page > 10) page = 1;
    if (!size || size > 20) size = 20;

    const where = {};
    if (minLat && maxLat) where.lat = { [Op.gt]: minLat, [Op.lt]: maxLat };
    if (minLng && maxLng) where.lng = { [Op.gt]: minLng, [Op.lt]: maxLng };
    if (minPrice && minPrice) where.price = { [Op.gt]: minPrice, [Op.lt]: maxPrice };


    const spots = await Spot.findAll({
        where,
        include: [
            {
                model: Review,
                attributes: [ [fn('AVG', col('stars')), 'avgRating'] ],
            },
            {
                model: Image,
                attributes: ['url', 'preview'],
                as: 'SpotImages'
            }
        ],
        group: ['Spot.id'],
        limit: size,
        offset: size * (page - 1),
        subQuery: false
    });

    const addAvgRating = spots.map(spot => {
        const { id, ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt, Reviews, SpotImages } = spot;

        let avgRating;
        if (Reviews[0]) {
            avgRating = Reviews[0].dataValues.avgRating;
        }
        const preview = SpotImages.find(image => image.dataValues.preview === true);
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

    return res.json( { Spots: addAvgRating, page, size });
});

router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const ownerId = req.user.id;

    const spot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });

    return res.status(201).json( spot );
});

module.exports = router;
