const Aboutus = require('../../model/aboutus');

// Create a new About us
exports.createPrivacyPolicy = async (req, res) => {
  try {
    const newPrivacyPolicy = await Aboutus.create({ privacypolicy: req.body.privacypolicy });
    return res.status(201).json({ status: 201, message: 'About us added', data: newPrivacyPolicy });
  } catch (err) {
    return res.status(400).json({ status: 400, message: 'About us not added', data: err.message });
  }
};
// Get all privacy policies
exports.getAllPrivacyPolicies = async (req, res) => {
  try {
    const privacyPolicies = await Aboutus.find();
    return res.status(200).json({ status: 200, message: 'Success', data: privacyPolicies });
  } catch (err) {
    return res.status(500).json({ status: 500, message: 'Internal Server Error', data: err.message });
  }
};
// Get a single About us by ID
exports.getPrivacyPolicyById = async (req, res) => {
  try {
    const privacyPolicy = await Aboutus.findById(req.params.id);
    if (privacyPolicy) {
      return res.status(200).json({ status: 200, message: 'Success', data: privacyPolicy });
    } else {
      return res.status(404).json({ status: 404, message: 'About us not found', data: null });
    }
  } catch (err) {
    return res.status(500).json({ status: 500, message: 'Internal Server Error', data: err.message });
  }
};
// Update a About us by ID
exports.updatePrivacyPolicy = async (req, res) => {
  try {
    const privacyPolicy = await Aboutus.findById(req.params.id);
    if (privacyPolicy) {
      privacyPolicy.title = req.body.title;
      const updatedPrivacyPolicy = await privacyPolicy.save();
      return res.status(200).json({ status: 200, message: 'About us updated', data: updatedPrivacyPolicy });
    } else {
      return res.status(404).json({ status: 404, message: 'About us not found', data: null });
    }
  } catch (err) {
    return res.status(500).json({ status: 500, message: 'Internal Server Error', data: err.message });
  }
};
// Delete a About us by ID
exports.deletePrivacyPolicy = async (req, res) => {
  try {
    const privacyPolicy = await Aboutus.findById(req.params.id);
    if (privacyPolicy) {
      await privacyPolicy.remove();
      return res.status(200).json({ status: 200, message: 'About us deleted', data: null });
    } else {
      return res.status(404).json({ status: 404, message: 'About us not found', data: null });
    }
  } catch (err) {
    return res.status(500).json({ status: 500, message: 'Internal Server Error', data: err.message });
  }
};
