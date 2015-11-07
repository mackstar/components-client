var fetch = require('fetch');
var Q = require('q');
var unirest = require('unirest');


function Components(brand, components) {

  var deferred = Q.defer();
  var result;
  function responseHandler(response) {
    result = response.body;
    deferred.resolve();
  }

  return {
    getCss: function() {
      return result.css;
    },

    getJs: function() {
      return result.js;
    },

    getHtml: function(component) {
      return result.html[component];
    },

    fetch: function() {
      fetch(brand, components, responseHandler);
      return deferred.promise;
    }
  }


}

module.exports = Components;