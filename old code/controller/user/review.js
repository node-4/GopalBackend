const CreateError = require("http-errors");
//const token = require("../../middleware/jwt")
const review = require("../../model/review");
const Restaurant = require("../../model/restaurantCreate");

exports.createReviewOfRestaurantByUser = async (req, res, next) => {
  try {
    console.log("hit create review by user");

    const { userId, numRatings, reviewMessage } = req.body;
    const { restaurantId } = req.params;

    const reviewData = await review.create({
      userId: userId,
      numRatings: numRatings,
      reviewMessage: reviewMessage,
      restaurantId: restaurantId,
    });
    console.log(reviewData);

    if (!reviewData)
      return res.status(400).send({ msg: "cannot create new reviewData" });

    return res.status(200).send(reviewData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      message: error.message,
    });
  }
};

exports.getAllReviewOfRestaurantByUser = async (req, res, next) => {
  try {
    console.log("hit restaurant get all review");
    const reviewData = await review.find().lean();

    if (reviewData.length === 0)
      return res.status(200).json({ message: "no reviewData found" });

    return res.status(200).json(reviewData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      message: error.message,
    });
  }
};

exports.findAverageRatingforrestaurant = async (req, res, next) => {
  try {
    const result = await review.find({ restaurantId: req.params.restaurantId })

    const numReviews = result.length;
    const totalRatings = result.reduce((acc, cur) => acc + cur.numRatings, 0);
    const avgRating = numReviews > 0 ? totalRatings / numReviews : null;
    //console.log(avgRating)
    const avgStarRating = avgRating
console.log(avgStarRating)
   const restaurantData =  await Restaurant.findOneAndUpdate({ _id: req.params.restaurantId},{avgStarRating:avgStarRating})
   const w = await restaurantData.save()

console.log(w);
  //console.log(restaurantData)
    return res.status(200).json(avgRating);
  } catch (error) {
    console.error(error);
  }
};


exports.sortAccToAvgStarRatingforrestaurant = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find().sort({ avgStarRating: -1 });
    console.log(restaurants)
   return res.status(200).send(restaurants)
  
  } catch (error) {
    console.error(error);
  }
};


exports.updateReviewOfRestaurantByUser = async (req, res, next) => {
  try {
    const reviewData = await review.findOneAndUpdate(
      { _id: req.params.restaurantId },
      { $push: { ratings: { customer, rating } } },
      { new: true }
    );
    return res.json(reviewData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      message: error.message,
    });
  }
};

exports.deleteReviewOfRestaurantByUser = async (req, res, next) => {
  try {
    console.log("hit restaurant delete review by id");

    const { restaurantId } = req.params;

    const deletedReview = await review.findOneAndDelete({
      // restaurantId: req.user,
      _id: restaurantId,
    });

    if (!deletedReview)
      return next(CreateError(400, "cannot delete the review"));

    return res.status(200).json({ message: "review deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      message: error.message,
    });
  }
};
