const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');

const userSchema = new Schema({
    name : {
        type: String,
        required: [true, "Please enter your name"],
        minlength: [5, "Minimum length is 5"],
        maxlength: [50, " Maximum length is 50"],
        unique: true
    },
    password : {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6,  "Minimum length is 6"]
    },
    email : {
        type: String,
        required: [true, "Please enter your email"],
        validate: [isEmail, "Please enter valid email"],
        unique: true
    } 
})

userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 10)
    next();
})
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if(user) {
        const match = await bcrypt.compare(password, user.password)
        if(match) {
            return user;
        }
        throw Error('Incorrect password')
    } throw Error('Incorrect Email')
}
userSchema.plugin(mongooseUniqueValidator);
const User = mongoose.model('user', userSchema);
module.exports = User;