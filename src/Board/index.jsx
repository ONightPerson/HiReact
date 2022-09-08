import React from 'react';
import Square from '../Square';
import './index.css';

export default class Board extends React.Component {

  renderSquare(i) {
    const { highlightLines } = this.props;
    return <Square
      key={i}
      value={this.props.squares[i]}
      hightlight={highlightLines != null && highlightLines.indexOf(i) !== -1}
     />
  }

  render() {

    const squares = [0, 1, 2].map((row) => {
      return (
        <div className="board-row"
          key={row}>
          {
            [0, 1, 2].map((col) => {
              return this.renderSquare(row * 3 + col);
            })
          }
        </div>
      )
    });

    return (
      <div>
        {squares}
      </div>
    );
  }
}