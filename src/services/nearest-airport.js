var sphereKnn = require('sphere-knn')
var airports = require('../consts/airports.json')

var nearestAirport = sphereKnn(airports)  // (lat, lon, maxResults, maxDistance)

function geolocate () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(function (position) {
      resolve({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      })
    }, reject)
  })
}

module.exports = function () {
  return geolocate()
  .then(function (pos) {
    var closest = nearestAirport(pos.lat, pos.lon, 10, Infinity)

    return closest.filter(function (airport) {
      return airport.name && airport.name.toLowerCase() === 'all airports'
    })[0] || closest[0] || Promise.reject('No airports found')
  })
}
