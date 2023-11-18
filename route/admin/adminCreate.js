const express = require('express');
const router = express.Router();

const { registerAdmin, adminLogin } = require('../../controller/admin/adminCreate');
module.exports = (app) => {
        app.post('/api/admin/register', registerAdmin);
        app.post('/api/admin/login', adminLogin);
};