import React, { Component } from "react";
import "./index.css";
export default class App extends Component {
  newPos = undefined;
  myReq = undefined;

  componentDidMount() {
    var nav = document.querySelector(".nav");
    var navTop = nav.offsetTop;
    console.log('navTop', navTop);

    var navList = document.getElementsByTagName("li");
    console.log('navList: ', navList);
    var list = document.getElementsByTagName("section");

    window.addEventListener("scroll", function () {
      // 导航栏吸顶
      var scrollTop = document.documentElement.scrollTop;
      console.log('scrollTop', scrollTop);
      if (scrollTop >= navTop) {
        if (nav.className.indexOf("fixed") === -1) {
          nav.className += " fixed";
        }
      } else {
        nav.className = "nav";
      }

    
      Array.from(list).forEach(function (item, index) {
        navList[index].className = "item";
        if (
          scrollTop >= item.offsetTop &&
          scrollTop < item.offsetTop + item.clientHeight
        ) {
          navList[index].className += " active";
        }
        if (scrollTop <= list[0].offsetTop) {
          navList[0].className += " active";
        }
      });
    });

    // 设置tab点击事件
    Array.from(navList).forEach( (item, index) => {
      console.log('注册点击事件 item', item + ', index: ' + index);
      item.addEventListener("click",  () => {
        console.log('点击了tabs ' + index);
        Array.from(navList).forEach(function (liItem) {
          liItem.className = "item";
        });
        item.className += " active";
        this.newPos = list[index].offsetTop;
        window.cancelAnimationFrame(this.myReq);
        this.move();
      });
    });
  }

  move = () => {
    if (Math.abs(document.documentElement.scrollTop - this.newPos) < 20) {
      document.documentElement.scrollTop = this.newPos;
      return;
    }
    if (document.documentElement.scrollTop > this.newPos) {
      document.documentElement.scrollTop -= 20;
    } else {
      document.documentElement.scrollTop += 20;
    }
    this.myReq = requestAnimationFrame(this.move);
  }

  render() {
    return (
      <>
        <ul className="nav">
          <li className="item active">1</li>
          <li className="item">2</li>
          <li className="item">3</li>
        </ul>
        <div className="container">
          <section>1</section>
          <section>2</section>
          <section>3</section>
        </div>
      </>
    );
  }
}
