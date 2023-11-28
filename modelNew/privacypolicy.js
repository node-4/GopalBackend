const mongoose = require('mongoose');

const privacyPolicySchema = new mongoose.Schema({
    privacy: {
    type: String,
    //required: true
  },

});

module.exports = mongoose.model('PrivacyPolicy', privacyPolicySchema);
