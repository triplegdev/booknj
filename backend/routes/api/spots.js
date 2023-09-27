const express = require('express');
const { Op } = require('sequelize');
const { Spot, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

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
