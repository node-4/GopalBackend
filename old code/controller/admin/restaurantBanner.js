const createError = require('http-errors');

const Banner = require('../../model/restaurantBanner');
const mongoose = require('mongoose');


exports.getBannerByAdmin = async (req, res, next) => {
    try {
        console.log('hit admin get banner');

       // const banner = await Banner.findOne({});
       const banner = await Banner.find();
        if (!banner) return next(createError(400, 'cannot get the banner'));

        return res.status(200).json(banner);

    } catch (error) { 
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}
