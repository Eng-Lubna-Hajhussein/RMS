import React from "react";
import "./Loader001.css";

/**
 * @param {{
 *   status: 'loading' | 'loaded'
 * }} props
 */

export default function Loader001({ status }) {
  return (
    <React.Fragment>
      <div className={`loader ${status}`}>
        <div className="container">
          <div className="dot dot-1"></div>
          <div className="dot dot-2"></div>
          <div className="dot dot-3"></div>
        </div>
      </div>
    </React.Fragment>
  );
}
