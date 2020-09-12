const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_SECRET, {useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.json());
app.use(express.static('public'));
//get
app.get('/', (req, res) => {
    res.render('signup');
});
//post

app.listen(3000);