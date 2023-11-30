const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        default: 'admin',
        enum:['admin']
    }

},{
    timestamps:true
})

adminSchema.methods.checkPassword = async function(passwordText,passwordHash){
    return bcrypt.compare(passwordText,passwordHash)
}

adminSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
        next()

    } else {
        next()
    }
})



module.exports = mongoose.model('Admin', adminSchema);
