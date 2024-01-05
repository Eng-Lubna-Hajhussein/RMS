import React from "react";
import "./Loader001.css";

/**
 * AnimationBox Component.
 *
 * @param {{
 *   status: 'loading' | 'loaded'
 * }} props The properties.
 */

export default function Loader001({ status }) {
  {
    /* loading className --> for database use */
  }
  {
    /* load-out className --> after loading */
  }
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
