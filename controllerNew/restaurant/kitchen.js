const Kitchen = require("../../model/kitchen/kitchen");
const kitchenDailyImage = require("../../model/kitchen/kitchenDailyImage");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
// Create a new kitchen
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