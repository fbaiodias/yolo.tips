import values from 'lodash.mapvalues'
import React, { Component, PropTypes } from 'react'
import { Input, Button, DropdownButton, MenuItem } from 'react-bootstrap'
import Select from 'react-select'
import currencies from '../consts/currencies'
import nearestAirport from '../services/nearest-airport'
import places from '../consts/airports'

import 'react-select/dist/default.css'

const MAX_OPTIONS = 20

const options = places.map(({ label, value }) => ({ label, value }))

console.log('options', options)

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

  componentWillMount () {
    nearestAirport().then((airport) => {
      this.setState({ origin: airport.iata })
      console.log('nearest airport is', airport)
    })
  }

  handleSubmit (e) {
    e && e.preventDefault()
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
        <Select ref='origin' options={options} value={this.state.origin} filterOptions={filterOptions} onChange={this.handleOriginChange} label='I want to go from' searchable />
        <Input ref='weeks' min='1' max='10' label='in the next' type='number' defaultValue='2' addonAfter='weeks' />
        <Input ref='max' min='1' label='for a maximum of' type='number' defaultValue='100' buttonAfter={innerDropdown} />
        <Button type='submit' bsStyle='primary' bsSize='large' block>Search</Button>
      </form>
    )
  }
}
