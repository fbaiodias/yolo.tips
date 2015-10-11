import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

export default class Signup extends Component {
  render () {
    return (
      <Modal {...this.props}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>Subscribe to YOLO.tips!</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id='mc_embed_signup'>
            <form action='//artica.us6.list-manage.com/subscribe/post?u=c419153be90106f973dea5bfb&amp;id=be7343160d' method='post' id='mc-embedded-subscribe-form' name='mc-embedded-subscribe-form' className='validate' target='_blank' noValidate>
              <div id='mc_embed_signup_scroll'>
                <div className='indicates-required'><span className='asterisk'>*</span> indicates required</div>
                <div className='mc-field-group'>
                  <label htmlFor='mce-EMAIL'>Email Address <span className='asterisk'>*</span></label>
                  <input type='email' name='EMAIL' className='required email' id='mce-EMAIL' />
                </div>
                <div className='mc-field-group'>
                  <label htmlFor='mce-group[13725]'>Where are you departing from? </label>
                  <select name='group[13725]' className='REQ_CSS' id='mce-group[13725]'>
                    <option value=''></option>
                    <option value='1'>Asia</option>
                    <option value='2'>Africa</option>
                    <option value='4'>Australia</option>
                    <option value='8'>Europe</option>
                    <option value='16'>North America</option>
                    <option value='32'>South America</option>
                  </select>
                </div>
                <div id='mce-responses' className='clear'>
                  <div className='response' id='mce-error-response' style={{display: 'none'}}></div>
                  <div className='response' id='mce-success-response' style={{display: 'none'}}></div>
                </div>
                <div style={{position: 'absolute', left: '-5000px'}}>
                  <input type='text' name='b_c419153be90106f973dea5bfb_be7343160d' tabIndex='-1' value='' />
                </div>
                <div className='clear'>
                  <input type='submit' value='Subscribe' name='subscribe' id='mc-embedded-subscribe' className='button' />
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}
