import React, { Component } from 'react';

export default class messageItem extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <li className={this.props.user? "message right appeared": "message left appeared"}>
        <div className="avatar"></div>
        <div className="text_wrapper">
            <div className="text">{this.props.message}</div>
        </div>
      </li>
    )
  }
}
