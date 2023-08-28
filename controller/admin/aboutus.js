const PrivacyPolicy = require('../../model/aboutus');

// Create a new privacy policy
exports.createPrivacyPolicy = async (req, res) => {
  try {
    const newPrivacyPolicy = await PrivacyPolicy.create({privacypolicy:req.body.privacypolicy});
    console.log("hi")
    res.status(201).send(newPrivacyPolicy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all privacy policies
exports.getAllPrivacyPolicies = async (req, res) => {
  try {
    const privacyPolicies = await PrivacyPolicy.find()
   return res.status(200).send(privacyPolicies);
  } catch (err) {
  return  res.status(500).send({ message: err.message })
  }
};

// Get a single privacy policy by ID
exports.getPrivacyPolicyById = async (req, res) => {
  try {
    const privacyPolicy = await PrivacyPolicy.findById(req.params.id);
    if (privacyPolicy) {
      res.json(privacyPolicy);
    } else {
      res.status(404).json({ message: 'Privacy policy not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a privacy policy by ID
exports.updatePrivacyPolicy = async (req, res) => {
  try {
    const privacyPolicy = await PrivacyPolicy.findById(req.params.id);
    if (privacyPolicy) {
      privacyPolicy.title = req.body.title;
      const updatedPrivacyPolicy = await privacyPolicy.save();
      res.json(updatedPrivacyPolicy);
    } else {
      res.status(404).json({ message: 'Privacy policy not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a privacy policy by ID
exports.deletePrivacyPolicy = async (req, res) => {
  try {
    const privacyPolicy = await PrivacyPolicy.findById(req.params.id);
    if (privacyPolicy) {
      await privacyPolicy.remove();
      res.json({ message: 'Privacy policy deleted' });
    } else {
      res.status(404).json({ message: 'Privacy policy not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


