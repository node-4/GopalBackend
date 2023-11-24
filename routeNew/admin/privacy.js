const express = require('express');
const router = express.Router();
const privacy = require('../../controllerNew/admin/privacy');
module.exports = (app) => {

        app.post('/api/Policy', privacy.create);
        app.get('/api/Policy/all', privacy.get);
        app.get('/api/Policy/:id', privacy.getId);
        app.put('/api/Policy/:id', privacy.update);
        app.delete('/api/Policy/:id', privacy.delete);
};
