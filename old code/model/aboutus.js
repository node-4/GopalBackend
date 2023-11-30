const mongoose = require('mongoose');

const aboutusSchema = new mongoose.Schema({
  privacypolicy: {
    type: String,
  },

});

module.exports = mongoose.model('aboutus', aboutusSchema);
