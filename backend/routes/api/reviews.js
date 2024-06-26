const express = require('express');
const { Op, fn, col, literal, cast } = require('sequelize');
const { Review, User, Spot, Image } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const { user } = req;
    const { url } = req.body;
    const { reviewId } = req.params;
    const imageableId = reviewId;
    const imageableType = 'Review';
    const preview = true;

    const review = await Review.findByPk(reviewId, {
        include: [{
            model: Image,
            as: 'ReviewImages'
        }]
    });

    if (!review) {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        return next(err);
        // res.status(404);
        // return res.json({ message: "Review couldn't be found" });
    }

    if (review.userId !== user.id) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
        // res.status(403);
        // return res.json({ message: "Forbidden" });
    }

    if (review.ReviewImages.length >= 10) {
        const err = new Error("Maximum number of images for this resource was reached");
        err.status = 403;
        return next(err);
        // res.status(403);
        // return res.json({ message: "Maximum number of images for this resource was reached" });
    }

    const image = await Image.create({ imageableId, imageableType, url, preview });

    const safeReview = {
        id: image.id,
        url: image.url
    };

    return res.json( safeReview );
});


router.put('/:reviewId', requireAuth, validateReview, async (req, res, next) => {
    const { user } = req;
    const { reviewId } = req.params;
    const { review, stars } = req.body;

    const reviewToUpdate = await Review.findByPk(reviewId);

    if (!reviewToUpdate) {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        return next(err);
        // res.status(404);
        // return res.json({ message: "Review couldn't be found" });
    }

    if (reviewToUpdate.userId !== user.id) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
        // return res.status(403).json({ message: 'Forbidden' });
    }

    const updates = {
        review,
        stars
    }

    await reviewToUpdate.update(updates);

    return res.json( reviewToUpdate );

});



router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const { user } = req;
    const { reviewId } = req.params;

    const review = await Review.findByPk(reviewId);

    if (!review) {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        return next(err);
        // res.status(404);
        // return res.json({ message: "Review couldn't be found" });
    }

    if (review.userId !== user.id) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
        // return res.status(403).json({ message: 'Forbidden' });
    }

    await review.destroy();

    return res.json({ message: "Successfully deleted" });

});


router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const reviews = await Review.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: User,
                attributes: ['id','firstName','lastName']
            },
            {
                model: Spot,
                attributes: {exclude: ['createdAt', 'updatedAt']},
                include: {
                    model: Image,
                    attributes: ['url','preview'],
                    as: 'SpotImages'
                },
            },
            {
                model: Image,
                attributes: ['id', 'url'],
                as: 'ReviewImages'
            }
        ]
    });


    if (reviews.length) {
        const addSpotPreview = reviews.map(review => {
            const { Spot } = review;
            const { SpotImages } = Spot;
            const image = SpotImages.find(image => image.dataValues.preview === true);
            image ? Spot.dataValues.previewImage = image.dataValues.url : Spot.dataValues.previewImage = null;
            delete Spot.dataValues.SpotImages;
            return review;
        });

        return res.json( { Reviews: addSpotPreview });

    } else return res.json( { Reviews: reviews });


});

module.exports = router;
