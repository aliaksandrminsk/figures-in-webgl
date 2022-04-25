import React from "react";
import { useStore } from "../store";
import { observer } from "mobx-react-lite";
import classes from "./Header.module.css";

const Header = () => {
  const { settingStore: store } = useStore();
  return (
    <>
      <div className={classes.title}>Figures in WebGL</div>
      <div className={classes.header}>
        <div className={classes.leftItem1}>
          <div>Projection Type</div>
          <div>
            <div>
              <div>
                <input
                  type="radio"
                  id="huey"
                  name="drone"
                  value="huey"
                  checked
                />
                <label htmlFor="huey">Perspective</label>
              </div>

              <div>
                <input type="radio" id="dewey" name="drone" value="dewey" />
                <label htmlFor="dewey">Orthographic</label>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.leftItem2}>
          <div>Empty now</div>
        </div>
        <div className={classes.rightItem}>
          <div>
            <div>
              <label htmlFor="left">Left</label>
              <input type="range" id="left" name="left" min="0" max="11" />
              <output id="leftOutput">5</output>
            </div>
            <div>
              <label htmlFor="right">Right</label>
              <input type="range" id="right" name="right" min="0" max="11" />
              <output id="rightOutput">5</output>
            </div>
            <div>
              <label htmlFor="bottom">Bottom</label>
              <input type="range" id="bottom" name="bottom" min="0" max="11" />
              <output id="bottomOutput">5</output>
            </div>
            <div>
              <label htmlFor="top">Top</label>
              <input type="range" id="top" name="top" min="0" max="11" />
              <output id="topOutput">5</output>
            </div>
            <div>
              <label htmlFor="near">Near</label>
              <input type="range" id="near" name="near" min="0" max="11" />
              <output id="nearOutput">5</output>
            </div>
            <div>
              <label htmlFor="far">Far</label>
              <input type="range" id="far" name="far" min="0" max="11" />
              <output id="farOutput">5</output>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(Header);
