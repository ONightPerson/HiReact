import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";

const RefDemo = () => {
  const domRef = useRef(1);
  console.log("ref:deom-init", domRef, domRef.current);
  const childRef = useRef(null);
  useEffect(() => {
    console.log("ref:deom-init", domRef, domRef.current);
    console.log("ref:child-init", childRef, childRef.current);
  });

  useEffect(() => {
    let start, previousTimeStamp;
    let done = false;
    function step(timestamp) {
      // console.log('timestamp', timestamp);
      if (start === undefined) {
        start = timestamp;
      }
      const elapsed = timestamp - start;
      console.log('elapsed', elapsed);

      if (previousTimeStamp !== timestamp) {
        // 这里使用 `Math.min()` 确保元素刚好停在 200px 的位置。
        const count = Math.min(0.1 * elapsed, 200);
        domRef.current.style.transform = "translateX(" + count + "px)";
        if (count === 200) done = true;
      }

      if (elapsed < 2000) {
        // 在两秒后停止动画
        previousTimeStamp = timestamp;
        if (!done) {
          window.requestAnimationFrame(step);
        }
      }
    }
    window.requestAnimationFrame(step);

    const test = (fn) => {
      console.log('fn', fn);
    }

    test(() => () => {console.log('fff')});

  });

  const showChild = () => {
    console.log("ref:child", childRef, childRef.current);
    childRef.current.say();
  };
  return (
    <div style={{ margin: "100px", border: "2px dashed", padding: "20px" }}>
      <h2>这是外层组件</h2>
      <div
        onClick={() => {
          console.log("ref:deom", domRef, domRef.current);
          domRef.current.focus();
          domRef.current.value = "hh";
        }}
      >
        <label>这是一个dom节点</label>
        <input ref={domRef} />
      </div>
      <br />
      <p onClick={showChild} style={{ marginTop: "20px" }}>
        这是子组件
      </p>
      <div style={{ border: "1px solid", padding: "10px" }}>
        <div ref={childRef} />
      </div>
    </div>
  );
};
export default RefDemo;
