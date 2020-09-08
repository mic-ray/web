const express = require('express');
const router = express.Router();
const log = require('../guards/log');

router.use('/', log, (req, res) => {
    return res.status(200).json({ info: 'Some info!' });
});

module.exports = { infoRoutes: router };
