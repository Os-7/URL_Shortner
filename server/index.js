const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");
const session = require("express-session");
const shortUrl = require("./routes/shortUrl");
const urlRoutes = require("./routes/url");
const URL = require("./models/url");

// Connect to the database
const options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    tls: true,
};

mongoose.connect(config.database, options);

// On successful connection
mongoose.connection.on('connected', () => {
    console.log(`Database connected: ${config.database}`);
});

// On connection error
mongoose.connection.on('error', (err) => {
    console.error(`Database connection error: ${err}`);
});

const app = express();

const users = require('./routes/users');

// Port Number
const port = process.env.PORT || 3000;

// CORS Middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body-Parser Middleware
app.use(bodyParser.json());

// Express Session Middleware
app.use(session({
    secret: 'MysecretKey',
    resave: true,
    saveUninitialized: true
})); 

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport); 

app.use('/users', users); 

app.use("/url", urlRoutes);

//URL route server
app.use("/short", shortUrl);

// Index Route server
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
