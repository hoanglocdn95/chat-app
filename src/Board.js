import React from "react";
import styled from "styled-components";

import BreakWall  from './break_wall.jpg';
import Pikachu  from './pikachu.jpg';

export default class Board extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      dataBoard: props.dataBoard,
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.dataBoard!==this.props.dataBoard){
      this.setState({dataBoard: nextProps.dataBoard });
    }
  }

  detectObstacle = (position) => {
    const { dataBoard } = this.state;
    let tmp = [];
    dataBoard.map((rowData, y) => {
      rowData.map((item, x) => {
        if (item.object === 'break_wall' ) {
          tmp.push({x, y, object: 'break_wall'});
        }
      })
    })
    let error = [];

    for (let i = 0; i < tmp.length; i++) {
      if (position.x === tmp[i].x && position.y === tmp[i].y) {
        error.push(`collide:${tmp[i].x}_${tmp[i].y}`);
      }
    }
    return !!error.length;
  }

  moveObject = (object, direction) => {
    const { dataBoard } = this.state;
    let tmp = dataBoard;
    let position = {};
    dataBoard.map((rowData, y) => {
      rowData.map((item, x) => {
        if (item.object === object ) {
          return position = {x, y};
        }
      })
    })
    let isCollide = false;
    switch(direction) {
      case 'up':
        if (position.y === 0) return null;
        isCollide = this.detectObstacle({x: position.x, y: position.y - 1});

        if (isCollide) return null;
        tmp[position.y][position.x].object = null;
        tmp[position.y - 1][position.x].object = 'pikachu';
        break;
      case 'down':
        if (position.y === 8) return null;
        isCollide = this.detectObstacle({x: position.x, y: position.y + 1});

        if (isCollide) return null;
        tmp[position.y][position.x].object = null;
        tmp[position.y + 1][position.x].object = 'pikachu';
        break;
      case 'left':
        if (position.x === 0) return null;
        isCollide = this.detectObstacle({x: position.x - 1, y: position.y});

        if (isCollide) return null;
        tmp[position.y][position.x].object = null;
        tmp[position.y][position.x - 1].object = 'pikachu';
        break;
      case 'right':
        if (position.x === 8) return null;
        isCollide = this.detectObstacle({x: position.x + 1, y: position.y});

        if (isCollide) return null;
        tmp[position.y][position.x].object = null;
        tmp[position.y][position.x + 1].object = 'pikachu';
        break;
      default:
        break;
    }
    this.props.updateData({dataBoard: tmp});
  }

  renderRect() {
    const { dataBoard } = this.state;
    return dataBoard.map((rowData, y) => {
      return rowData.map((item, x) => {
        return (
          <RectangleContainer
            key={`${x}_${y}`}
            bgImage={
              item.object === 'pikachu'
                ? Pikachu 
                  : item.object === 'break_wall' 
                    ? BreakWall 
                      : null}
          />
        )
      })
    })

  }
  render() {
    return (
      <React.Fragment>
        <BoardContainer>
        {this.renderRect()}
        </BoardContainer>
        <button onClick={() => this.moveObject('pikachu', 'up')}>
          Up
        </button>
        <button onClick={() => this.moveObject('pikachu', 'down')}>
          Down
        </button>
        <button onClick={() => this.moveObject('pikachu', 'left')}>
          Left
        </button>
        <button onClick={() => this.moveObject('pikachu', 'right')}>
          Right
        </button>
      </React.Fragment>
    );
  }
}

const BoardContainer = styled.div`
  height: 468px;
  width: 468px;
  border: solid;
  display: flex;
  flex-wrap: wrap;
  background-color: white;
`;

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
