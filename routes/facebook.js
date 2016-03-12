var 
  Util = require("../libs/Util").Util, 
  FB = require("fb"),
  conf = require("../config/configuration.json");

module.exports = function(app) {
  app.put('/check', function(req, resp) {
    resp.send("LIVE");
  });
  app.post('/fb/friends', function(req, resp) {
    if(Util.findAttribute(req.body, "uid")) {
      var userId = req.body.uid;

      FB.api('v2.5/oauth/access_token', {
          client_id: conf.clientId,
          client_secret: conf.clientSecret,
          grant_type: conf.grantType
        }, function (response) {
          if(!response || response.error) {
            resp.json({friends: [], error: response.erro});
          } else {
            FB.api(userId + "/friends", {access_token: response.access_token}, function(response) {
              if(!response || response.error) {
                console.log(response.error);
                resp.json({friends: [], error: response.error});
              } else {
                resp.json({friends: response.data});
              }
            });  
          }
      });
    } else {
      resp.json({friends: [], error: "invalid data!"});
    }
  });
};
