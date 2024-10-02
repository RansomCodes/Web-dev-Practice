const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const { checkUser } = require('./authMiddleware');
const userRoutes = require('./routes/user');
const dashboardRoutes = require('./routes/dashboard');
const expressLayouts = require('express-ejs-layouts');

const DB_URL = 'mongodb://localhost:27017/Dealsdray';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Set up view engine and layout
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'components/boilerplate'); // Set the default layout
app.use('/styles', express.static(path.join(__dirname, 'views/styles')));

mongoose.connect(DB_URL)
    .then(() => {
        console.log("MONGO CONNECTION OPEN");
    });

app.get('*', checkUser);
app.use('/', userRoutes);
app.use('/dashboard', dashboardRoutes);

app.use('*', (req, res) => {
    res.render('notfound')
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});