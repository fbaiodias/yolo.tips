import values from 'lodash.mapvalues'
import React, { Component, PropTypes } from 'react'
import { Input, Button, DropdownButton, MenuItem } from 'react-bootstrap'
import currencies from '../consts/currencies'

export default class FormSearch extends Component {
  static get propTypes () {
    return {
      onSubmit: PropTypes.func
    }
  }

  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this)

    this.state = {
      currency: currencies[0]
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    const options = values(this.refs, (value) => (value.getValue()))
    options.currency = this.state.currency.value
    this.props.onSubmit(options)
  }

  handleCurrencyChange (currency) {
    this.setState({ currency })
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
        <Input ref='origin' label='I want to go from' type='text' defaultValue='LOND' />
        <Input ref='weeks' min='1' max='10' label='in the next' type='number' defaultValue='2' addonAfter='weeks'/>
        <Input ref='max' min='1' label='for a maximum of' type='number' defaultValue='100' buttonAfter={innerDropdown}/>
        <Button type='submit' bsStyle='primary' bsSize='large' block>Search</Button>
      </form>
    )
  }
}
