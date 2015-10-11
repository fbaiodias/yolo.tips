import React, { Component, PropTypes } from 'react'
import { Panel, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import moment from 'moment'
import Icon from 'react-fa'
import indexBy from 'lodash.indexby'
import currencies from '../consts/currencies'
import { trackClick } from '../services/analytics'

const mappedCurrencies = indexBy(currencies, 'value')

export default class ResultItem extends Component {
  static propTypes = {
    results: React.PropTypes.arrayOf({
      url: PropTypes.string.isRequired,
      oubound: PropTypes.shape({
        to: PropTypes.string.isRequired,
        from: PropTypes.string.isRequired
      }).isRequired,
      inbound: PropTypes.shape({
        to: PropTypes.string.isRequired,
        from: PropTypes.string.isRequired
      }).isRequired,
      price: PropTypes.number.isRequired
    }).isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      isExpanded: false
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  render () {
    const results = this.state.isExpanded
      ? this.props.results : this.props.results.slice(0, 1)
    const content = results.map((result) => (
      <ListGroupItem>
        <a href={result.url} target='_blank' title='Click to view on skyscanner' onClick={ () => trackClick(result) }>
          <Icon name='share' />
          <h4>{`${moment(result.outbound.departureDate).fromNow()} for ~${Math.round(result.price)}${mappedCurrencies[result.currencyId].shortLabel}`}</h4>
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
      </ListGroupItem>
    ))

    let extra
    if (this.props.results.length > 1) {
      const text = this.state.isExpanded ? 'less' : 'more'
      const icon = this.state.isExpanded ? 'chevron-up' : 'chevron-down'
      extra = (
        <ListGroupItem>
          <a onClick={this.toggle}>
            <Icon name={icon} /> show {text} flights
          </a>
        </ListGroupItem>
      )
    }
    const id = `${results[0].outbound.to.city}-${results[0].outbound.to.country}`.toLowerCase().replace(' ', '-')
    const title = (
      <a id={id} href={`#${id}`}>
        <Icon name='plane' />
        {` Go to ${results[0].outbound.to.city}, ${results[0].outbound.to.country}`}
        <Icon name='link' />
      </a>
    )
    return (
      <Col xs={12} md={12}>
        <Panel bsStyle='primary' header={title}>
          <ListGroup fill>
            {content}
            {extra}
          </ListGroup>
        </Panel>
      </Col>
    )
  }
}
