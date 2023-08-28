const mongoose = require('mongoose');

const aboutusSchema = new mongoose.Schema({
    privacypolicy: {
    type: String,
    //required: true
  },

});

module.exports = mongoose.model('aboutus', aboutusSchema);
