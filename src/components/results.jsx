import React, { Component, PropTypes } from 'react'
import { Panel, Row, Col } from 'react-bootstrap'
import moment from 'moment'
import Icon from 'react-fa'
import indexBy from 'lodash.indexby'
import search from '../services/search'
import currencies from '../consts/currencies'

const mappedCurrencies = indexBy(currencies, 'value')

export default class Results extends Component {
  static propPypes = {
    options: PropTypes.shape({
      origin: PropTypes.string.isRequired
    }).isRequired
  }

  constructor (props) {
    super(props)

    this.search = this.search.bind(this)

    this.state = {}

    this.search(props.options)
  }

  componentWillReceiveProps (nextProps) {
    this.search(nextProps.options)
  }

  search (options) {
    search(options)
      .then((results) => this.setState({ results }))
      .catch((error) => this.setState({ error }))
  }

  render () {
    let results

    if (!this.state.results) {
      results = (
        <div className='loading'>
          <Icon name='circle-o-notch' spin />
          <p className='silliness'></p>
        </div>
      )
    } else if (this.state.results.length === 0) {
      results = (<h3>nothing found, sorry :(</h3>)
    } else {
      results = this.state.results.map((result) => (
        <Col xs={12} md={6}>
          <Panel>
            <a href={result.url} target='_blank' title='Click to view on skyscanner'>
              <h4>{`${result.outbound.to.city}, ${result.outbound.to.country} ${moment(result.outbound.departureDate).fromNow()} for ${Math.round(result.price)}${mappedCurrencies[result.currencyId].shortLabel}`}</h4>
              <p>
                <Icon name='long-arrow-right' />
                {moment(result.outbound.departureDate).format('dddd, MMMM Do')}
                <br />
                <small>{`${result.outbound.from.airport}, ${result.outbound.from.country} to ${result.outbound.to.airport}, ${result.outbound.to.country}`}</small>
              </p>
              <p>
                <Icon name='long-arrow-left' />
                {moment(result.inbound.departureDate).format('dddd, MMMM Do')}
                <br />
                <small>{`${result.inbound.from.airport}, ${result.inbound.from.country} to ${result.inbound.to.airport}, ${result.inbound.to.country}`}</small>
              </p>
            </a>
          </Panel>
        </Col>
      ))
    }

    return (
      <Row className='results'>
        {results}
      </Row>
    )
  }
}
