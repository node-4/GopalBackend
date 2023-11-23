const Aboutus = require('../../model/aboutus');
const handleResponse = (res, status, message, data) => {
  return res.status(status).json({ status, message, data });
};


// Create a new About us
exports.createPrivacyPolicy = async (req, res) => {
  try {
    const newPrivacyPolicy = await Aboutus.create({ privacypolicy: req.body.privacypolicy });
    return handleResponse(res, 201, 'About us added', newPrivacyPolicy);
  } catch (err) {
    return handleResponse(res, 400, 'About us not added', err.message);
  }
};

// Get all privacy policies
exports.getAllPrivacyPolicies = async (req, res) => {
  try {
    const privacyPolicies = await Aboutus.find();
    return handleResponse(res, 200, 'Success', privacyPolicies);
  } catch (err) {
    return handleResponse(res, 500, 'Internal Server Error', err.message);
  }
};

// Get a single About us by ID
exports.getPrivacyPolicyById = async (req, res) => {
  try {
    const privacyPolicy = await Aboutus.findById(req.params.id);
    if (privacyPolicy) {
      return handleResponse(res, 200, 'Success', privacyPolicy);
    } else {
      return handleResponse(res, 404, 'About us not found', null);
    }
  } catch (err) {
    return handleResponse(res, 500, 'Internal Server Error', err.message);
  }
};

// Update a About us by ID
exports.updatePrivacyPolicy = async (req, res) => {
  try {
    const privacyPolicy = await Aboutus.findById(req.params.id);
    if (privacyPolicy) {
      privacyPolicy.title = req.body.title;
      const updatedPrivacyPolicy = await Aboutus.save();
      return handleResponse(res, 200, 'About us updated', updatedPrivacyPolicy);
    } else {
      return handleResponse(res, 404, 'About us not found', null);
    }
  } catch (err) {
    return handleResponse(res, 500, 'Internal Server Error', err.message);
  }
};

// Delete a About us by ID
exports.deletePrivacyPolicy = async (req, res) => {
  try {
    const privacyPolicy = await Aboutus.findById(req.params.id);
    if (privacyPolicy) {
      await Aboutus.remove();
      return handleResponse(res, 200, 'About us deleted', null);
    } else {
      return handleResponse(res, 404, 'About us not found', null);
    }
  } catch (err) {
    return handleResponse(res, 500, 'Internal Server Error', err.message);
  }
};
