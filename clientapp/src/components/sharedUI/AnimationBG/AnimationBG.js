import React from "react";
import "./AnimationBG.css";

/**
 * @param {{
 *   type: 'squareTriangleCircleCross'|'triangle'|'circle'|'cross' | 'square'| 'none'
 * }} props
 */

const styles = {
  spanOne: {
    top: "66.59856996935649%",
    left: "13.020833333333334%",
    animationDelay: "-0.9s",
  },
  spanTwo: {
    top: "31.46067415730337%",
    left: "33.59375%",
    animationDelay: "-4.8s",
  },
  spanThree: {
    top: "76.50663942798774%",
    left: "38.020833333333336%",
    animationDelay: "-4s",
  },
  spanFour: {
    top: "21.450459652706844%",
    left: "14.0625%",
    animationDelay: "-2.8s",
  },
  spanFive: {
    top: "58.12053115423902%",
    left: "56.770833333333336%",
    animationDelay: "-2.15s",
  },
  spanSix: {
    top: "8.682328907048008%",
    left: "72.70833333333333%",
    animationDelay: "-1.9s",
  },
  spanSeven: {
    top: "31.3585291113381%",
    left: "58.541666666666664%",
    animationDelay: "-0.65s",
  },
  spanEight: {
    top: "69.96935648621042%",
    left: "81.45833333333333%",
    animationDelay: "-0.4s",
  },
  spanNine: {
    top: "15.117466802860061%",
    left: "32.34375%",
    animationDelay: "-4.1s",
  },
  spanTen: {
    top: "13.074565883554648%",
    left: "45.989583333333336%",
    animationDelay: "-3.65s",
  },
  spanEleven: {
    top: "55.87334014300306%",
    left: "27.135416666666668%",
    animationDelay: "-2.25s",
  },
  spanTwelve: {
    top: "49.54034729315628%",
    left: "53.75%",
    animationDelay: "-2s",
  },
  spanThirteen: {
    top: "34.62717058222676%",
    left: "49.635416666666664%",
    animationDelay: "-1.55s",
  },
  spanFourteen: {
    top: "33.19713993871297%",
    left: "86.14583333333333%",
    animationDelay: "-0.95s",
  },
  spanFifteen: {
    top: "28.19203268641471%",
    left: "25.208333333333332%",
    animationDelay: "-4.45s",
  },
  spanSixteen: {
    top: "39.7344228804903%",
    left: "10.833333333333334%",
    animationDelay: "-3.35s",
  },
  spanSeventeen: {
    top: "77.83452502553627%",
    left: "24.427083333333332%",
    animationDelay: "-2.3s",
  },
  spanEighteen: {
    top: "2.860061287027579%",
    left: "47.864583333333336%",
    animationDelay: "-1.75s",
  },
  spanNineteen: {
    top: "71.3993871297242%",
    left: "66.45833333333333%",
    animationDelay: "-1.25s",
  },
  spanTwenty: {
    top: "31.256384065372828%",
    left: "76.92708333333333%",
    animationDelay: "-0.65s",
  },
  spanTwentyOne: {
    top: "46.47599591419816%",
    left: "38.90625%",
    animationDelay: "-0.35s",
  },
  spanTwentyTwo: {
    top: "3.4729315628192032%",
    left: "19.635416666666668%",
    animationDelay: "-4.3s",
  },
  spanTwentyThree: {
    top: "3.575076608784474%",
    left: "6.25%",
    animationDelay: "-4.05s",
  },
  spanTwentyFour: {
    top: "77.3237997957099%",
    left: "4.583333333333333%",
    animationDelay: "-3.75s",
  },
  spanTwentyFive: {
    top: "0.9193054136874361%",
    left: "71.14583333333333%",
    animationDelay: "-3.3s",
  },
  spanTwentySix: {
    top: "23.6976506639428%",
    left: "63.28125%",
    animationDelay: "-2.1s",
  },
  spanTwentySeven: {
    top: "81.30745658835546%",
    left: "45.15625%",
    animationDelay: "-1.75s",
  },
  spanTwentyEight: {
    top: "60.9805924412666%",
    left: "42.239583333333336%",
    animationDelay: "-1.45s",
  },
  spanTwentyNine: {
    top: "29.009193054136876%",
    left: "70.90625%",
    animationDelay: "-1.05s",
  },
  spanThirty: {
    top: "52.093973442288046%",
    left: "30.90625%",
    animationDelay: "-0.7s",
  },
  spanThirtyOne: {
    top: "15.51174668028601%",
    left: "83.59375%",
    animationDelay: "-0.35s",
  },
  spanThirtyTwo: {
    top: "11.542390194075587%",
    left: "80.51041666666667%",
    animationDelay: "-0.1s",
  },
};

const generateTypeJSX = (children, type) => {
  return (
    <div className="backwrap gradient">
      <div className="back-shapes">
        {children}
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating square"
              : `floating ${type}`
          }
          style={styles.spanOne}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating triangle"
              : `floating ${type}`
          }
          style={styles.spanTwo}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating circle"
              : `floating ${type}`
          }
          style={styles.spanThree}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating cross"
              : `floating ${type}`
          }
          style={styles.spanFour}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating square"
              : `floating ${type}`
          }
          style={styles.spanFive}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating triangle"
              : `floating ${type}`
          }
          style={styles.spanSix}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating circle"
              : `floating ${type}`
          }
          style={styles.spanSeven}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating cross"
              : `floating ${type}`
          }
          style={styles.spanEight}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating square"
              : `floating ${type}`
          }
          style={styles.spanNine}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating triangle"
              : `floating ${type}`
          }
          style={styles.spanTen}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating circle"
              : `floating ${type}`
          }
          style={styles.spanEleven}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating cross"
              : `floating ${type}`
          }
          style={styles.spanTwelve}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating square"
              : `floating ${type}`
          }
          style={styles.spanThirteen}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating triangle"
              : `floating ${type}`
          }
          style={styles.spanFourteen}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating circle"
              : `floating ${type}`
          }
          style={styles.spanFifteen}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating cross"
              : `floating ${type}`
          }
          style={styles.spanSixteen}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating square"
              : `floating ${type}`
          }
          style={styles.spanSeventeen}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating triangle"
              : `floating ${type}`
          }
          style={styles.spanEighteen}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating circle"
              : `floating ${type}`
          }
          style={styles.spanNineteen}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating cross"
              : `floating ${type}`
          }
          style={styles.spanTwenty}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating square"
              : `floating ${type}`
          }
          style={styles.spanTwentyOne}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating triangle"
              : `floating ${type}`
          }
          style={styles.spanTwentyTwo}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating circle"
              : `floating ${type}`
          }
          style={styles.spanTwentyThree}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating cross"
              : `floating ${type}`
          }
          style={styles.spanTwentyFour}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating square"
              : `floating ${type}`
          }
          style={styles.spanTwentyFive}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating triangle"
              : `floating ${type}`
          }
          style={styles.spanTwentySix}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating circle"
              : `floating ${type}`
          }
          style={styles.spanTwentySeven}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating cross"
              : `floating ${type}`
          }
          style={styles.spanTwentyEight}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating square"
              : `floating ${type}`
          }
          style={styles.spanTwentyNine}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating triangle"
              : `floating ${type}`
          }
          style={styles.spanThirty}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating circle"
              : `floating ${type}`
          }
          style={styles.spanThirtyOne}
        />
        <span
          className={
            type === "squareTriangleCircleCross"
              ? "floating cross"
              : `floating ${type}`
          }
          style={styles.spanThirtyTwo}
        />
      </div>
    </div>
  );
};

const AnimationBG = ({ children, type }) => {
  return (
    <React.Fragment>
      {type !== "none" && generateTypeJSX(children, type)}
      {type === "none" && children}
    </React.Fragment>
  );
};

export default AnimationBG;
