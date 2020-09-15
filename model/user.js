const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    password : {
        type: String,
        required: true,
        minlength: 6
    },
    email : {
        type: String,
        required: true
    } 
})

const User = mongoose.model('user', UserSchema);
module.exports = User;