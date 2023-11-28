const Admin = require("../../modelNew/adminCreate");
const { genToken } = require("../../middleware/jwt");
exports.registerAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let findAdmin = await Admin.findOne({ email: email });
    if (findAdmin) {
      return res.status(400).send({ message: "Already Exist, please login", data: [] });
    }
    const registeringAdmin = new Admin({ email, password, });
    const registeredAdmin = await registeringAdmin.save();
    const token = await genToken({ id: registeredAdmin._id, role: registeredAdmin.role, });
    if (registeredAdmin && token) {
      return res.status(200).send({ message: "registered successfully ", data: { token, registeredAdmin, } });
    } else {
      return res.status(404).send({ message: "Admin not found ! not registered" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Server error" + error.message });
  }
};
exports.adminLogin = async (req, res, next) => {
  try {
    console.log("hit admin login");
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({ message: "please provide email and password" });
    }
    const admin = await Admin.findOne({ email: email }).select("+password");
    if (!admin) {
      return res.status(404).send({ message: "No admin exists with the provided email" });
    }
    if (!(await admin.checkPassword(password, admin.password))) {
      return res.status(400).send({ message: "Incorrect email or password" });
    }
    const token = await genToken({ id: admin._id, role: admin.role });
    if (!token) {
      return res.status(400).send({ message: "cannot generate the token" });
    }
    return res.status(200).send({ data: token });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server error" + error.message });
  }
};
