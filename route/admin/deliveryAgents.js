const express = require('express');
const router = express.Router();
const deliveryAgentController = require('../../controller/admin/deliveryAgents');
module.exports = (app) => {
        app.post('/api/createDeliveryAgent', deliveryAgentController.createDeliveryAgent);
        app.get('/api/getDeliveryAgents', deliveryAgentController.getDeliveryAgents);
        app.get('/api/getDeliveryAgentById/:id', deliveryAgentController.getDeliveryAgentById);
        app.put('/api/updateDeliveryAgent/:id', deliveryAgentController.updateDeliveryAgent);
        app.delete('/api/deleteDeliveryAgent/:id', deliveryAgentController.deleteDeliveryAgent);
};
