import React, { Component } from 'react'
import Results from './results'
import FormSearch from './form-search'
import yoloImage from '../../static/yolo.gif'

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
      <div>
        <div className='header'>
          <img src={yoloImage}/>
          <span>.tips</span>
          <small>beta</small>
        </div>
        <div className='container'>
          <FormSearch onSubmit={this.handleSubmit}/>
          {content}
        </div>
      </div>
    )
  }
}
