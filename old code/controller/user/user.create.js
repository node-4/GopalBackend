const otpGenerator = require("otp-generator");
const createError = require("http-errors");
const { genToken } = require('../../middleware/jwt');
const User = require("../../model/userCreate");
const Otp = require("../../model/Otp");
const Cart = require('../../model/cart');
const Notification = require('../../model/notification');
const jwt = require("jsonwebtoken")
//const { sendSms } = require('../../middlewares/twilioSms');
const bcrypt = require("bcryptjs");

exports.loginUserSendOtp = async (req, res /* next*/) => {
  try {
    const { mobile } = req.body;

    const otp = otpGenerator.generate(4, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const otpToSend = await Otp.create({
      mobile,
      otp,
    });

    return res.status(200).json({
      otp,
      otpToSend,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      errorMessage: error.message,
    });
  }
};
// module.exports.verifySignIn = async (req, res) => {
//   try {
//     const otp = req.body.otp;
//     console.log(otp);
//     const verifyOtp = await Otp.findOne({
//       otp: otp,
//     });
//     console.log(verifyOtp);

//     if (verifyOtp.otp === otp) {
//       const userdata = await User.findOne({ mobile: verifyOtp.mobile });
//       console.log(userdata);


//       if (
//         !userdata ||
//         userdata.length == 0 ||
//         userdata.mobile !== verifyOtp.mobile
//       ) {
//         const data = {
//           mobile: verifyOtp.mobile,
//           name: req.body.name,
//           address: req.body.address,
//           pincode: req.body.pincode,
//           profileImage: req.body.profileImage,
//           role: req.body.role,
//         };

//         console.log(data);
//         const user = await User.create(data);
//         return res
//           .status(200)
//           .json({ msg: "signIn successfull", data: verifyOtp });
//       } else {
//         return res.status(400).send({ msg: "data already added" });
//       }
//     } else {
//       return res.status(400).json({ msg: "invalid otp" });
//     }
//   } catch (error) {
//     return res.status(400).json({ msg: error.message, name: error.name });
//   }
// };
exports.loginUserVerifyOtp = async (req, res, next) => {
  try {
    const { otp } = req.body;
    const requiredOtp = await Otp.findOne({ otp: otp });
    console.log("hi")
    console.log(requiredOtp.mobile)

    if (otp !== requiredOtp.otp) return next(createError(400, "wrong otp"));

    const user = await User.findOne({ mobile: requiredOtp.mobile });
    console.log(user);
    // if(!user)return res .status(400).send({msg:"no data"})

    if (!user && otp === requiredOtp.otp) {
      const newUser = await User.create({
        mobile: requiredOtp.mobile,
      });
      console.log(newUser);
      const userCart = await Cart.create({
        user: newUser._id,
      });

      if (!newUser || !userCart)
        return next(
          createError(400, "cannot save the user or create user cart")
        );

      await Notification.create({
        receiverUser: newUser._id,
        body: `welcome ${newUser.mobile}`,
      });

      const token = await genToken({ id: newUser._id, role: newUser.role });

      return res.status(200).json({
        token,
        user: newUser,
      });
    }


    if (user && otp === requiredOtp.otp) {
      await Notification.create({
        receiverUser: user._id,
        body: `welcome ${user.mobile}`,
      });

      const token = await genToken({ id: user._id, role: user.role });

      return res.status(200).json({
        token,
        user,
      });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      errorMessage: error.message,
    });
  }
};
exports.socialLogin = async (req, res) => {
  try {
    const { google_id, name, email } = req.body;

    const user = await User.findOne({ google_id: google_id });
    console.log(user);
    if (!user) {
      const data1 = {
        google_id: req.body.google_id,
        name: req.body.name,
        email: req.body.email,
        profileImage: req.body.profileImage,
      };

      const create = await User.create(data1);
      console.log(create)

      const accessToken1 = jwt.sign({ id: create._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.setHeader("x-api-key", /* "Bearer "*/ +accessToken1);
      return res.status(200).send({
        message: "logged in successfully",
        accessToken: accessToken1,
        data: create,
      });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.setHeader("x-api-key", /* "Bearer "*/ +accessToken);
    return res.status(200).send({
      message: "logged in successfully",
      accessToken: accessToken,
      data: user,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ error: "internal server error" + err.message });
  }
};
exports.addDetails = async (req, res, next) => {
  try {
    console.log("hit add details");
    const { name, address, pincode } = req.body;

    // console.log(req.user);

    const update = {
      name,
      address,
      pincode,
    };

    const userAddedDetails = await User.findByIdAndUpdate(req.user, update, {
      new: true,
      runValidators: true,
    });

    if (!userAddedDetails)
      return next(createError(400, "cannot update the user"));

    return res.status(200).json({ userAddedDetails });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      errorMessage: error.message,
    });
  }
};
exports.saveCurrentLocation = async (req, res, next) => {
  try {
    console.log("hit save current user current location");

    const { latLng } = req.body;
    const [lat, lng] = latLng;

    const update = {
      currentLocation: {
        type: "Point",
        coordinates: [lng, lat],
      },
    };

    const userAddedDetails = await User.findByIdAndUpdate(req.user, update, {
      new: true,
      runValidators: true,
    });

    if (!userAddedDetails)
      return next(createError(400, "cannot update the user"));

    return res.status(200).json(userAddedDetails);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      errorMessage: error.message,
    });
  }
};
exports.getCurrentUser = async (req, res, next) => {
  try {
    console.log("hit get current user");

    const user = await User.findById({ _id: req.user });
    console.log(user);

    if (!user) return next(createError(400, "user not found"));

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      errorMessage: error.message,
    });
  }
};
exports.editCurrentUser = async (req, res, next) => {
  try {
    console.log("hit edit user details");
    const { name, email, mobile, address, pincode, profileImage } = req.body;

    //const path = `${req.file.destination}/${req.file.filename}`;

    // if (!path) return next(createError(400, "please provide the profile "));

    const update = {
      name,
      email,
      mobile,
      address,
      pincode,
      //profileImage: path,
      profileImage
    };

    const updatedUser = await User.findByIdAndUpdate(req.user, update, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) return next(createError(400, "cannot update the user"));

    return res.status(200).json({ updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorName: error.name,
      errorMessage: error.message,
    });
  }
};
exports.signUp = async (req, res) => {
  try {
    const userdata = await User.findOne({ mobile: req.body.mobile });
    if (!userdata) {
      const data = { mobile: req.body.mobile, name: req.body.name, address: req.body.address, pincode: req.body.pincode };
      const user = await User.create(data);
      if (user) {
        const otp = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false, });
        const requiredOtp = await Otp.findOne({ mobile: req.body.mobile });
        if (requiredOtp) {
          let password = bcrypt.hashSync(req.body.password, 8);
          const otpToUpdate = await Otp.findByIdAndUpdate({ _id: requiredOtp._id }, { $set: { otp: otp, password: password } }, { new: true });
          if (otpToUpdate) {
            return res.status(200).json({ msg: "signUp  successfully", data: user });
          }
        } else {
          let password = bcrypt.hashSync(req.body.password, 8);
          const otpToSend = await Otp.create({ mobile: req.body.mobile, otp: otp, password: password, });
          if (otpToSend) {
            return res.status(200).json({ msg: "signUp  successfully", data: user });
          }
        }
      }
    } else {
      return res.status(400).send({ msg: "User already exit" });
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};
exports.signIn = async (req, res) => {
  try {
    if (!req.body.mobile) {
      return res.status(400).send({ message: "mobile is required" });
    }
    if (!req.body.password) {
      return res.status(400).send({ message: "password is required" });
    }
    const admin = await User.findOne({ mobile: req.body.mobile, role: "user", });
    if (!admin) {
      return res.status(400).send({ message: "Failed! User passed doesn't exist" });
    }
    const requiredOtp = await Otp.findOne({ mobile: req.body.mobile });
    if (requiredOtp) {
      const passwordIsValid = bcrypt.compareSync(req.body.password, requiredOtp.password);
      if (!passwordIsValid) {
        return res.status(401).send({ message: "Wrong password" });
      }
      const accessToken1 = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "365d", });
      return res.status(200).send({ msg: "User logged in successfully", accessToken: accessToken1, });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal server error while User signing in", });
  }
};