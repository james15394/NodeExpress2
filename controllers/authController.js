const User = require('../model/user');
const jwt = require('jsonwebtoken');

//handling errors
const handlingErr = (err) => {
    const error = {name: "", email: "", password: ""};
    if(err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
        error[properties.path] = properties.message;
    })
    }
    return error;
}
//jwt sign
const jwtSign = (userId) => {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN)
}
module.exports.signup_get = (req, res) => {
    res.render('signup', { title: "Sign up" })
}
module.exports.signup_post = async (req, res) => {
    const {name, email, password} = req.body;
    try {
    const newUser = await User.create({ name, email, password });
    const accessToken = jwtSign(newUser._id);
    res.cookie('jwt', accessToken);
    res.status(200).json({user: newUser._id});
    } catch(err) {
        const showErr = handlingErr(err);
        res.status(400).json({ showErr })
    }
}