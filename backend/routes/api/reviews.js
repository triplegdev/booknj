const express = require('express');
const { Op } = require('sequelize');
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

router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { user } = req;
    const { url, preview } = req.body;
    const { reviewId } = req.params;
    const imageableId = reviewId;
    const imageableType = 'Review';

    const review = await Review.findByPk(reviewId, {
        include: [{
            model: Image,
            as: 'ReviewImages'
        }]
    });

    if (!review) {
        res.status(404);
        return res.json({ message: "Review couldn't be found" });
    }

    if (review.userId !== user.id) {
        res.status(403);
        return res.json({ message: "Forbidden" });
    }

    if (review.ReviewImages.length > 10) {
        res.status(403);
        return res.json({ message: "Maximum number of images for this resource was reached" });
    }

    const image = await Image.create({ imageableId, imageableType, url, preview });

    const safeReview = {
        id: image.id,
        url: image.url,
        preview: image.preview
    };

    return res.json( safeReview );
});


router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const { user } = req;
    const { reviewId } = req.params;
    const { review, stars } = req.body;

    const reviewToUpdate = await Review.findByPk(reviewId);

    if (!reviewToUpdate) {
        res.status(404);
        return res.json({ message: "Review couldn't be found" });
    }

    if (reviewToUpdate.userId !== user.id) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    const updates = {
        review,
        stars
    }

    await reviewToUpdate.update(updates);

    return res.json( reviewToUpdate );

});



router.delete('/:reviewId', requireAuth, async (req, res) => {
    const { user } = req;
    const { reviewId } = req.params;

    const review = await Review.findByPk(reviewId);

    if (!review) {
        res.status(404);
        return res.json({ message: "Review couldn't be found" });
    }

    if (review.userId !== user.id) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    await review.destroy();

    return res.json({ message: "Successfully deleted" });

});


router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    console.log
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
                attributes: {exclude: ['createdAt', 'updatedAt']}
            },
            {
                model: Image,
                attributes: ['id', 'url'],
                as: 'ReviewImages'
            },
        ]
    });

    return res.json( { Reviews: reviews });
});

module.exports = router;
