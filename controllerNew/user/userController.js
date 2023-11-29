const otpGenerator = require("otp-generator");
const createError = require("http-errors");
const { genToken } = require('../../middleware/jwt');
const User = require("../../modelNew/userCreate");
const Otp = require("../../modelNew/Otp");
const Restaurant = require("../../modelNew/restaurant/restaurantCreate");
const Kitchen = require("../../modelNew/kitchen/kitchen");
const kitchenDailyImage = require("../../modelNew/kitchen/kitchenDailyImage");
const KitchenSubscription = require('../../modelNew/kitchen/kitchensubcription');
const kitchenDishes = require("../../modelNew/kitchen/kitchenDishes");
const Dish = require("../../modelNew/restaurant/dishes");
const userKitchensubcription = require('../../modelNew/kitchen/userKitchensubcription');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");


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
                                                return res.status(200).json({ status: 200, msg: "signUp  successfully", data: user });
                                        }
                                } else {
                                        let password = bcrypt.hashSync(req.body.password, 8);
                                        const otpToSend = await Otp.create({ mobile: req.body.mobile, otp: otp, password: password, });
                                        if (otpToSend) {
                                                return res.status(200).json({ status: 200, msg: "signUp  successfully", data: user });
                                        }
                                }
                        }
                } else {
                        return res.status(409).send({ status: 409, msg: "User already exit" });
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
                console.log(err);
                return res.status(500).send({ message: "Internal server error while User signing in", });
        }
};
exports.saveCurrentLocation = async (req, res, next) => {
        try {
                console.log("hit save current user current location");
                const { latLng } = req.body;
                const [lat, lng] = latLng;
                const update = { currentLocation: { type: "Point", coordinates: [lng, lat], }, };
                const userAddedDetails = await User.findByIdAndUpdate(req.user, update, { new: true, runValidators: true, });
                if (!userAddedDetails) {
                        return res.status(400).send({ status: 400, msg: "cannot update the user" });
                }
                return res.status(200).send({ status: 200, msg: "Address saved successfully", data: userAddedDetails });
        } catch (error) {
                console.log(error);
                return res.status(500).send({ message: "Internal server error while User update location", });
        }
};
exports.loginUserSendOtp = async (req, res /* next*/) => {
        try {
                const { mobile } = req.body;
                const otp = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false, });
                const requiredOtp = await Otp.findOne({ mobile: mobile });
                if (requiredOtp) {
                        const otpToUpdate = await Otp.findByIdAndUpdate({ _id: requiredOtp._id }, { $set: { otp: otp } }, { new: true });
                        if (otpToUpdate) {
                                return res.status(200).send({ status: 200, msg: "Otp send successfully", data: otp, otpToSend: otpToUpdate, });
                        }
                } else {
                        const otpToSend = await Otp.create({ mobile: mobile, otp: otp, });
                        if (otpToSend) {
                                return res.status(200).send({ status: 200, msg: "Otp send successfully", data: otp, otpToSend: otpToUpdate, });
                        }
                }
        } catch (error) {
                console.log(error);
                return res.status(500).send({ message: "Internal server error while User update location", });
        }
};
exports.loginUserVerifyOtp = async (req, res, next) => {
        try {
                const { mobile, otp } = req.body;
                const requiredOtp = await Otp.findOne({ mobile: mobile });
                if (otp !== requiredOtp.otp) {
                        return res.status(400).send({ status: 400, msg: "wrong otp", data: {} });
                }
                const user = await User.findOne({ mobile: requiredOtp.mobile });
                if (!user && otp === requiredOtp.otp) {
                        const newUser = await User.create({ mobile: requiredOtp.mobile, });
                        const userCart = await Cart.create({ user: newUser._id, });
                        if (!newUser || !userCart) {
                                return res.status(400).send({ status: 400, msg: "cannot save the user or create user cart", data: {} });
                        } else {
                                // await Notification.create({
                                //         receiverUser: newUser._id,
                                //         body: `welcome ${newUser.mobile}`,
                                // });
                                const token = await genToken({ id: newUser._id, role: newUser.role });
                                return res.status(200).send({ status: 200, msg: "Otpverify successfully.", data: token, user: newUser });
                        }
                }
                if (user && otp === requiredOtp.otp) {
                        // await Notification.create({ receiverUser: user._id, body: `welcome ${user.mobile}`, });
                        const token = await genToken({ id: user._id, role: user.role });
                        return res.status(200).send({ status: 200, msg: "Otpverify successfully.", data: token, user: user });
                }
        } catch (error) {
                console.log(error);
                return res.status(500).send({ message: "Internal server error while User update location", });
        }
};
exports.socialLogin = async (req, res) => {
        try {
                const { google_id, name, email, profileImage, mobile } = req.body;
                const user = await User.findOne({ $and: [{ $or: [{ google_id: google_id }, { mobile: mobile }, { email: email }] }] });
                if (!user) {
                        const data1 = { google_id: google_id, name: name, email: email, profileImage: profileImage, mobile: mobile };
                        const create = await User.create(data1);
                        if (mobile !== (null || undefined)) {
                                const requiredOtp = await Otp.findOne({ mobile: mobile });
                                const otp = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false, });
                                if (requiredOtp) {
                                        const otpToUpdate = await Otp.findByIdAndUpdate({ _id: requiredOtp._id }, { $set: { otp: otp } }, { new: true });
                                        if (otpToUpdate) {
                                                const token = await jwt.sign({ id: create._id }, process.env.JWT_SECRET, { expiresIn: "365d", });
                                                return res.status(200).send({ status: 200, msg: "logged in successfully.", data: token, user: create });
                                        }
                                } else {
                                        const otpToSend = await Otp.create({ mobile: req.body.mobile, otp: otp, });
                                        if (otpToSend) {
                                                const token = await jwt.sign({ id: create._id }, process.env.JWT_SECRET, { expiresIn: "365d", });
                                                return res.status(200).send({ status: 200, msg: "logged in successfully.", data: token, user: create });
                                        }
                                }
                        } else {
                                const token = await jwt.sign({ id: create._id }, process.env.JWT_SECRET, { expiresIn: "365d", });
                                return res.status(200).send({ status: 200, msg: "logged in successfully.", data: token, user: create });
                        }
                } else {
                        if (mobile !== (null || undefined)) {
                                const requiredOtp = await Otp.findOne({ mobile: mobile });
                                const otp = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false, });
                                if (requiredOtp) {
                                        const otpToUpdate = await Otp.findByIdAndUpdate({ _id: requiredOtp._id }, { $set: { otp: otp } }, { new: true });
                                        if (otpToUpdate) {
                                                const token = await jwt.sign({ id: create._id }, process.env.JWT_SECRET, { expiresIn: "365d", });
                                                return res.status(200).send({ status: 200, msg: "logged in successfully.", data: token, user: user });
                                        }
                                } else {
                                        const otpToSend = await Otp.create({ mobile: req.body.mobile, otp: otp, });
                                        if (otpToSend) {
                                                const token = await jwt.sign({ id: create._id }, process.env.JWT_SECRET, { expiresIn: "365d", });
                                                return res.status(200).send({ status: 200, msg: "logged in successfully.", data: token, user: user });
                                        }
                                }
                        } else {
                                const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "365d", });
                                return res.status(200).send({ status: 200, msg: "logged in successfully.", data: token, user: user });
                        }
                }
        } catch (error) {
                console.log(error);
                return res.status(500).send({ message: "Internal server error while User update location", });
        }
};
exports.getProfile = async (req, res, next) => {
        try {
                const restaurant = await User.findById(req.user);
                if (!restaurant) {
                        return res.status(400).send({ status: 400, msg: "User not found" });
                } else {
                        return res.status(200).send({ status: 200, message: "User found  successfully ", data: restaurant });
                }
        } catch (error) {
                return res.status(500).send({ status: 500, message: "Server error" + error.message });
        }
}
exports.addDetails = async (req, res, next) => {
        try {
                console.log("hit add details");
                const { name, address, pincode } = req.body;
                const update = { name, address, pincode, };
                const userAddedDetails = await User.findByIdAndUpdate(req.user, { $set: update }, { new: true, runValidators: true, });
                if (!userAddedDetails) {
                        return res.status(400).send({ status: 400, msg: "cannot update the user" });
                }
                return res.status(200).send({ status: 200, message: "User found  successfully ", data: userAddedDetails });
        } catch (error) {
                return res.status(500).send({ status: 500, message: "Server error" + error.message });
        }
};
exports.editCurrentUser = async (req, res, next) => {
        try {
                console.log("hit edit user details");
                const { name, email, mobile, address, pincode } = req.body;
                let findUser = await User.findById(req.user);
                if (findUser) {
                        if (findUser.mobile !== mobile) {
                                const user = await User.findOne({ mobile: mobile });
                                if (user) {
                                        return res.status(409).send({ status: 409, message: "User already exit" });
                                }
                        }
                        if (findUser.email !== email) {
                                const user = await User.findOne({ email: email });
                                if (user) {
                                        return res.status(409).send({ status: 409, message: "User already exit" });
                                }
                        }
                }
                let profileImage;
                if (req.file) {
                        profileImage = req.file.path
                }
                const update = { name, email, mobile, address, pincode, profileImage };
                const updatedUser = await User.findByIdAndUpdate(req.user, update, { new: true, runValidators: true, });
                if (!updatedUser) {
                        return res.status(400).send({ status: 400, message: "cannot update the user ", data: {} });
                }
                return res.status(200).send({ status: 200, message: "User update  successfully ", data: updatedUser });
        } catch (error) {
                return res.status(500).send({ status: 500, message: "Server error" + error.message });
        }
};
exports.getAllrestaurant = async (req, res, next) => {
        try {
                const restaurant = await Restaurant.find({ role: "restaurant" });
                if (restaurant.length == 0) {
                        return res.status(404).send({ status: 404, message: "restaurant not found ", data: {} });
                }
                return res.status(200).send({ status: 200, message: "restaurant found  successfully ", data: restaurant });
        } catch (error) {
                console.log(error);
                return res.status(500).json({ errorname: error.name, message: error.message, });
        }
};
exports.getAllHomeCarriageRestaurant = async (req, res, next) => {
        try {
                const restaurant = await Restaurant.find({ role: "Home Carriage Subscription" });
                if (restaurant.length == 0) {
                        return res.status(404).send({ status: 404, message: "Home Carriage Subscription restaurant not found ", data: {} });
                }
                return res.status(200).send({ status: 200, message: "Home Carriage Subscription restaurant found  successfully ", data: restaurant });
        } catch (error) {
                console.log(error);
                return res.status(500).json({ errorname: error.name, message: error.message, });
        }
};
exports.getAllCateringServicesRestaurant = async (req, res, next) => {
        try {
                const restaurant = await Restaurant.find({ role: "Catering Services" });
                if (restaurant.length == 0) {
                        return res.status(404).send({ status: 404, message: "Catering Services restaurant not found ", data: {} });
                }
                return res.status(200).send({ status: 200, message: "Catering Services restaurant found  successfully ", data: restaurant });
        } catch (error) {
                console.log(error);
                return res.status(500).json({ errorname: error.name, message: error.message, });
        }
};
exports.subscribe = async (req, res) => {
        try {
                const existingSubscription = await userKitchensubcription.findOne({ user: req.user, kitchensubcriptionId: req.body.subscriptionId, paymentStatus: 'Paid', expired: false });
                if (existingSubscription) {
                        return res.status(400).json({ message: 'User is already subscribed.' });
                }
                const newSubscription = new userKitchensubcription({ kitchensubcriptionId: req.body.subscriptionId, user: req.user });
                await newSubscription.save();
                return res.status(201).json({ message: 'Subscription successful.', data: newSubscription });
        } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal Server Error' });
        }
};
exports.unsubscribe = async (req, res) => {
        try {
                const findUserSubscription = await userKitchensubcription.findOneAndUpdate({ user: req.user, kitchensubcriptionId: req.body.subscriptionId }, { $set: { expired: true, expiredTime: new Date() } }, { new: true });
                if (!findUserSubscription) {
                        return res.status(404).json({ status: 404, message: 'User subscription not found.' });
                }
                const findSubscription = await KitchenSubscription.findById(findUserSubscription.kitchensubcriptionId);
                if (!findSubscription) {
                        return res.status(404).json({ status: 404, message: 'Subscription not found.' });
                }
                const isUserAlreadySubscribed = findSubscription.user.includes(req.user);
                if (isUserAlreadySubscribed) {
                        const updatedSubscription = await KitchenSubscription.findByIdAndUpdate(findUserSubscription.kitchensubcriptionId, { $inc: { noOfuser: -1 }, $pull: { user: req.user } }, { new: true });
                        return res.status(200).json({ message: 'Unsubscription successful.', data: updatedSubscription });
                } else {
                        return res.status(200).json({ message: 'Unsubscription successful.', data: findSubscription });
                }
        } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal Server Error' });
        }
};
exports.verifyPayment = async (req, res) => {
        try {
                const findUserSubscription = await userKitchensubcription.findById(req.params.id);
                if (!findUserSubscription) {
                        return res.status(404).json({ status: 404, message: "Subscription not found." });
                }
                if (req.body.paymentStatus === "Paid") {
                        const findSubscription = await KitchenSubscription.findById(findUserSubscription.kitchensubcriptionId);
                        if (findSubscription) {
                                console.log(findSubscription);
                                const expirationTime = new Date() * findSubscription.month;
                                let update = await userKitchensubcription.findByIdAndUpdate({ _id: findUserSubscription._id }, { $set: { expired: false, expiredTime: expirationTime, paymentStatus: req.body.paymentStatus } }, { new: true });
                                const isUserAlreadySubscribed = findSubscription.user.includes(findUserSubscription.user);

                                if (!isUserAlreadySubscribed) {
                                        let update1 = await KitchenSubscription.findByIdAndUpdate({ _id: findSubscription._id }, { $inc: { noOfuser: 1 }, $push: { user: findUserSubscription.user } }, { new: true });
                                        return res.status(200).json({ message: 'Payment success.', data: { update, update1 } });
                                } else {
                                        return res.status(200).json({ message: 'Payment success.', data: { update } });
                                }
                        }
                } else if (req.body.paymentStatus === "Failed") {
                        await userKitchensubcription.findByIdAndDelete({ _id: req.params.id });
                        return res.status(200).json({ message: 'Payment failed.', data: {} });
                } else {
                        return res.status(400).json({ message: 'Invalid payment status.' });
                }
        } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal Server Error' });
        }
};
exports.mySubscribedPlans = async (req, res) => {
        try {
                const existingSubscription = await userKitchensubcription.find({ user: req.user,expired: false}).populate('kitchensubcriptionId');
                if (existingSubscription.length ==0) {
                        return res.status(404).json({ status: 404, message: 'User have no subscription.' });
                }
                return res.status(200).json({ status: 200, message: 'User subscription found.' , data: existingSubscription });
        } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal Server Error' });
        }
};