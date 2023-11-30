const mongoose = require('mongoose');

const cancellationSchema = new mongoose.Schema({
   msg:{type:String}
},{
    timestamps: true
})

module.exports = mongoose.model('cancellation',cancellationSchema);
