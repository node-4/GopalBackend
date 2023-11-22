const createError = require("http-errors");

const plantype = require("../../model/restaurantPlanType");

exports.getAllPlanType = async (req, res, next) => {
  try {
    console.log("hit get PlanType which are for all the users");
    const dataplantype = await plantype.find();

    if (dataplantype.length === 0)
      return res.status(200).json({ message: "no plantype found" });

    return res.status(200).send(dataplantype);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      message: error.message,
    });
  }
};

exports.getPlanTypeById = async (req, res, next) => {
  try {
    console.log("hit get plantype which are for a particular user");

    const datacreated = await plantype.findOne({ _id: req.params.id });

    if (!datacreated)
      return res.status(200).json({ message: "no plantype found" });

    return res.status(200).json({ datacreated });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      message: error.message,
    });
  }
};

exports.plantypeCreated = async (req, res) => {
  try {
    const dataCreated = await plantype.create({
      Plantype: req.body.Plantype,
      subtype: req.body.subtype,
      mealPlate: req.body.mealPlate,
    });
    console.log(dataCreated);
    return res.status(200).send(dataCreated);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

exports.updatePlanType = async (req, res) => {
  try {
    const datacreated = await plantype.findOneAndUpdate(
      { _id: req.params.id },
      {
        Plantype: req.body.Plantype,
        subtype: req.body.subtype,
        mealPlate: req.body.mealPlate,
      },
      { new: true }
    );
    if (!datacreated) {
      return res.status(400).json({
        message: "plantype not found",
      });
    }
    return res.status(200).json({
      message: "plantype updated",
      data: datacreated,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

exports.deleteplantype = async (req, res) => {
  try {
    const deleteData = await plantype.findOneAndDelete({ _id: req.params.id });
    if (!deleteData) {
      return res.status(400).json({
        message: "plantype not found",
      });
    }
    return res.status(200).json({
      message: "plantype deleted",
      data: deleteData,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};
