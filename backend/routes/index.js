const express = require('express');
const router = express.Router();

const apiRouter = require('./api');
router.use('/api', apiRouter);

//regenerating the csurf token if it is expired or deleted
router.get('/api/csrf/restore', (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    res.status(200).json({ 'XSRF-TOKEN': csrfToken });
});

module.exports = router;
