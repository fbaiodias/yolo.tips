import React, { Component, PropTypes } from 'react'
import { ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap'
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

  search (options) {
    search(options)
      .then((results) => this.setState({ results }))
      .catch((error) => this.setState({ error }))
  }

  render () {
    const results = this.state.results ? this.state.results.map((result) => (
      <ListGroupItem>
        <a href={result.url}>
          <Row>
            <Col xs={10} md={10}>
              <b>{result.outbound.to.city}, {result.outbound.to.country}</b>
              <p>{result.outbound.from.airport}, {result.outbound.from.country} to {result.outbound.to.airport}, {result.outbound.to.country} - {result.outbound.departureDate}</p>
              <p>{result.inbound.from.airport}, {result.inbound.from.country} to {result.inbound.to.airport}, {result.inbound.to.country} - {result.inbound.departureDate}</p>
            </Col>
            <Col xs={2} md={2}>
              {result.price} {result.currencyId}
            </Col>
          </Row>
        </a>
      </ListGroupItem>
    )) : (
      <h3>loading...</h3>
    )

    return (
      <ListGroup>
        {results}
      </ListGroup>
    )
  }
}
