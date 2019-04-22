//Importing Require Modules
const express =  require("express");
const mongoose = require("mongoose");
const http = require('http');
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const config = require('./config/database');
const socketIO = require('socket.io');

const passport = require('passport');
const passportConfig = require('./config/passport');

const routes = require("./routes/routes");

//Initializing express server.
const app = express();

//Connecting to database.
mongoose.connect(config.database);


//On Database Connected, displaying the database connected message on console.
mongoose.connection.on('connected', () => {
    console.log("Database :"+ config.database +" connection successfully");
});

//On Database Connection failed, displaying the database connected message on console.
mongoose.connection.on('error', (err) => {
    console.log("Database :"+ config.database +" connection failed. Reason :"+ err);
});


//Cors is used to allow other domains to access our application.
app.use(cors());

//BodyParser is used to parse in coming request body.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Passport
app.use(passport.initialize());
app.use(passport.session());
passportConfig.configStrategy(app,passport);

//Passing app to route module to configure the routes.
routes(app);

//Port number
const port = 3000;

// //Starting the server.
// app.listen(port, ()=>{
//     console.log("Sever running in port : "+ port);
// });

const server = http.createServer(app);
const io = socketIO(server);
app.set('io', io);

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Required for navigating angular routes without server routes
app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

server.listen(port, ()=>{
    console.log("Sever running in port : "+ port);
});