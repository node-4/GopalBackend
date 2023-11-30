const express = require('express');
const router = express.Router();
const privacy = require('../../controller/admin/aboutus');
module.exports = (app) => {
        app.post('/api/about/createPrivacyPolicy', privacy.createPrivacyPolicy);
        app.get('/api/about/All', privacy.getAllPrivacyPolicies);
        app.get('/api/about/:id', privacy.getPrivacyPolicyById);
        app.put('/api/about/:id', privacy.updatePrivacyPolicy);
        app.delete('/api/about/:id', privacy.deletePrivacyPolicy);
};
