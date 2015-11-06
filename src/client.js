var unirest = require('unirest');
var q = require('q');

exports.Components = function(brand, components, token) {
  this.API_ENDPOINT = 'http://localhost:3000/'

  this.brand = brand;
  this.components = components;
  this.token = token;

  var self = this;
  var result;

  this.getCss = function() {
    return result.css;
  }

  this.getJs = function() {
    return result.js;
  }

  this.getHtml = function(component) {
    return result.html[component];
  }

  function buildComponentParams(parameters) {
    var qs = '';

    for(var key in parameters) {
      var value = parameters[key];
      qs += 'component' + '=' + encodeURIComponent(value) + '&';
    }
    if (qs.length > 0) {
      qs = qs.substring(0, qs.length -1);
      url = '?' + qs;
    }
    return qs;
  }

  this.fetch = function() {
    var deferred = q.defer();

    var componentsQuery = buildComponentParams(self.components);

    unirest.get(self.API_ENDPOINT + '?brand=' + self.brand + '&' + componentsQuery + '&token=' + self.token).end(function(response) {
      result = response.body;

      deferred.resolve();
    });

    return deferred.promise;
  }

  return {
    fetch: self.fetch,
    getCss: self.getCss,
    getJs: self.getJs,
    getHtml: self.getHtml
  }
}
