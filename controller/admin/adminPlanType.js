const createError = require("http-errors");

const plantype = require("../../model/restaurantPlanType");

exports.getAllPlanTypeByAdmin = async (req, res, next) => {
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

// module.exports.createPlanType = async (req, res) => {
//   try {
//     const data = {
//       Plantype: req.body.Plantype,
//       subtype: req.body.subtype,
//       mealPlate: req.body.mealPlate,
//     };
//     const newPlanType = new plantype(data);
//     const savedPlanType = await newPlanType.save();
//     return savedPlanType;
//   } catch (error) {
//     console.error("Error creating plan type:", error);
//     throw error;
//   }
// };

// module.exports.getPlanTypes = async (req, res) => {
//  try {
//     const planTypes = await plantype.find();
//     return planTypes;
//   } catch (error) {
//     console.error("Error getting plan types:", error);
//     throw error;
//   }
// };


// module.exports.getPlanTypesbyId = async (req, res) => {
//     try {
//        const planTypes = await plantype.find({_id:req.params.id});
//        return planTypes;
//      } catch (error) {
//        console.error("Error getting plan types:", error);
//        throw error;
//      }
//    };

// module.exports.updatePlanType = async (req, res) => {
//   try {

//     const data = {
//         Plantype: req.body.Plantype,
//         subtype: req.body.subtype,
//         mealPlate: req.body.mealPlate,
//       };
//     const updatedPlanType = await plantype.findByIdAndUpdate({_id:req.params.id,data});
//     return updatedPlanType;
//   } catch (error) {
//     console.error("Error updating plan type:", error);
//     throw error;
//   }
// };


// module.exports.deletePlanType = async (req, res) => {

//   try {
//     const deletedPlanType = await plantype.findByIdAndDelete({_id:req.params.id});
//     return deletedPlanType;
//   } catch (error) {
//     console.error("Error deleting plan type:", error);
//     throw error;
//   }
// };
