import React from 'react';
import Board from '../Board';
import './index.css'

export default class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        coord: {
          row: null,
          col: null,
        },
      }],
      xIsNext: true,
      stepNumber: 0,
      ascending: true,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const row = parseInt(i / 3);
    const col = i % 3;
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares,
        coord: {
          row,
          col,
        }
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  handleSortClick = () => {
    this.setState({
      ascending: !this.state.ascending,
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2 === 0),
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    console.log('winner', winner);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move + '{' + step.coord.row + ',' + step.coord.col + '}' :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    });
    const sortMoves = this.state.ascending ? moves : moves.reverse();
    let status;
    if (winner) {
      status = 'Winner: ' + winner.role;
    } else {
      if (history.length === 10) {
        status = "It's tie!";
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            highlightLines={winner ? winner.line : null}
            onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button className="sort-btn" onClick={this.handleSortClick}>{this.state.ascending ? '升序' : '降序'}</button>
          <ol>{sortMoves}</ol>
        </div>
      </div>
    )
  }
}

function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        role: squares[a],
        line: [a, b, c],
      };
    }
  }
  return null;
}