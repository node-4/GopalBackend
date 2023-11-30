const DeliveryAgent = require('../../model/deliveryagent');

// Create a new delivery agent
exports.createDeliveryAgent = async (req, res) => {
  try {
    const deliveryAgent = new DeliveryAgent(req.body);
    await deliveryAgent.save();
    res.status(201).json(deliveryAgent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all delivery agents
exports.getDeliveryAgents = async (req, res) => {
  try {
    const deliveryAgents = await DeliveryAgent.find();
    res.status(200).json(deliveryAgents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a single delivery agent
exports.getDeliveryAgentById = async (req, res) => {
  try {
    const deliveryAgent = await DeliveryAgent.findById(req.params.id);
    if (!deliveryAgent) {
      return res.status(404).json({ message: 'Delivery Agent not found' });
    }
    res.status(200).json(deliveryAgent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a delivery agent
exports.updateDeliveryAgent = async (req, res) => {
  try {
    const deliveryAgent = await DeliveryAgent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!deliveryAgent) {
      return res.status(404).json({ message: 'Delivery Agent not found' });
    }
    res.status(200).json(deliveryAgent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a delivery agent
exports.deleteDeliveryAgent = async (req, res) => {
  try {
    const deliveryAgent = await DeliveryAgent.findByIdAndDelete(req.params.id);
    if (!deliveryAgent) {
      return res.status(404).json({ message: 'Delivery Agent not found' });
    }
    res.status(200).json({ message: 'Delivery Agent deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
