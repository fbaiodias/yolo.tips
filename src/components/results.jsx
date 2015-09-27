import React, { Component, PropTypes } from 'react'
import { ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap'
import moment from 'moment'
import Icon from 'react-fa'
import search from '../services/search'

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
        <ListGroupItem>
          <a href={result.url} target='_blank'>
            <Row>
              <Col xs={10} md={10}>
                <b>{result.outbound.to.city}, {result.outbound.to.country} {moment(result.outbound.departureDate).fromNow()}</b>
                <p>
                  {moment(result.outbound.departureDate).format('dddd, MMMM')}
                  <br />
                  {result.outbound.from.airport}, {result.outbound.from.country} to {result.outbound.to.airport}, {result.outbound.to.country}
                </p>
                <p>
                  {moment(result.inbound.departureDate).format('dddd, MMMM')}
                  <br />
                  {result.inbound.from.airport}, {result.inbound.from.country} to {result.inbound.to.airport}, {result.inbound.to.country}
                </p>
              </Col>
              <Col xs={2} md={2}>
                {Math.round(result.price)} {result.currencyId}
              </Col>
            </Row>
          </a>
        </ListGroupItem>
     ))
    }

    return (
      <ListGroup>
        {results}
      </ListGroup>
    )
  }
}
