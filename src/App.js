import React, { Component } from 'react';
import Board from './Board';
import io from 'socket.io-client';

const socket = io('localhost:6969');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBoard: [],
    }
  }

  componentWillMount() {
    socket.on('getData', res => this.setState({dataBoard: res.dataBoard})) 
  }

  componentDidUpdate() {
    socket.on('sendData', res=> this.setState({dataBoard: res.dataBoard})); 
  }

  updateData = (data) => {
    socket.emit("updateData", data);
  }
  
  render () {
    const { dataBoard } = this.state;
    return (
      <Board dataBoard={dataBoard} updateData={data => this.updateData(data)}/>
    )
  }
}
