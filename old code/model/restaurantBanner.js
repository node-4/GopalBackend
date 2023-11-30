const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    images: [{type:String ,
                 default: "https://static.vecteezy.com/system/resources/thumbnails/008/154/360/small/student-logo-vector.jpg"
    }]
    })

module.exports = mongoose.model('Banner', bannerSchema);
