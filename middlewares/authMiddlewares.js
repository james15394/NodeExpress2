const jwt = require('jsonwebtoken');

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
            if(err) {
                console.log(err.message);
                res.redirect('/login')
            } else {
                console.log(decoded);
                next();
            }
        });
    } else {
        res.redirect('/login')
    }
}