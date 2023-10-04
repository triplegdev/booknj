const express = require('express');
const { Op } = require('sequelize');
const { Image, Spot, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.delete('/spot-images/:imageId', requireAuth, async (req, res, next) => {
    const { user } = req;
    const { imageId } = req.params;

    const image = await Image.findByPk(imageId);

    if (!image) {
        const err = new Error("Spot Image couldn't be found");
        err.status = 404;
        return next(err);
        // res.status(404);
        // return res.json({ message: "Spot Image couldn't be found" });
    }

    const spotId = image.imageableId;
    const spot = await Spot.findByPk(spotId);

    if (spot.ownerId !== user.id) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
        // return res.status(403).json({ message: 'Forbidden' });
    }

    await image.destroy();

    return res.json({ message: "Successfully deleted" });

});

router.delete('/review-images/:imageId', requireAuth, async (req, res, next) => {
    const { user } = req;
    const { imageId } = req.params;

    const image = await Image.findByPk(imageId);

    if (!image) {
        const err = new Error("Review Image couldn't be found");
        err.status = 404;
        return next(err);
        // res.status(404);
        // return res.json({ message: "Review Image couldn't be found" });
    }

    const reviewId = image.imageableId;
    const review = await Review.findByPk(reviewId);

    if (review.userId !== user.id) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
        // return res.status(403).json({ message: 'Forbidden' });
    }

    await image.destroy();

    return res.json({ message: "Successfully deleted" });

});

module.exports = router;
