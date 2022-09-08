import React from 'react';
import './index.css'

function Square(props) {

  return (
    <div
      className="square"
      style={{ 'background': props.hightlight ? '#ff0000' : 'fff' }}
      onClick={props.onClick}
    >
      {props.value}
    </div>
  );


}

export default Square;