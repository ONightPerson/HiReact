import React, { Component } from 'react'
import style from './index.module.css'
export default class App extends Component {

  state = { width: 0, left: 0}

  enter = (event) => {
    const {clientWidth, offsetLeft } = event.target;
    console.log('clientWidth', clientWidth);
    this.setState({ 
      width: 30,
      left: (clientWidth - 30) / 2 + offsetLeft,
    })
  }

  leave = () => {
    this.setState(() =>({ width: 0 }) )
  }
  render () {
    const { width, left } = this.state;
    console.log('style:', style);
    return (
      <>
        <div className={ style.header }>
          <ul ref="ul" onMouseLeave={ this.leave } >
            <li onMouseEnter={ this.enter }>首页</li>
            <li onMouseEnter={ this.enter }>导航一</li>
            <li onMouseEnter={ this.enter }>导航二</li>
            <li onMouseEnter={ this.enter }>导航三</li>
            <li onMouseEnter={ this.enter }>导航四</li>
          </ul>
          <div className={style.line} style={{width: width, top: '60px',left: left, height: '10px'}}></div>
        </div>
      </>
    )
  }
}