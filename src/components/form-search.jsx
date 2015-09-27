import values from 'lodash.mapvalues'
import React, { Component, PropTypes } from 'react'
import { Input, Button, DropdownButton, MenuItem, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import Icon from 'react-fa'
import currencies from '../consts/currencies'
import nearestAirport from '../services/nearest-airport'
import places from '../consts/airports.js'

import 'react-select/dist/default.css'

const MAX_OPTIONS = 20

const options = places.map(({ label, value }) => ({ label, value }))

export default class FormSearch extends Component {
  static propTypes = {
    onSubmit: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this)
    this.handleOriginChange = this.handleOriginChange.bind(this)
    this.toggleDetails = this.toggleDetails.bind(this)

    this.state = {
      weeks: '1',
      max: '100',
      currency: 'EUR',
      showDetails: false
    }
  }

  componentWillMount () {
    nearestAirport().then((airport) => {
      this.setState({ origin: airport.iata })
      this.handleSubmit()
    })
  }

  getValue () {
    const value = values(this.refs, (value) => (value.getValue && value.getValue() || this.state[value]))
    value.currency = this.state.currency
    value.origin = this.state.origin
    return value
  }

  handleSubmit (e) {
    e && e.preventDefault()
    const value = this.getValue()
    this.setState({ ...value })
    this.props.onSubmit(value)
  }

  handleCurrencyChange (currency) {
    this.setState({ currency })
  }

  handleOriginChange (origin) {
    this.setState({ origin })
  }

  toggleDetails () {
    const { showDetails } = this.state
    const value = this.getValue()
    this.setState({ showDetails: !showDetails, ...value })
  }

  render () {
    const { weeks, max, currency } = this.state

    const selectedCurrency = currencies.filter((cur) => cur.value === currency)[0]

    const innerDropdown = (
      <DropdownButton title={selectedCurrency.label} id='currency'>
        {
          currencies.map((currency) => (
            <MenuItem key={currency.value}
              onSelect={() => this.handleCurrencyChange(currency.value)}>
              {currency.label}
            </MenuItem>
          ))
        }
      </DropdownButton>
    )

    const details = this.state.showDetails ? (
      <div>
        <Input ref='weeks' min='1' max='8' label='in the next' type='number' defaultValue={weeks} addonAfter='weekends' />
        <Input type='select' ref='max' label='for a maximum of' defaultValue={max} buttonAfter={innerDropdown}>
          <option value='50'>50</option>
          <option value='100'>100</option>
          <option value='150'>150</option>
          <option value='200'>200</option>
          <option value='300'>300</option>
          <option value='500'>500</option>
        </Input>
        <a onClick={this.toggleDetails}><Icon name='minus-square-o' /> hide details</a>
      </div>
    ) : (
      <a onClick={this.toggleDetails}><Icon name='pencil-square-o' /> ...in the next {weeks === '1' ? 'weekend' : `${weeks} weekends`}, for a maximum of {max}{selectedCurrency.shortLabel}</a>
    )

    const filterOptions = (opts, filterValue, exclude) => {
      const filterOption = (op) => {
        const valueTest = String(op.value).toLowerCase()
        const labelTest = String(op.label).toLowerCase()

        filterValue = filterValue.toLowerCase()

        return !filterValue || valueTest.indexOf(filterValue) >= 0 || labelTest.indexOf(filterValue) >= 0
      }

      return (opts || []).filter(filterOption).slice(0, MAX_OPTIONS)
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <Row className='main-inputs'>
          <Col xs={12} md={12}>
            <b>I want to fly from:</b>
          </Col>
          <Col xs={8} md={10}>
            <Select ref='origin' options={options} value={this.state.origin} filterOptions={filterOptions} onChange={this.handleOriginChange} label='I want to go from' searchable />
          </Col>
          <Col xs={4} md={2}>
            <Button type='submit' bsStyle='primary' title='Click to search' block>YOLO!</Button>
          </Col>
        </Row>
        <Row className='details-inputs'>
          <Col xs={12} md={12}>
            {details}
          </Col>
        </Row>
      </form>
    )
  }
}
