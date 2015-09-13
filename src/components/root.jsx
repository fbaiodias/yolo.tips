import React, { Component } from 'react'
import Results from './results'
import FormSearch from './form-search'

export default class Root extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (options) {
    this.setState({
      options: options
    })
  }

  render () {
    let content = this.state.options
      ? (<Results options={this.state.options}/>) : void 0

    return (
      <div className='container'>
        <h1>yolo.tips</h1>
        <FormSearch onSubmit={this.handleSubmit}/>
        {content}
      </div>
    )
  }
}
