const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//handling errors
const handlingErr = (err) => {
    const error = {name: "", email: "", password: ""};
    if(err.message == "Incorrect password") {
        error.password = "Incorrect Password"
    }
    if(err.message == "Incorrect Email") {
        error.email = "Incorrect Email"
    }
    if(err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
        if(properties.type =="unique" && properties.path == "name" ) {
            error.name = "Username already in use"
        } else if (properties.type =="unique" && properties.path == "email") {
            error.email = "Email already in use"
        } else {
        error[properties.path] = properties.message;
        }
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

module.exports.login_get = (req, res) => {
    res.render('login', { title: "Log in"})
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const accessToken = jwtSign(user._id);
        res.cookie('jwt', accessToken)
        res.status(200).json({ user: user._id })
    } catch(err) {
        const error = handlingErr(err);
        res.status(400).json({ error });
    }
}

