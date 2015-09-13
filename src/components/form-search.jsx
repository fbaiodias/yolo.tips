import values from 'lodash.mapvalues'
import React, { Component, PropTypes } from 'react'
import { Input, Button } from 'react-bootstrap'

export default class FormSearch extends Component {
  static get propTypes () {
    return {
      onSubmit: PropTypes.func
    }
  }

  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    const options = values(this.refs, (value) => (value.getValue()))
    this.props.onSubmit(options)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input ref='origin' label='I want to go from' type='text' defaultValue='LOND' />
        <Input ref='destination' label='and visit' type='text' defaultValue='EVERYWHERE'/>
        <Input ref='weeks' min='1' max='10' label='in the next' type='number' defaultValue='5' addonAfter='weeks'/>
        <Button type='submit' bsStyle='primary' bsSize='large' block>Search</Button>
      </form>
    )
  }
}
