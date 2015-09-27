import React, { Component } from 'react'
import Icon from 'react-fa'
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
          <div className='container'>
            <img src={yoloImage} width='500' height='199' />
            <span>
              .tips
            </span>
            <small>beta</small>

            <div className='side'>
              <a href='https://github.com/xicombd/yolo.tips' target='_blank'>
                <Icon name='github' />
              </a>
              <a href='https://twitter.com/getyolotips' target='_blank'>
                <Icon name='twitter' />
              </a>
            </div>
          </div>
        </div>
        <div className='container'>
          <FormSearch onSubmit={this.handleSubmit}/>
          {content}
        </div>
      </div>
    )
  }
}
