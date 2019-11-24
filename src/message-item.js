import React, { Component } from 'react';

export default class MessageItem extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  render () {
    const { data } = this.props;
    return (
      <li className={this.props.user? "message right appeared": "message left appeared"}>
        <div className="avatar">{data.userId}</div>
        <div className="text_wrapper">
            <div className="text">{data.message}</div>
        </div>
      </li>
    )
  }
}
