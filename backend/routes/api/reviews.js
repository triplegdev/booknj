const express = require('express');
const { Op } = require('sequelize');
const { Review, User, Spot, Image } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

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


router.delete('/:reviewId', requireAuth, async (req, res) => {
    const { reviewId } = req.params;

    const review = await Review.findByPk(reviewId);

    if (!review) {
        res.status(404);
        return res.json({ message: "Review couldn't be found" });
    }

    await review.destroy();

    res.json({ message: "Successfully deleted" });

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
