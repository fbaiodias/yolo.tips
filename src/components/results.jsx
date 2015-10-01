import React, { Component, PropTypes } from 'react'
import { Row, Col, Alert } from 'react-bootstrap'
import Icon from 'react-fa'
import Item from './result-item'
import get from 'lodash.get'
import group from 'lodash.groupby'
import unique from 'lodash.uniq'
import search from '../services/search'
import currencies from '../consts/currencies'

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
      const grouped = group(results, (result) => get(result, 'outbound.to.airportCode'))
      const order = unique(results.map((result) => get(result, 'outbound.to.airportCode')))
      const content = order.map((key) => (
        <Item results={ grouped[key] }/>
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
