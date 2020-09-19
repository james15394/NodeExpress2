const express = require('express')
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoutes');
var cookieParser = require('cookie-parser')
const authMiddleware = require('./middlewares/authMiddlewares');
require('dotenv').config();
const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));
app.use(authRoute);
app.use(cookieParser())

mongoose.connect(process.env.MONGO_SECRET, {useNewUrlParser: true, useUnifiedTopology: true});

//get
app.get('/', (req, res) => {
    res.render('home', { title: "Home"});
});
app.get('/booklist', authMiddleware.requireAuth, (req, res) => {
    res.render('booklist', { title: "Book List"});
});
//post

app.listen(3000);