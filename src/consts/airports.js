import uniq from 'lodash.uniq'
import groupBy from 'lodash.groupby'

const airportCodes = require('airport-codes/airports.json')

// When there's an "all airports" entry available, deduplicate all entries in the same city to the same airport.
export default (function () {
  let places

  places = airportCodes.filter(({ iata }) => !!iata)

  places = groupBy(places, 'city')

  places = Object.keys(places).map((k) => places[k])

  places = places.map(
    (placeArr) =>
      (placeArr.filter(({ name }) => name.toLowerCase() === 'all airports')[0] || placeArr[0]))

  const presentAirport = ({ name, city, country, iata, latitude, longitude }) => ({
    label: name.toLowerCase() !== 'all airports' ?
      `${name} (${ iata.toUpperCase() }), ${city}, ${country}` :
      `${city}, ${country}`,
    value: iata,
    iata,
    latitude,
    longitude
  });

  return uniq(airportCodes.map(presentAirport), 'value')
}())
