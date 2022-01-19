import React from 'react';
import ReactDom from 'react-dom';
import './style.css';
class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {this.state.value}
      </button>
    );
  }
}
class Board extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      squares : Array(9).fill(null),
      xIsNext : true,
    }
  }
  renderSquare(i) {
    return <Square />;
  }
  render() {
    const status = 'Next Player is X';
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {' '}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board"></div>
        <Board />
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/**/}</ol>
        </div>
      </div>
    );
  }
}
ReactDom.render(<Game />, document.getElementById('root'));
