var 
  express = require("express"),
  app = express(),
  fs = require("fs"),
  path = require("path"),
  routesPath = path.join(__dirname, "routes"),
  methodOverride = require("method-override"),
  port = process.env.PORT || 3000;
  
app.use(express.bodyParser());
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(express.static(__dirname + "/statics"));

// Add headers
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
});

// Comming up routes
fs.readdirSync(routesPath).forEach(function(file) {
  require(__dirname + "/routes/" + file)(app);
	
  console.log("Comming up %s routes..", file);
});

var server = app.listen(port, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Server started at %s!", port);
});
