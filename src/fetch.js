var unirest = require('unirest');
var appConstants = require('app-constants');

function buildParams(params) {

  return params.map(function(param) {
    return 'component=' + encodeURIComponent(param);
  }).join('&');
}

function fetch(brand, components, callback) {

  var query = buildParams(components);
  unirest.get(appConstants.API_ENDPOINT + '?brand=' + brand + '&' + query).end(callback);
}

module.exports = fetch;