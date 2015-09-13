import React, { Component } from 'react'
import Results from './results'

export default class Root extends Component {
  render () {
    const options = {
      origin: 'LOND'
    }

    return (
      <div className='container'>
        <h1>yolo.tips</h1>

        <Results options={options} />
      </div>
    )
  }
}
