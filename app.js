const express = require('express');
// const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
require('dotenv').config();

const os = require('os');

// express app
const app = express();

console.log(os.cpus().length);

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI)
    .then((result) => {
        console.log('conneted to the database');
        app.listen(3000);
    })
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// sending response
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
})

// blog routes
app.use('/blogs', blogRoutes);

// error : 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})


