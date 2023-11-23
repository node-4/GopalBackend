const handleResponse = (res, status, message, data) => {
  return res.status(status).json({ status, message, data });
};

const cancellation = require("../../model/cancellationPolicy");

exports.createCancellationPolicy = async (req, res, next) => {
  try {
    console.log("hit create CancellationPolicy ");
    const { msg } = req.body;
    const msgData = await cancellation.create({ msg: msg });
    if (!msgData) return handleResponse(res, 400, "Cannot create new msg", null);

    return handleResponse(res, 200, "Cancellation policy created", msgData);
  } catch (error) {
    console.log(error);
    return handleResponse(res, 500, error.message, null);
  }
};

exports.getCancellationPolicy = async (req, res, next) => {
  try {
    console.log("hit it ");
    const requiredResults = await cancellation.findOne({_id: req.params.id,}).lean();

    if (!requiredResults)
      return handleResponse(res, 200, "No cancellation policy found", null);

    return handleResponse(res, 200, "Success", { requiredResults });
  } catch (error) {
    console.log(error);
    return handleResponse(res, 500, error.message, null);
  }
};

exports.getAllCancellationPolicy = async (req, res, next) => {
  try {
    console.log("hit it ");
    const requiredResults = await cancellation.find().lean();

    if (requiredResults.length === 0)
      return handleResponse(res, 200, "No cancellation policy found", null);

    return handleResponse(res, 200, "Success", { requiredResults });
  } catch (error) {
    console.log(error);
    return handleResponse(res, 500, error.message, null);
  }
};

exports.deleteCancellationPolicyById = async (req, res, next) => {
  try {
    console.log("hit CancellationPolicy by id");
    const { id } = req.params;
    const deletedPolicy = await cancellation.findOneAndDelete({ _id: id });
    if (!deletedPolicy)
      return handleResponse(res, 400, "Cannot delete the policy", null);

    return handleResponse(res, 200, "Policy deleted successfully", null);
  } catch (error) {
    console.log(error);
    return handleResponse(res, 500, error.message, null);
  }
};
