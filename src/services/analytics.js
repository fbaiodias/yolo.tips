import moment from 'moment'
import places from '../consts/airports.js'
import currencies from '../consts/currencies'

export function sendEvent (details) {
  window.ga('send', {
    hitType: 'event',
    ...details
  })
}

export function trackSearch (details) {
  const origin = places.filter((place) => place.value === details.origin)[0].label
  const currency = currencies.filter((cur) => cur.value === details.currency)[0].shortLabel

  const label = `Fly from ${origin}, in the next ${details.weeks === '1' ? 'weekend' : details.weeks + ' weekends'}, for a maximum of ${details.max}${currency}`

  sendEvent({
    eventCategory: 'Search',
    eventAction: 'search',
    eventLabel: label
  })
}

export function trackClick (result) {
  const currency = currencies.filter((cur) => cur.value === result.currencyId)[0].shortLabel
  const label = `Go to ${result.outbound.to.city}, ${result.outbound.to.country} ${moment(result.outbound.departureDate).fromNow()} for ~${Math.round(result.price)}${currency}`

  sendEvent({
    eventCategory: 'Click',
    eventAction: 'click',
    eventLabel: label
  })
}
