const express = require('express');
const app = express();

const { infoRoutes } = require('./routes/info');
app.use('/info', infoRoutes);
app.use((req, res) => {
    return res.status(404).send('<h1>Nothing found<h1>');
});

module.exports = app;
