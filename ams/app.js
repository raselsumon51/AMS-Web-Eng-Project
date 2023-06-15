const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const expressLayouts = require('express-ejs-layouts');

const adminRoutes = require('./routes/admin');
const courseRoutes = require('./routes/courseRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');
const attendanceRoutes = require('./routes/attendance');

const app = express();
const port = 3000;

// Middleware and configurations
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

// Session configuration
const store = new MongoStore({
    url: 'mongodb://localhost:27017/attendance',
    ttl: 604800 // 7 days
});

app.use(
    session({
        secret: 'ljfkfkkrkririejdbc',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
        store: store
    })
);

// Routes
app.use('/admin', adminRoutes);
app.use('/course', courseRoutes);
app.use('/teacher', teacherRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/student', studentRoutes);

app.get('/', (req, res) => {
    res.send('Hello !');
});

// Database connection
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/attendance');

// Start the server
app.listen(port, () => {
    console.log(`Express app listening on port ${port}`);
});
