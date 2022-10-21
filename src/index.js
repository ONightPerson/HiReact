// import React from 'react'
import ReactDom from 'react-dom'
import './index.css'
// import Game from './Game';
// import OffsetProperties from './OffsetProperties';
// import App from './App';
// import FilterableProductTable from './FilterableProductTable';
import Simple from './Hook'
import Tabs from './Tabs';
import Tabs2 from './Tabs2'
import RefDemo from './RefDemo';

// const PRODUCTS = [
//   {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
//   {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
//   {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
//   {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
//   {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
//   {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
// ];
 
// ReactDom.render(<FilterableProductTable products={PRODUCTS} />, document.getElementById('root'));
// ReactDom.render(<input value="hi" />, document.getElementById('root'));
ReactDom.render(<RefDemo />, document.getElementById('root'));