var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

global.__basedir = __dirname + "/..";
// include database config file
const db = require("./app/model");

//force: true will drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync with { force: true }");
// })
db.sequelize.sync().then(()=> {
    console.log("sync");
});

// include application routes
require("./app/route.js")(app);

// Create & Listen Server
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Application request listening at http://%s:%s", host, port);
});
