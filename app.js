const express = require('express')
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoutes');
require('dotenv').config();
const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));
app.use(authRoute);

mongoose.connect(process.env.MONGO_SECRET, {useNewUrlParser: true, useUnifiedTopology: true});

//get
app.get('/', (req, res) => {
    res.render('home', { title: "Home"});
});
//post

app.listen(3000);