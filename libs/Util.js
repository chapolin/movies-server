(function() {
  "use strict";
  
  var _ = require("lodash");

  var Util = exports.Util = function () {
  };
  
  /**
  * Verify if field request is valid
  */
  Util.findAttribute = function(object, attributes) {
    if(_.get(object, attributes)) {
      return true;
    }
    
  	return false;
  };
})();
