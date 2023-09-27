const express = require('express');
const { Op } = require('sequelize');
const { Review, User, Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

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
            }
        ]
    });
    return res.json( { Reviews: reviews });
});

module.exports = router;
