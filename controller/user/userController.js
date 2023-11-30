const otpGenerator = require("otp-generator");
const createError = require("http-errors");
const { genToken } = require('../../middleware/jwt');
const User = require("../../model/userCreate");
const Otp = require("../../model/Otp");
const Restaurant = require("../../model/restaurant/restaurantCreate");
const Kitchen = require("../../model/kitchen/kitchen");
const kitchenDailyImage = require("../../model/kitchen/kitchenDailyImage");
const KitchenSubscription = require('../../model/kitchen/kitchensubcription');
const kitchenDishes = require("../../model/kitchen/kitchenDishes");
const Dish = require("../../model/restaurant/dishes");
const userKitchensubcription = require('../../model/kitchen/userKitchensubcription');
const Address = require("../../model/addrees");
const Cart = require("../../model/cart");
const orderModel = require("../../model/orderModel");
const userOrder = require("../../model/userOrder");
const transaction = require("../../model/transactionModel");
const cateringQuery = require("../../model/catering/cateringQuery");
const cateringService = require("../../model/catering/cateringService");
const cateringDish = require("../../model/catering/cateringDishes");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");


exports.signUp = async (req, res) => {
        try {
                const userdata = await User.findOne({ mobile: req.body.mobile });
                if (!userdata) {
                        const otp = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false, });
                        let password = bcrypt.hashSync(req.body.password, 8);
                        const data = { mobile: req.body.mobile, name: req.body.name, address: req.body.address, pincode: req.body.pincode, otp: otp, password: password };
                        const user = await User.create(data);
                        if (user) {
                                // const requiredOtp = await Otp.findOne({ mobile: req.body.mobile });
                                // if (requiredOtp) {
                                //         const otpToUpdate = await Otp.findByIdAndUpdate({ _id: requiredOtp._id }, { $set: { otp: otp, password: password } }, { new: true });
                                //         if (otpToUpdate) {
                                //                 return res.status(200).json({ status: 200, msg: "signUp  successfully", data: user });
                                //         }
                                // } else {
                                //         let password = bcrypt.hashSync(req.body.password, 8);
                                //         const otpToSend = await Otp.create({ mobile: req.body.mobile, otp: otp, password: password, });
                                //         if (otpToSend) {
                                return res.status(200).json({ status: 200, msg: "signUp  successfully", data: user });
                                // }
                                // }
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
                // const requiredOtp = await Otp.findOne({ mobile: req.body.mobile });
                // if (requiredOtp) {
                const passwordIsValid = bcrypt.compareSync(req.body.password, admin.password);
                if (!passwordIsValid) {
                        return res.status(401).send({ message: "Wrong password" });
                }
                const accessToken1 = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "365d", });
                return res.status(200).send({ msg: "User logged in successfully", accessToken: accessToken1, });
                // }
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
exports.loginUserSendOtp = async (req, res) => {
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
                const userData = await User.findById(req.user);
                if (!userData) {
                        return res.status(400).send({ status: 400, msg: "User not found" });
                }
                console.log(userData);
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
                const existingSubscription = await userKitchensubcription.find({ user: req.user, expired: false }).populate('kitchensubcriptionId');
                if (existingSubscription.length == 0) {
                        return res.status(404).json({ status: 404, message: 'User have no subscription.' });
                }
                return res.status(200).json({ status: 200, message: 'User subscription found.', data: existingSubscription });
        } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal Server Error' });
        }
};
exports.createAddress = async (req, res, next) => {
        try {
                const data = await User.findOne({ _id: req.user, });
                if (data) {
                        const data1 = await Address.findOne({ user: data._id, addressType: req.body.addressType });
                        if (data1) {
                                req.body.type = "User"
                                const newAddressData = req.body;
                                let update = await Address.findByIdAndUpdate(data1._id, newAddressData, { new: true, });
                                return res.status(200).json({ status: 200, message: "Address update successfully.", data: update });
                        } else {
                                req.body.user = data._id;
                                req.body.type = "User"
                                const address = await Address.create(req.body);
                                return res.status(200).json({ message: "Address create successfully.", data: address });
                        }
                } else {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                }
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.getallAddress = async (req, res, next) => {
        try {
                const data = await User.findOne({ _id: req.user, });
                if (data) {
                        const allAddress = await Address.find({ user: data._id });
                        return res.status(200).json({ message: "Address data found.", data: allAddress });
                } else {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                }
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.deleteAddress = async (req, res, next) => {
        try {
                const data = await User.findOne({ _id: req.user, });
                if (data) {
                        const data1 = await Address.findById({ _id: req.params.id });
                        if (data1) {
                                let update = await Address.findByIdAndDelete(data1._id);
                                return res.status(200).json({ status: 200, message: "Address Deleted Successfully", });
                        } else {
                                return res.status(404).json({ status: 404, message: "No data found", data: {} });
                        }
                } else {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                }
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.getAddressbyId = async (req, res, next) => {
        try {
                const data = await User.findOne({ _id: req.user, });
                if (data) {
                        const data1 = await Address.findById({ _id: req.params.id });
                        if (data1) {
                                return res.status(200).json({ status: 200, message: "Address found successfully.", data: data1 });
                        } else {
                                return res.status(404).json({ status: 404, message: "No data found", data: {} });
                        }
                } else {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                }
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.addToCart = async (req, res, next) => {
        try {
                const { dishId, numPortions, size } = req.body;
                const dish = await Dish.findById(dishId);
                if (!dish) {
                        return res.status(404).json({ status: 404, message: "Dish not found", data: {} });
                }
                let price;
                if (size === "small") {
                        price = dish.priceForSmallPortion;
                } else if (size === "medium") {
                        price = dish.priceForMediumPortion;
                } else if (size === "large") {
                        price = dish.priceForLargePortion;
                }
                const cart = await Cart.findOne({ user: req.user });
                if (!cart) {
                        const newCart = await Cart.create({ user: req.user, items: [{ dishId, numPortions, size, totalPrice: price * numPortions }] });
                        return res.status(200).json({ status: 200, message: "Dish added to cart successfully.", data: newCart });
                }
                const cartItemIndex = cart.items.findIndex(item => item.dishId.toString() === dishId && item.size === size);
                if (cartItemIndex !== -1) {
                        cart.items[cartItemIndex].numPortions += numPortions;
                        cart.items[cartItemIndex].totalPrice = price * cart.items[cartItemIndex].numPortions;
                } else {
                        cart.items.push({ dishId, numPortions, size, totalPrice: price * numPortions });
                }
                await cart.save();
                return res.status(200).json({ status: 200, message: "Dish added to cart successfully.", data: cart });
        } catch (error) {
                console.log(error);
                return res.status(500).send({ status: 500, message: "Server error.", data: {} });
        }
};
exports.getCart = async (req, res, next) => {
        try {
                const cart = await Cart.findOne({ user: req.user }).populate('items.dishId');
                if (!cart) {
                        return res.status(404).json({ status: 404, message: "Cart not found", data: {} });
                }
                const itemsWithTax = cart.items.map(item => {
                        const sgstPercentage = 0.1;
                        const cgstPercentage = 0.1;
                        const sgst = item.totalPrice * sgstPercentage;
                        const cgst = item.totalPrice * cgstPercentage;
                        return {
                                ...item.toObject(),
                                sgst,
                                cgst
                        };
                });
                const subtotal = itemsWithTax.reduce((acc, item) => acc + item.totalPrice, 0);
                const sgst = itemsWithTax.reduce((acc, item) => acc + item.sgst, 0);
                const cgst = itemsWithTax.reduce((acc, item) => acc + item.cgst, 0);
                const deliveryCharge = 5;
                const total = subtotal + sgst + cgst + deliveryCharge;
                return res.status(200).json({
                        status: 200,
                        message: "Cart retrieved successfully.",
                        cart: itemsWithTax,
                        subtotal,
                        sgst,
                        cgst,
                        deliveryCharge,
                        total
                });
        } catch (error) {
                console.error(error);
                return res.status(500).json({ status: 500, message: "Server error.", data: {} });
        }
};
exports.checkout = async (req, res) => {
        try {
                let existingOrders = await orderModel.find({ user: req.user._id, orderStatus: "unconfirmed" });
                if (existingOrders.length > 0) {
                        for (let i = 0; i < existingOrders.length; i++) {
                                await userOrder.findOneAndDelete({ orderId: existingOrders[i].orderId });
                                let nestedOrders = await orderModel.find({ orderId: existingOrders[i].orderId });
                                if (nestedOrders.length > 0) {
                                        for (let j = 0; j < nestedOrders.length; j++) {
                                                await orderModel.findByIdAndDelete({ _id: nestedOrders[j]._id });
                                        }
                                }
                        }
                        const findCart = await Cart.findOne({ user: req.user }).populate('items.dishId');
                        if (findCart) {
                                let grandtotal = 0, grandcgst = 0, grandsgst = 0, grandsubTotal = 0;
                                let orderId = await reffralCode();
                                for (let i = 0; i < findCart.items.length; i++) {
                                        console.log(findCart.items[i].dishId);
                                        const sgstPercentage = 0.1;
                                        const cgstPercentage = 0.1;
                                        const sgst = findCart.items[i].totalPrice * sgstPercentage;
                                        const cgst = findCart.items[i].totalPrice * cgstPercentage;
                                        grandcgst += cgst;
                                        grandsgst += sgst;
                                        grandsubTotal = findCart.items[i].totalPrice;
                                        grandtotal += findCart.items[i].totalPrice + cgst + sgst;
                                        let orderData = {
                                                orderId,
                                                userId: findCart.user,
                                                dishId: findCart.items[i].dishId,
                                                restaurantId: findCart.items[i].dishId.dishIsOfRestaurant,
                                                numPortions: findCart.items[i].numPortions,
                                                price: findCart.items[i].totalPrice / findCart.items[i].numPortions,
                                                cGst: cgst,
                                                sGst: sgst,
                                                subTotal: findCart.items[i].totalPrice,
                                                total: findCart.items[i].totalPrice + cgst + sgst,
                                                address: {
                                                        houseFlat: "",
                                                        appartment: "",
                                                        landMark: "",
                                                        houseType: "",
                                                },
                                                orderStatus: "unconfirmed",
                                        };
                                        const order = await orderModel.create(orderData);
                                        let findUserOrder = await userOrder.findOne({ orderId });
                                        if (findUserOrder) {
                                                await userOrder.findByIdAndUpdate({ _id: findUserOrder._id }, { $push: { Orders: order._id }, $set: { subTotal: grandsubTotal, cGst: grandcgst, sGst: grandsgst, total: grandtotal, } }, { new: true });
                                        } else {
                                                let userOrderData = {
                                                        userId: findCart.user,
                                                        orderId,
                                                        Orders: [order._id],
                                                        address: {
                                                                houseFlat: "",
                                                                appartment: "",
                                                                landMark: "",
                                                                houseType: "",
                                                        },
                                                        totalItem: findCart.items.length,
                                                        orderStatus: "unconfirmed",
                                                        paymentStatus: "pending",
                                                };

                                                await userOrder.create(userOrderData);
                                        }
                                }
                                let findUserOrder = await userOrder.findOne({ orderId }).populate('Orders');
                                return res.status(200).json({ status: 200, message: "Order created successfully.", data: findUserOrder });
                        }
                } else {
                        const findCart = await Cart.findOne({ user: req.user }).populate('items.dishId');
                        if (findCart) {
                                let grandtotal = 0, grandcgst = 0, grandsgst = 0, grandsubTotal = 0;
                                let orderId = await reffralCode();
                                for (let i = 0; i < findCart.items.length; i++) {
                                        console.log(findCart.items[i].dishId);
                                        const sgstPercentage = 0.1;
                                        const cgstPercentage = 0.1;
                                        const sgst = findCart.items[i].totalPrice * sgstPercentage;
                                        const cgst = findCart.items[i].totalPrice * cgstPercentage;
                                        grandcgst += cgst;
                                        grandsgst += sgst;
                                        grandsubTotal = findCart.items[i].totalPrice;
                                        grandtotal += findCart.items[i].totalPrice + cgst + sgst;
                                        let orderData = {
                                                orderId,
                                                userId: findCart.user,
                                                dishId: findCart.items[i].dishId,
                                                restaurantId: findCart.items[i].dishId.dishIsOfRestaurant,
                                                numPortions: findCart.items[i].numPortions,
                                                price: findCart.items[i].totalPrice / findCart.items[i].numPortions,
                                                cGst: cgst,
                                                sGst: sgst,
                                                subTotal: findCart.items[i].totalPrice,
                                                total: findCart.items[i].totalPrice + cgst + sgst,
                                                address: {
                                                        houseFlat: "",
                                                        appartment: "",
                                                        landMark: "",
                                                        houseType: "",
                                                },
                                                orderStatus: "unconfirmed",
                                        };
                                        const order = await orderModel.create(orderData);
                                        let findUserOrder = await userOrder.findOne({ orderId });
                                        if (findUserOrder) {
                                                await userOrder.findByIdAndUpdate({ _id: findUserOrder._id }, { $push: { Orders: order._id }, $set: { subTotal: grandsubTotal, cGst: grandcgst, sGst: grandsgst, total: grandtotal, } }, { new: true });
                                        } else {
                                                let userOrderData = {
                                                        userId: findCart.user,
                                                        orderId,
                                                        Orders: [order._id],
                                                        address: {
                                                                houseFlat: "",
                                                                appartment: "",
                                                                landMark: "",
                                                                houseType: "",
                                                        },
                                                        totalItem: findCart.items.length,
                                                        orderStatus: "unconfirmed",
                                                        paymentStatus: "pending",
                                                };

                                                await userOrder.create(userOrderData);
                                        }
                                }
                                let findUserOrder = await userOrder.findOne({ orderId }).populate('Orders');
                                return res.status(200).json({ status: 200, message: "Order created successfully.", data: findUserOrder });
                        }
                }
        } catch (error) {
                console.error(error);
                return res.status(501).send({ status: 501, message: "Server error.", data: {} });
        }
};
exports.placeOrder = async (req, res) => {
        try {
                const findUserOrder = await userOrder.findOne({ orderId: req.params.orderId });
                if (findUserOrder) {
                        if (req.body.paymentStatus === "paid") {
                                const update = await userOrder.findByIdAndUpdate({ _id: findUserOrder._id }, { $set: { orderStatus: "confirmed", paymentStatus: "paid" } }, { new: true });
                                for (let i = 0; i < update.Orders.length; i++) {
                                        await orderModel.findByIdAndUpdate({ _id: update.Orders[i]._id }, { $set: { orderStatus: "confirmed", paymentStatus: "paid" } }, { new: true });
                                }
                                const transactionData = {
                                        user: req.user._id,
                                        orderId: findUserOrder._id,
                                        date: Date.now(),
                                        amount: findUserOrder.total,
                                        type: "Debit",
                                };
                                const createdTransaction = await transaction.create(transactionData);
                                return res.status(200).json({ status: 200, message: "Payment success.", data: update, });
                        }
                        if (req.body.paymentStatus === "failed") {
                                return res.status(201).json({ status: 201, message: "Payment failed.", orderId: findUserOrder, });
                        }
                } else {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                }
        } catch (error) {
                console.log(error);
                return res.status(500).send({ status: 500, message: "Server error.", data: {} });
        }
};
exports.getAllOrders = async (req, res, next) => {
        try {
                const orders = await userOrder.find({ userId: req.user, orderStatus: "confirmed" }).populate('Orders');
                if (orders.length == 0) {
                        return res.status(404).json({ status: 404, message: "Orders not found", data: {} });
                }
                return res.status(200).json({ status: 200, msg: "orders of user", data: orders })
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.getOrders = async (req, res, next) => {
        try {
                const orders = await orderModel.find({ userId: req.user, orderStatus: "confirmed" }).populate('dishId');
                if (orders.length == 0) {
                        return res.status(404).json({ status: 404, message: "Orders not found", data: {} });
                }
                return res.status(200).json({ status: 200, msg: "orders of user", data: orders })
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.getOrderbyId = async (req, res, next) => {
        try {
                const orders = await orderModel.findById({ _id: req.params.id }).populate('restaurantId userId dishId');
                if (!orders) {
                        return res.status(404).json({ status: 404, message: "Orders not found", data: {} });
                }
                return res.status(200).json({ status: 200, msg: "orders of user", data: orders })
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.createInquiryCatering = async (req, res, next) => {
        try {
                if(req.body.cateringType == "Customized"){
                        let itemsArray = [];
                        for (let i = 0; i < items.length; i++) {
                            const dishData = await cateringDish.findOne({ _id: items[i], dishIsOfRestaurant: req.body.dishIsOfRestaurant});
                            if(dishData){
                                itemsArray.push(items[i]);
                            }
                        }
                        let obj = {
                                user: req.user,
                                option: req.body.option,
                                dishIsOfRestaurant: req.body.dishIsOfRestaurant,
                                items: itemsArray,
                                dateOfOccasion:req.body.dateOfOccasion,
                                noOfPlates: req.body.noOfPlates,
                        }                
                        const user = await cateringQuery.create(obj);
                        if(user){
                                return res.status(200).json({ status: 200, message: "Catering query send successfully.", data: user });
                        }
                }else{
                        const findCatering = await cateringService.findById({ _id: req.body.cateringServiceId});
                        if (!findCatering) {
                                return res.status(404).json({ status: 404, message: "cateringService not found", data: {} });
                        }
                        let obj = {
                                user: req.user,
                                cateringServiceId: findCatering._id,
                                option: findCatering.option,
                                dishIsOfRestaurant: findCatering.dishIsOfRestaurant,
                                items: findCatering.items,
                                noOfPlates: req.body.noOfPlates,
                                dateOfOccasion:req.body.dateOfOccasion,
                        }                
                        const user = await cateringQuery.create(obj);
                        if(user){
                                return res.status(200).json({ status: 200, message: "Catering query send successfully.", data: user });
                        }
                }
        } catch (error) {
                console.log(error);
                return res.status(500).send({ status: 500, message: "Server error.", data: {} });
        }
};
exports.getCateringQuery = async (req, res, next) => {
        try {
                const orders = await cateringQuery.find({ user: req.user }).populate('items dishIsOfRestaurant cateringServiceId')
                if (orders.length == 0) {
                        return res.status(404).json({ status: 404, message: "Catering query not found", data: {} });
                }
                return res.status(200).json({ status: 200, msg: "Catering query of user", data: orders })
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.getCateringQuerybyId = async (req, res, next) => {
        try {
                const orders = await cateringQuery.findById({ _id: req.params.id }).populate('items dishIsOfRestaurant cateringServiceId');
                if (!orders) {
                        return res.status(404).json({ status: 404, message: "Catering query not found", data: {} });
                }
                return res.status(200).json({ status: 200, msg: "Catering query of user", data: orders })
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
const reffralCode = async () => {
        var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let OTP = '';
        for (let i = 0; i < 9; i++) {
                OTP += digits[Math.floor(Math.random() * 36)];
        }
        return OTP;
}