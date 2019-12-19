import React from "react";
import styled from "styled-components";

import BreakWall  from './break_wall.jpg';
import Pikachu  from './pikachu.jpg';

export default class Rectangle extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        data: this.props.data
      })
      return true;
    }
    return false;
  }

  selectObject = object => {
    if (object === 'pikachu') return Pikachu;
    if (object === 'break_wall') return BreakWall;
    return null
  }

  render() {
    const { data } = this.state;
    console.log('TCL: Rectangle -> render -> data', data);
    return (
      <RectangleContainer
        key={data.id}
        bgImage={this.selectObject(data.object)}
      />
    )
  }
}


const RectangleContainer = styled.div`
  height: 50px;
  width: 50px;
  border: 1px solid;
  display: flex;
  flex-wrap: wrap;
  background-image: url(${props => props.bgImage || null});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
