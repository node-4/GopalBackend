const handleResponse = (res, status, message, data) => {
  return res.status(status).json({ status, message, data });
};
const Cancellation = require("../../model/cancellationPolicy");
exports.getCancellationPolicyByIdByRestaurant = async (req, res, next) => {
  try {
    console.log("hit it ");
    const requiredResults = await Cancellation.findOne({ _id: req.params.id, }).lean();

    if (!requiredResults)
      return handleResponse(res, 200, "No cancellation policy found", null);

    return handleResponse(res, 200, "Success", requiredResults);
  } catch (error) {
    console.log(error);
    return handleResponse(res, 500, error.message, null);
  }
};
exports.getAllCancellationPolicyByRestaurant = async (req, res, next) => {
  try {
    console.log("hit it ");
    const requiredResults = await Cancellation.find().lean();

    if (requiredResults.length === 0)
      return handleResponse(res, 200, "No cancellation policy found", null);

    return handleResponse(res, 200, "Success", requiredResults);
  } catch (error) {
    console.log(error);
    return handleResponse(res, 500, error.message, null);
  }
};