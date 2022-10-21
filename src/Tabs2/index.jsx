import { useRef, useState, useEffect } from "react";
import "./index.css";

const navInfo = [
  {
    name: "产品说明",
    id: "introduce",
    content: "这是产品说明",
  },
  {
    name: "使用指南",
    id: "useFun",
    content: "巴拉巴拉这是使用指南",
  },
  {
    name: "售后服务",
    id: "service",
    content: "巴拉巴拉这是售后服务",
  },
  {
    name: "产品参数",
    id: "proCanshu",
    content: "巴拉巴拉这是产品参数",
  },
];

function NavDemo(props) {
  const nav_content = useRef(); //标识nav导航栏渲染内容
  const [navList, setNavList] = useState(navInfo); //这里使用自行构建的导航栏
  const [fixNav, setFixNav] = useState(false); //用户标识什么时候导航栏吸顶
  const [activeNav, setActiveNav] = useState(""); //与标识导航栏高亮

  useEffect(() => {
    //增加滚动条监听事件
    document.addEventListener("scroll", scrollEventListener);
    return () => {
      //组件注销时去除监听事件
      document.removeEventListener("scroll", scrollEventListener);
    };
  }, []);
  let scrollEventListener = () => {
    //获取导航栏显示内容区域信息
    let nav_contentReact = nav_content.current.getBoundingClientRect();
    //获取导航栏显示内容区域直接子元素
    let groupList = Array.from(nav_content.current.children);
    if (nav_contentReact) {
      groupList.map((item) => {
        let itemReact = item.getBoundingClientRect();
        if (itemReact.y <= 60 && itemReact.y + itemReact.height > 60) {
          //当该子元素距离顶部小于等于60时，说明此时导航栏应该高亮，
          //同时在其高度范围内均应高亮。
          setActiveNav(item.id + "_key");
        }
      });
      //我们设定导航栏的高度是60px，导航栏占位高度同样是60px
      if (nav_contentReact.y <= 60) {
        // 导航-吸顶
        setFixNav(true);
      } else if (nav_contentReact.y > 60) {
        setFixNav(false);
        //当脱离其显示范围时，导航栏无需高亮
        setActiveNav("");
      }
    }
  };

  //先定义两个变量
  /*上一次滚动条距顶部位置，此变量是为了防止底部高度不够时，
无法定位到最下方，结果导致程序无限循环的bug，
通过下面的代码应该可以明白此变量的意义*/
  let prevScrollTop = null;
  let isToTop = false; //点击锚点时滚动条是向上还是向下

  //导航栏点击事件
  function navClick(id) {
    let groupList = Array.from(nav_content.current.children);
    console.log('groupList,', groupList);
    let selectItem = null;
    //循环遍历，查找当前点击的是哪个导航，通过ID确定内容区域
    groupList.map((item) => {
      console.log('id,', id, 'item.id,', item.id);
      if (item.id === id) {
        selectItem = item;
      }
    });
    //获取所选导航指定内容区域位置信息
    let outerItemReact = selectItem.getBoundingClientRect();
    //判断导航内容是在可视区域上方还是下方，来决定滚动条是应该向上滚动还是向下滚动
    isToTop = outerItemReact.y > 60;
    //增加定时循环任务，控制速度逐渐变慢的效果来滚动滚动条。
    const createTimer = setInterval(() => {
      let itemReact = selectItem.getBoundingClientRect();
      const top = document.documentElement.scrollTop || document.body.scrollTop;
      //计算滚动速度及方向
      let ispeed =
        itemReact.y < 60
          ? -(Math.abs(itemReact.y) / 8)
          : Math.abs(itemReact.y) / 8;
      //防止速度出现过慢情况，则指定最小速度
      if (Math.abs(ispeed) < 60 / 8) {
        ispeed = ispeed > 0 ? 60 / 8 : -60 / 8;
      }
      if (
        (isToTop && itemReact.y < 60) ||
        (!isToTop && itemReact.y > 60) ||
        prevScrollTop === 60
      ) {
        clearInterval(createTimer);
        prevScrollTop = null;
        document.documentElement.scrollTop = document.body.scrollTop =
          top + (itemReact.y - 60);
      } else {
        prevScrollTop = top;
        document.documentElement.scrollTop = document.body.scrollTop =
          top + ispeed;
      }
    }, 30);
  }

  return (
    <div>
      <div className={"nav_list " + (fixNav ? "active" : "")}>
        <ul>
          {navList.map((item) => {
            return (
              <li key={item.id}>
                <a
                  className={activeNav == item.id ? "active" : ""}
                  onClick={() => navClick(item.id)}
                >
                  {item.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      {fixNav && <div className="zhanfIx" />}
      <div ref={nav_content}>
        {navList.map((item) => {
          {
            /*这里给ID加key字符串后缀是为了防止页面其他地方的ID重复*/
          }
          return (
            <div
              className="type_group"
              id={item.id}
              key={item.id + item.name}
            >
              <div className="type_title">{item.name}</div>
              <div>{item.content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NavDemo;
