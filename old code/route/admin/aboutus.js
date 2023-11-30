const express = require('express');
const router = express.Router();
const privacy = require('../../controller/admin/aboutus');
module.exports = (app) => {
        app.post('/api/createPrivacyPolicy', privacy.createPrivacyPolicy);
        app.get('/api/', privacy.getAllPrivacyPolicies);
        app.get('/api/:id', privacy.getPrivacyPolicyById);
        app.put('/api/:id', privacy.updatePrivacyPolicy);
        app.delete('/api/:id', privacy.deletePrivacyPolicy);
};
