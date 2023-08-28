const express = require('express');
const router = express.Router();
const deliveryAgentController = require('../../controller/admin/deliveryAgents');

router.post('/createDeliveryAgent', deliveryAgentController.createDeliveryAgent);
router.get('/getDeliveryAgents', deliveryAgentController.getDeliveryAgents);
router.get('/getDeliveryAgentById/:id', deliveryAgentController.getDeliveryAgentById);
router.put('/updateDeliveryAgent/:id', deliveryAgentController.updateDeliveryAgent);
router.delete('/deleteDeliveryAgent/:id', deliveryAgentController.deleteDeliveryAgent);

module.exports = router;
