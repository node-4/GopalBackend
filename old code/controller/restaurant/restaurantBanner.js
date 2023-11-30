const createError = require('http-errors');

const Banner = require('../../model/restaurantBanner');
const mongoose = require('mongoose');


exports.addBanner = async (req, res, next) => {
    try {
        console.log('hit admin add banner');

        //  if ( req.files.banner.length === 0) return next(createError(400, 'please provide the banner images'));

        // if (await Banner.findOne({})) return next(createError(400, 'a banner already exists please update the existing one'));

        // const pathArray = req.files.banner.map((item) => {
        //     return `${item.destination}/${item.filename}`
        // })

        const newBanner = await Banner.create({
            images: /*pathArray*/req.body.images
        });

        if (!newBanner) return next(createError(400, 'cannot add the new banner'));

        return res.status(200).json(newBanner);


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.updateBanner = async (req, res, next) => {
    try {
        //  if ( req.files.banner.length === 0 ) return next(createError(400, 'please provide the banner images'));

        // const pathArray = req.files.banner.map((item) => {
        //     return `${item.destination}/${item.filename}`
        // })

        const updated = await Banner.findOneAndUpdate({ _id: req.params.id }, {
            images: /*pathArray*/req.body.images
        }, { new: true });

        if (!updated) return next(createError(400, 'cannot update the banner'));

        return res.status(200).json(updated);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.getBanner = async (req, res, next) => {
    try {
        console.log('hit restaurant get banner');

        // const banner = await Banner.findOne({});
        const banner = await Banner.find();
        if (banner.length == 0) return next(createError(400, 'cannot get the banner'));

        return res.status(200).json(banner);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}


exports.deleteBanner = async (req, res, next) => {
    try {

        const { id } = req.params;

        const deletedCoupon = await Banner.findOneAndDelete({
            // restaurantId: req.user,
            _id: id,
        });

        if (!deletedCoupon)
            return next(CreateError(400, "cannot delete the coupon"));

        return res.status(200).json({ message: " deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message,
        });
    }
};