import React from 'react';
import './index.css'

class ShoppingList extends React.Component {

  render() {
    return (
      <div className='shopping-list-layout'>
        <h1>Shopping list for {this.props.name} </h1>
        <ul>
          <li>Instagram</li>
          <li>Tiktok</li>
          <li>Wechat</li>
        </ul>
      </div>
    )
  }
}

export default ShoppingList;