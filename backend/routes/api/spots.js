const express = require('express');
const { Op } = require('sequelize');
const { Spot, User, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

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
