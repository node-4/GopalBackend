const Kitchen = require("../../modelNew/kitchen/kitchen");
const kitchenDailyImage = require("../../modelNew/kitchen/kitchenDailyImage");
const KitchenSubscription = require('../../modelNew/kitchen/kitchensubcription');
const Dish = require("../../modelNew/kitchen/kitchenDishes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

exports.createKitchen = async (req, res) => {
        try {
                const { name, email, address, contact, lat, long, radius } = req.body;
                const kitchenData = await Kitchen.findOne({ name: req.body.name, restaurantId: req.user });
                if (kitchenData) {
                        return res.status(409).json({ status: 409, message: "Kitchen already exists" });
                }
                let profile = "";
                if (req.file) {
                        profile = req.file.path;
                }
                let password = bcrypt.hashSync(req.body.password, 8);
                let location = { type: "Point", coordinates: [long, lat] };
                let restaurantId = req.user;
                const newKitchen = new Kitchen({ restaurantId, name, email, password, address, profile, contact, location, radius, });
                const savedKitchen = await newKitchen.save();
                return res.status(200).json({ status: 200, message: "Kitchen created successfully", data: savedKitchen });
        } catch (error) {
                return res.status(500).json({ status: 500, errorName: error.name, message: error.message });
        }
};
exports.getAllKitchens = async (req, res, next) => {
        try {
                const DishData = await Kitchen.find({ restaurantId: req.user });
                if (DishData.length === 0) {
                        return res.status(400).send({ status: 400, message: "cannot get the Kitchen" });
                } else {
                        return res.status(200).send({ status: 200, message: "get the Kitchen", data: DishData });
                }
        } catch (error) {
                console.log(error);
                return res.status(500).json({ status: 500, errorName: error.name, message: error.message, });
        }
};
exports.getKitchenById = async (req, res, next) => {
        try {
                const DishData = await Kitchen.findOne({ _id: req.params.id }).populate('restaurantId');
                if (!DishData) {
                        return res.status(400).send({ status: 400, message: "cannot get the Kitchen" });
                } else {
                        return res.status(200).send({ status: 200, message: "get the Kitchen", data: DishData });
                }
        } catch (error) {
                console.log(error);
                return res.status(500).json({ status: 500, errorName: error.name, message: error.message, });
        }
};
exports.deleteKitchen = async (req, res) => {
        try {
                const Dishdata = await Kitchen.findOneAndDelete({ _id: req.params.id, });
                if (!Dishdata) {
                        return res.status(400).json({ message: "Kitchen not found", });
                }
                return res.status(200).json({ message: "Kitchen deleted", data: Dishdata, });
        } catch (err) {
                console.log(err.message);
                return res.status(500).json({ message: "internal server error", });
        }
};
exports.updateKitchen = async (req, res, next) => {
        try {
                console.log("hit dish");
                const { name, email, address, contact, lat, long, radius } = req.body;
                const restaurant = await Kitchen.findById(req.params.id);
                if (!restaurant) {
                        return res.status(400).send({ status: 400, msg: "Dish not found" });
                } else {
                        const DishData = await Kitchen.findOne({ _id: { $ne: restaurant._id }, name: req.body.name, restaurantId: req.user });
                        if (DishData) {
                                return res.status(409).send({ status: 409, message: "Dish already exits" });
                        }
                        if (req.file) {
                                req.body.profile = req.file.path;
                        } else {
                                req.body.profile = restaurant.profile;
                        }
                        let password;
                        if (req.body.password) {
                                password = bcrypt.hashSync(req.body.password, 8);
                        } else {
                                password = restaurant.password;
                        }
                        let lat1, long1;
                        if (lat && long) {
                                lat1 = lat;
                                long1 = long;
                        } else {
                                lat1 = restaurant.location.coordinates[0];
                                long1 = restaurant.location.coordinates[1];
                        }
                        let location = { type: "Point", coordinates: [lat1, long1] };
                        const data = {
                                name: name || restaurant.name,
                                email: email || restaurant.email,
                                address: address || restaurant.address,
                                contact: contact || restaurant.contact,
                                radius: radius || restaurant.radius,
                                password: password,
                                profile: req.body.profile || restaurant.profile,
                                location: location || restaurant.location,
                        };
                        const updated = await Kitchen.findOneAndUpdate({ _id: restaurant._id }, { $set: data }, { new: true });
                        if (!updated) {
                                return res.status(400).send({ status: 400, message: "Cannot update the Kitchen" });
                        }
                        return res.status(200).send({ status: 200, message: "Kitchen updated successfully", data: updated });
                }
        } catch (error) {
                console.log(error);
                return res.status(500).json({ status: 500, errorName: error.name, message: error.message, });
        }
};
exports.kitchenLogin = async (req, res) => {
        try {
                if (!req.body.email) {
                        return res.status(400).send({ status: 400, message: "email is required" });
                }
                if (!req.body.password) {
                        return res.status(400).send({ status: 400, message: "password is required" });
                }
                const admin = await Kitchen.findOne({ email: req.body.email });
                if (!admin) {
                        return res.status(400).send({ status: 400, message: "Failed! Kitchen passed doesn't exist" });
                }
                const passwordIsValid = bcrypt.compare(req.body.password, admin.password);
                if (!passwordIsValid) {
                        return res.status(401).send({ status: 401, message: "Wrong password" });
                }
                const accessToken1 = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "365d", });
                return res.status(200).send({ status: 200, msg: "Kitchen logged in successfully", accessToken: accessToken1, });
        } catch (err) {
                console.log(err);
                return res.status(500).send({ status: 500, message: "Internal server error while restaurant signing in", });
        }
};
exports.me = async (req, res, next) => {
        try {
                const restaurant = await Kitchen.findById(req.user);
                if (!restaurant) {
                        return res.status(400).send({ status: 400, msg: "Kitchen not found" });
                } else {
                        return res.status(200).send({ status: 200, message: "Kitchen found  successfully ", data: restaurant });
                }
        } catch (error) {
                return res.status(500).send({ status: 500, message: "Server error" + error.message });
        }
}
exports.uploadDailyImageInKitchen = async (req, res, next) => {
        try {
                const DishData = await Kitchen.findOne({ _id: req.user });
                if (!DishData) {
                        return res.status(400).send({ status: 400, message: "cannot get the Kitchen" });
                }
                let date = new Date().toISOString().split("T")[0];
                const kitchenImage = new kitchenDailyImage({
                        kitchenId: req.user,
                        image: req.files.map(file => ({ img: file.path })),
                        date: date,
                });
                const savedImage = await kitchenImage.save();
                return res.status(201).json({ message: 'Image uploaded successfully', data: savedImage });
        } catch (error) {
                return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
};
exports.allDailyImageInKitchen = async (req, res, next) => {
        try {
                const DishData = await Kitchen.findOne({ _id: req.user });
                if (!DishData) {
                        return res.status(400).send({ status: 400, message: "cannot get the Kitchen" });
                }
                const kitchenImage = await kitchenDailyImage.find({ kitchenId: req.user });
                if (kitchenImage.length > 0) {
                        return res.status(201).json({ message: 'Kitchen daily image successfully', data: kitchenImage });
                } else {
                        return res.status(201).json({ message: 'Kitchen daily image successfully', data: [] });
                }
        } catch (error) {
                return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
};
exports.allDailyImageInKitchenbyDate = async (req, res, next) => {
        try {
                const DishData = await Kitchen.findOne({ _id: req.params.kitchenId });
                if (!DishData) {
                        return res.status(400).send({ status: 400, message: "cannot get the Kitchen" });
                }
                const kitchenImage = await kitchenDailyImage.findOne({ kitchenId: DishData._id, date: req.params.date });
                if (kitchenImage) {
                        return res.status(201).json({ message: 'Kitchen daily image successfully', data: kitchenImage });
                } else {
                        return res.status(201).json({ message: 'Kitchen daily image successfully', data: [] });
                }
        } catch (error) {
                return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
};
exports.createKitchenSubscription = async (req, res) => {
        try {
                const { type, price, month, } = req.body;
                if (!month || !type || !price) {
                        return res.status(400).send({ status: 400, msg: "Please provide month, plan, and price" });
                }
                const subscriptions = await KitchenSubscription.findOne({ kitchenId: req.user, type });
                if (subscriptions) {
                        return res.status(400).send({ status: 400, msg: "Subscription already exists" });
                }
                let plan, breakfastTiming, lunchTiming, dinnerTiming;
                if (type == "BLD") {
                        plan = "Break + Lunch + Dinner";
                        breakfastTiming = "Morning 9 am";
                        lunchTiming = "Morning 9 am";
                        dinnerTiming = "8 pm";
                }
                if (type == "LD") {
                        plan = "Lunch + Dinner";
                        breakfastTiming = null;
                        lunchTiming = "Morning 9 am";
                        dinnerTiming = "8 pm";
                }
                if (type == "L") {
                        plan = "Only Lunch";
                        breakfastTiming = null;
                        lunchTiming = "Morning 9 am";
                        dinnerTiming = null;
                }
                if (type == "D") {
                        plan = "Only Dinner";
                        breakfastTiming = null;
                        lunchTiming = null;
                        dinnerTiming = "8 pm";
                }
                const subscription = new KitchenSubscription({ kitchenId: req.user, type, breakfastTiming, lunchTiming, dinnerTiming, plan, price, month: month, });
                const result = await subscription.save();
                return res.status(200).json({ status: 200, msg: "Subscription created successfully", data: result });
        } catch (error) {
                console.error(error.message);
                return res.status(500).json({ msg: "Internal server error", error: error.message });
        }
};
exports.getAllKitchenSubscription = async (req, res) => {
        try {
                const subscriptions = await KitchenSubscription.find({ kitchenId: req.user });
                if (subscriptions.length === 0) {
                        return res.status(404).json({ status: 404, msg: "Subscriptions not found" });
                }
                return res.status(200).json({ status: 200, msg: "Subscription found successfully", data: subscriptions });
        } catch (error) {
                console.error(error.message);
                return res.status(500).json({ msg: "Internal server error", error: error.message });
        }
};
exports.getKitchenSubscriptionById = async (req, res) => {
        try {
                const subscription = await KitchenSubscription.findById(req.params.id).populate('kitchenId dinner lunch breakfast');
                if (!subscription) {
                        return res.status(404).json({ status: 404, msg: "Subscription not found" });
                }
                return res.status(200).json({ status: 200, msg: "Subscription found successfully", data: subscription });
        } catch (error) {
                console.error(error.message);
                return res.status(500).json({ msg: "Internal server error", error: error.message });
        }
};
exports.updateKitchenSubscription = async (req, res) => {
        try {
                const { plan, price, month } = req.body;
                if (!plan || !price) {
                        return res.status(400).send("Please provide plan and price");
                }
                const updatedSubscription = await KitchenSubscription.findByIdAndUpdate(req.params.id, { plan, price, month: month || 0 }, { new: true });
                if (!updatedSubscription) {
                        return res.status(404).json({ msg: "Subscription not found" });
                }
                return res.status(200).json({ msg: "Subscription updated successfully", data: updatedSubscription });
        } catch (error) {
                console.error(error.message);
                return res.status(500).json({ msg: "Internal server error", error: error.message });
        }
};
exports.deleteKitchenSubscription = async (req, res) => {
        try {
                const deletedSubscription = await KitchenSubscription.findByIdAndDelete(req.params.id);

                if (!deletedSubscription) {
                        return res.status(404).json({ msg: "Subscription not found" });
                }
                return res.status(200).json({ msg: "Subscription deleted successfully", data: deletedSubscription });
        } catch (error) {
                console.error(error.message);
                return res.status(500).json({ msg: "Internal server error", error: error.message });
        }
};
exports.getAllKitchenSubscriptionbyKitchenId = async (req, res) => {
        try {
                const subscriptions = await KitchenSubscription.find({ kitchenId: req.params.kitchenId });
                if (subscriptions.length === 0) {
                        return res.status(404).json({ status: 404, msg: "Subscriptions not found" });
                }
                return res.status(200).json({ status: 200, msg: "Subscription found successfully", data: subscriptions });
        } catch (error) {
                console.error(error.message);
                return res.status(500).json({ msg: "Internal server error", error: error.message });
        }
};
exports.createDish = async (req, res, next) => {
        try {
                console.log("hit dish");
                const DishData = await Dish.findOne({ dishName: req.body.dishName, dishIsOfKitchen: req.user });
                if (DishData) {
                        return res.status(409).send({ status: 409, message: "Dish already exits" });
                }
                if (req.file) {
                        req.body.foodImg = req.file.path;
                }
                const newDish = await Dish.create({
                        foodImg: req.body.foodImg,
                        dishName: req.body.dishName,
                        description: req.body.description,
                        dishIsOfKitchen: req.user,
                        currency: req.body.currency,
                        option: req.body.option,
                });
                if (!newDish) {
                        return res.status(400).send({ status: 400, message: "cannot add the new Dish" });
                }
                return res.status(200).send({ status: 200, message: "add the new Dish", data: newDish });
        } catch (error) {
                console.log(error);
                return res.status(500).json({ status: 500, errorName: error.name, message: error.message, });
        }
};
exports.getDish = async (req, res, next) => {
        try {
                const DishData = await Dish.find({ dishIsOfKitchen: req.user });
                if (DishData.length === 0) {
                        return res.status(400).send({ status: 400, message: "cannot get the Dish" });
                } else {
                        return res.status(200).send({ status: 200, message: "get the Dish", data: DishData });
                }
        } catch (error) {
                console.log(error);
                return res.status(500).json({ status: 500, errorName: error.name, message: error.message, });
        }
};
exports.getDishByIdOfKitchen = async (req, res, next) => {
        try {
                console.log("hit restaurant get Dish");
                const DishData = await Dish.find({ dishIsOfKitchen: req.params.id }).populate('dishIsOfKitchen');
                if (DishData.length === 0) {
                        return res.status(400).send({ status: 400, message: "cannot get the Dish" });
                } else {
                        return res.status(200).send({ status: 200, message: "get the Dish", data: DishData });
                }
        } catch (error) {
                console.log(error);
                return res.status(500).json({ errorName: error.name, message: error.message, });
        }
};
exports.getdishesByName = async (req, res, next) => {
        try {
                console.log("hit restaurant get Dish");
                const dish = req.params.dishName;
                const DishData = await Dish.find({ dishName: dish }).populate('dishIsOfKitchen');
                if (DishData.length === 0) {
                        return res.status(400).send({ status: 400, message: "cannot get the Dish" });
                } else {
                        return res.status(200).send({ status: 200, message: "get the Dish", data: DishData });
                }
        } catch (error) {
                console.log(error);
                return res.status(500).json({ errorName: error.name, message: error.message, });
        }
};
exports.editDish = async (req, res, next) => {
        try {
                console.log("hit dish");
                const restaurant = await Dish.findById(req.params.id);
                if (!restaurant) {
                        return res.status(400).send({ status: 400, msg: "Dish not found" });
                } else {
                        const DishData = await Dish.findOne({ _id: { $ne: restaurant._id }, dishName: req.body.dishName, dishIsOfKitchen: req.user });
                        if (DishData) {
                                return res.status(409).send({ status: 409, message: "Dish already exits" });
                        }
                        if (req.file) {
                                req.body.foodImg = req.file.path;
                        } else {
                                req.body.foodImg = restaurant.foodImg;
                        }
                        const data = {
                                foodImg: req.body.foodImg || restaurant.foodImg,
                                dishName: req.body.dishName || restaurant.dishName,
                                description: req.body.description || restaurant.description,
                                dishIsOfKitchen: req.user || restaurant.dishIsOfKitchen,
                                currency: req.body.currency || restaurant.currency,
                                option: req.body.option || restaurant.option,
                        };
                        const updated = await Dish.findOneAndUpdate({ _id: restaurant._id }, { $set: data }, { new: true });
                        if (!updated) {
                                return res.status(400).send({ status: 400, message: "Cannot update the Dish" });
                        }
                        return res.status(200).send({ status: 200, message: "Update the Dish", data: updated });
                }
        } catch (error) {
                console.log(error);
                return res.status(500).json({ status: 500, errorName: error.name, message: error.message, });
        }
};
exports.getDishByID = async (req, res, next) => {
        try {
                const DishData = await Dish.findOne({ _id: req.params.id }).populate('dishIsOfKitchen');
                if (!DishData) {
                        return res.status(400).send({ status: 400, message: "cannot get the Dish" });
                } else {
                        return res.status(200).send({ status: 200, message: "get the Dish", data: DishData });
                }
        } catch (error) {
                console.log(error);
                return res.status(500).json({ status: 500, errorName: error.name, message: error.message, });
        }
};
exports.deleteDish = async (req, res) => {
        try {
                const Dishdata = await Dish.findOneAndDelete({ _id: req.params.id, });
                if (!Dishdata) {
                        return res.status(400).json({ message: "Dishdata not found", });
                }
                return res.status(200).json({ message: "Dishdata deleted", data: Dishdata, });
        } catch (err) {
                console.log(err.message);
                return res.status(500).json({ message: "internal server error", });
        }
};
exports.addDishtoSubscription = async (req, res) => {
        try {
                const { subscriptionId, mealType } = req.params;
                const { dishId } = req.body;
                const subscription = await KitchenSubscription.findById(subscriptionId);
                if (!subscription) {
                        return res.status(404).json({ message: "Subscription not found" });
                }
                subscription[mealType].push(dishId);
                await subscription.save();
                return res.status(200).json({ message: "Dish added successfully", subscription });
        } catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal server error" });
        }
}
exports.removeDishtoSubscription = async (req, res) => {
        try {
                const { subscriptionId, mealType } = req.params;
                const { dishId } = req.body;
                const subscription = await KitchenSubscription.findById(subscriptionId);
                if (!subscription) {
                        return res.status(404).json({ message: "Subscription not found" });
                }
                subscription[mealType] = subscription[mealType].filter(
                        (id) => id.toString() !== dishId
                );
                await subscription.save();
                return res.status(200).json({ message: "Dish removed successfully", subscription });
        } catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal server error" });
        }
}