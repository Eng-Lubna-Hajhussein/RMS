import React, { useRef } from "react";
import "./BtnProgressToTop.css";

export default function BtnProgressToTop() {
  const scrollProgress = useRef();
  const progressValue = useRef();
  let calcScrollValue = () => {
    let pos = document.documentElement.scrollTop;
    let calcHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    if (pos > 100) {
      if (scrollProgress?.current?.style) {
        scrollProgress.current.style.display = "grid";
      }
    } else {
      if (scrollProgress?.current?.style) {
        scrollProgress.current.style.display = "none";
      }
    }
    if (scrollProgress?.current) {
      scrollProgress.current.addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
      });
    }
    if (scrollProgress?.current?.style) {
      scrollProgress.current.style.background = `conic-gradient(rgb(243, 39, 76) ${scrollValue}%, rgb(215, 215, 215) ${scrollValue}%)`;
    }
  };
  window.onscroll = calcScrollValue;

  return (
    <React.Fragment>
      <div className="progress" ref={scrollProgress}>
        <span className="progress-value" ref={progressValue}>
          <i class="fa-solid fa-arrow-up" style={{ fontSize: "20px" }}></i>
        </span>
      </div>
    </React.Fragment>
  );
}
