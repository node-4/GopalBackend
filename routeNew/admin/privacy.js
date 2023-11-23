const express = require('express');
const router = express.Router();
const privacy = require('../../controllerNew/admin/privacy');
module.exports = (app) => {

        app.post('/api/', privacy.create);
        app.get('/api/', privacy.get);
        app.get('/api/:id', privacy.getId);
        app.put('/api/:id', privacy.update);
        app.delete('/api/:id', privacy.delete);
};
