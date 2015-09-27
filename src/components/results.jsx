import React, { Component, PropTypes } from 'react'
import { Panel, Row, Col, Alert } from 'react-bootstrap'
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

    this.state = {
      results: [],
      isLoading: false,
      isFinished: false
    }
  }

  componentWillReceiveProps (nextProps) {
    this.search(nextProps.options)
  }

  componentDidMount () {
    this.search(this.props.options)
  }

  search (options) {
    this.setState({ isLoading: true, isFinished: false, error: undefined })
    search(options)
      .then((results) => this.setState({ isLoading: false, isFinished: true, results }))
      .catch((error) => this.setState({ isLoading: false, isFinished: true, error }))
  }

  render () {
    const { isLoading, isFinished, error, results } = this.state

    if (isLoading) {
      return (
        <div className='results'>
          <div className='loading'>
            <Icon name='circle-o-notch' spin />
            <p className='silliness'></p>
          </div>
        </div>
      )
    }

    if (error) {
      console.error(error)
      return (
        <div className='results'>
          <Alert bsStyle='danger'>
            <h4>Oh snap! You got an error!</h4>
            <p>Sorry, there was an error getting your #YOLO tips :(</p>
            <p>Please try again later.</p>
          </Alert>
        </div>
      )
    }

    if (isFinished && results.length === 0) {
      return (
        <div className='results'>
          <Alert bsStyle='warning'>
            <h4>Nothing found, sorry :(</h4>
            <p>You can always, try again later.</p>
          </Alert>
        </div>
      )
    }

    if (results.length > 0) {
      const content = results.map((result) => (
        <Col xs={12} md={6}>
          <a href={result.url} target='_blank' title='Click to view on skyscanner'>
            <Panel>
              <Icon name='share' />
              <h4>{`${result.outbound.to.city}, ${result.outbound.to.country} ${moment(result.outbound.departureDate).fromNow()} for ~${Math.round(result.price)}${mappedCurrencies[result.currencyId].shortLabel}`}</h4>
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
            </Panel>
          </a>
        </Col>
      ))

      return (
        <Row className='results'>
          <Col xs={12} md={12}>
            <h3>Here are our best tips for you:</h3>
          </Col>
          {content}
        </Row>
      )
    }

    return (<div className='results' />)
  }
}
