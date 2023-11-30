const express = require('express');
const router = express.Router();

const adminCreate = require('../../controller/admin/adminCreate');
module.exports = (app) => {
        app.post('/api/admin/register', adminCreate.registerAdmin);
        app.post('/api/admin/login', adminCreate.adminLogin);
};