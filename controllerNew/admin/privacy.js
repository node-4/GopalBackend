const privacy = require('../../model/privacypolicy');

const handleResponse = (res, status, message, data) => {
  return res.status(status).json({ status, message, data });
};

exports.create = async (req, res) => {
  try {
    if (!req.body.privacy) {
      return handleResponse(res, 400, "Please specify privacy", null);
    }
    const result = await privacy.create({ privacy: req.body.privacy });
    return handleResponse(res, 200, "Created", { data: result });
  } catch (err) {
    console.log(err.message);
    return handleResponse(res, 500, "Internal server error", { error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await privacy.findByIdAndUpdate({ _id: req.params.id }, { privacy: req.body.privacy }, {
      new: true,
    });
    // if (!data) {
    //   return handleResponse(res, 400, "Not found", null);
    // }
    return handleResponse(res, 200, "Updated", null);
  } catch (err) {
    console.log(err.message);
    return handleResponse(res, 500, "Internal server error", { error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const data = await privacy.find();
    if (!data || data.length === 0) {
      return handleResponse(res, 400, "Not found", null);
    }
    return handleResponse(res, 200, "Success", { data: data });
  } catch (err) {
    console.log(err.message);
    return handleResponse(res, 500, "Internal server error", { error: err.message });
  }
};

exports.getId = async (req, res) => {
  try {
    const data = await privacy.findById(req.params.id);
    if (!data || data.length === 0) {
      return handleResponse(res, 400, "Not found", null);
    }
    return handleResponse(res, 200, "Success", { data: data });
  } catch (err) {
    console.log(err.message);
    return handleResponse(res, 500, "Internal server error", { error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const data = await privacy.findByIdAndDelete(req.params.id);
    if (!data) {
      return handleResponse(res, 400, "Not found", null);
    }
    return handleResponse(res, 200, "Deleted", { data: data });
  } catch (err) {
    console.log(err.message);
    return handleResponse(res, 500, "Internal server error", { error: err.message });
  }
};
