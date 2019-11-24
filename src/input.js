import React, { Component }  from 'react';

export default class Input extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
  }

  enterKey = e => {
    if (e.keyCode === 13) {
      this.props.sendMessage(this.refs.message);
      this.setState({
        value: ''
      })
    }
  }
  handleOnChange = e => {
    this.setState({
      value: e.target.value
    })
  }
  render () {
    return (
      <div className="bottom_wrapper clearfix">
        <div className="message_input_wrapper">
          <input
            ref="message" 
            className="message_input"
            placeholder="Type your message here..."
            onKeyDown={(e) => this.enterKey(e)}
            value={this.state.value}
            onChange={(e) => this.handleOnChange(e)}
          />
        </div>
        <div
          className="send_message"
          onClick={() => this.props.sendMessage(this.refs.message)}
        >
          <div className="icon"></div>
          <div className="text">Send</div>
        </div>
      </div>
    )
  }
}