import React from 'react';
import ReactDom from 'react-dom';
let width = screen.width
if ( width < 768){
  import('./style.css');
} else {
  import('./style2.css');
}
class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        style={{ visibility: this.props.style }}
        onClick={this.props.onClick}
      >
        {this.props.value}
      </button>
    );
  }
}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      whichSquareToShow: Array(9).fill('hidden'),
    };
    const start = Math.floor(Math.random() * 9);
    this.state.whichSquareToShow[start] = true;
  }
  handleRandom() {
    let ran = Math.floor(Math.random() * 9);
    let ran2 = Math.floor(Math.random() * 9);
    if (this.state.whichSquareToShow.some((e) => e === 'hidden')) {
      if (this.state.whichSquareToShow[ran] === true || this.state.squares[ran] || this.state.squares[ran2]) {
        this.handleRandom();
      } else {
        this.state.whichSquareToShow[ran] = true;
        this.state.whichSquareToShow[ran2] = true;
        return;
      }
    } else {
      return;
    }
  }
  handleRan() {
    for (let j = 0; j < this.state.whichSquareToShow.length; j++) {
      if (this.state.squares[j]) {
        continue;
      } else {
        if (this.state.whichSquareToShow[j] == true) {
          this.state.whichSquareToShow[j] = 'hidden';
        } else {
          continue;
        }
      }
    }
  }
  handleClick(i) {
    const winner = handleWinner(this.state.squares);
    if (winner || this.state.squares[i]) {
      return;
    }
    this.state.squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: this.state.squares,
      xIsNext: !this.state.xIsNext,
    });
    this.handleRan();
    this.handleRandom();
  }
  renderSquare(i) {
    return (
      <Square
        style={this.state.whichSquareToShow[i]}
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
  render() {
    const winner = handleWinner(this.state.squares);
    const status = winner
      ? 'Winner is ' + winner
      : this.state.xIsNext
      ? 'Next Player is X'
      : 'Next Player is O';
    return (
      <>
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
          <br/>
          <button onClick={() => {
            window.location.reload()
          }}>Click to reload</button>
        </div>
      </>
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
function handleWinner(props) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (props[a] === props[b] && props[b] === props[c]) {
      return props[a];
    }
  }
  return null;
}
ReactDom.render(<Game />, document.getElementById('root'));
