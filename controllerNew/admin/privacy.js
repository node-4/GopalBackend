const privacy = require('../../modelNew/privacypolicy');

exports.create = async (req, res) => {
  try {
    if (!req.body.privacy) {
      return res.status(400).json({ status: 400, message: "Please specify privacy", data: null });
    }
    const result = await privacy.create({ privacy: req.body.privacy });
    return res.status(200).json({ status: 200, message: "Created", data: result });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ status: 500, message: "Internal server error", data: err.message });
  }
};
exports.update = async (req, res) => {
  try {
    const data = await privacy.findByIdAndUpdate({ _id: req.params.id }, { privacy: req.body.privacy }, { new: true, });
    if (!data) {
      return res.status(400).json({ status: 400, message: "Not found", data: null });
    }
    return res.status(200).json({ status: 200, message: "Updated", data: null });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ status: 500, message: "Internal server error", data: { error: err.message } });
  }
};
exports.get = async (req, res) => {
  try {
    const data = await privacy.find();
    if (!data || data.length === 0) {
      return res.status(400).json({ status: 400, message: "Not found", data: null });
    }
    return res.status(200).json({ status: 200, message: "Success", data: data });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ status: 500, message: "Internal server error", data: err.message });
  }
};
exports.getId = async (req, res) => {
  try {
    const data = await privacy.findById(req.params.id);
    if (!data || data.length === 0) {
      return res.status(400).json({ status: 400, message: "Not found", data: null });
    }
    return res.status(200).json({ status: 200, message: "Success", data: data });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ status: 500, message: "Internal server error", data: err.message });
  }
};
exports.delete = async (req, res) => {
  try {
    const data = await privacy.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(400).json({ status: 400, message: "Not found", data: null });
    }
    return res.status(200).json({ status: 200, message: "Deleted", data: data });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ status: 500, message: "Internal server error", data: err.message });
  }
};
