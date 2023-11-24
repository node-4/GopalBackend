const cancellation = require("../../model/cancellationPolicy");

exports.createCancellationPolicy = async (req, res, next) => {
  try {
    console.log("hit create CancellationPolicy ");
    const { msg } = req.body;
    const msgData = await cancellation.create({ msg: msg });
    if (!msgData) return res.status(400).json({ status: 400, message: "Cannot create new msg", data: null });

    return res.status(200).json({ status: 200, message: "Cancellation policy created", data: msgData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: error.message, data: null });
  }
};

exports.getCancellationPolicy = async (req, res, next) => {
  try {
    console.log("hit it ");
    const requiredResults = await cancellation.findOne({ _id: req.params.id }).lean();

    if (!requiredResults)
      return res.status(200).json({ status: 200, message: "No cancellation policy found", data: null });

    return res.status(200).json({ status: 200, message: "Success", data: requiredResults });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: error.message, data: null });
  }
};

exports.getAllCancellationPolicy = async (req, res, next) => {
  try {
    console.log("hit it ");
    const requiredResults = await cancellation.find().lean();

    if (requiredResults.length === 0)
      return res.status(200).json({ status: 200, message: "No cancellation policy found", data: null });

    return res.status(200).json({ status: 200, message: "Success", data: requiredResults });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: error.message, data: null });
  }
};

exports.deleteCancellationPolicyById = async (req, res, next) => {
  try {
    console.log("hit CancellationPolicy by id");
    const { id } = req.params;
    const deletedPolicy = await cancellation.findOneAndDelete({ _id: id });
    if (!deletedPolicy)
      return res.status(400).json({ status: 400, message: "Cannot delete the policy", data: null });

    return res.status(200).json({ status: 200, message: "Policy deleted successfully", data: null });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: error.message, data: null });
  }
};
