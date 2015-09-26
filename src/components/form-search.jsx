import values from 'lodash.mapvalues'
import React, { Component, PropTypes } from 'react'
import { Input, Button, DropdownButton, MenuItem } from 'react-bootstrap'
import Select from 'react-select'
import uniq from 'lodash.uniq'
import currencies from '../consts/currencies'

import 'react-select/dist/default.css'

const airportCodes = require('airport-codes/airports.json')

const places = uniq(airportCodes.map(({ name, city, country, iata }) =>
  ({ label: `${name} Airport, ${city}, ${country}`, value: iata })), 'value')

console.log('places', places)

export default class FormSearch extends Component {
  static propTypes = {
    onSubmit: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this)
    this.handleOriginChange = this.handleOriginChange.bind(this)

    this.state = {
      currency: currencies[0]
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    const options = values(this.refs, (value) => (value.getValue && value.getValue()))
    options.currency = this.state.currency.value
    options.origin = this.state.origin
    this.props.onSubmit(options)
  }

  handleCurrencyChange (currency) {
    this.setState({ currency })
  }

  handleOriginChange (origin) {
    this.setState({ origin })
  }

  render () {
    const innerDropdown = (
      <DropdownButton title={this.state.currency.label}>
        {
          currencies.map((currency) => (
            <MenuItem key={currency.value}
              onSelect={() => this.handleCurrencyChange(currency)}>
              {currency.label}
            </MenuItem>
          ))
        }
      </DropdownButton>
    )

    return (
      <form onSubmit={this.handleSubmit}>
        <Select ref='origin' options={places} value={this.state.origin} onChange={this.handleOriginChange} label='I want to go from' searchable />
        <Input ref='weeks' min='1' max='10' label='in the next' type='number' defaultValue='2' addonAfter='weeks' />
        <Input ref='max' min='1' label='for a maximum of' type='number' defaultValue='100' buttonAfter={innerDropdown} />
        <Button type='submit' bsStyle='primary' bsSize='large' block>Search</Button>
      </form>
    )
  }
}
