import React from "react";
import { useStore } from "../store";
import { observer } from "mobx-react-lite";
import classes from "./Header.module.css";
import { ProjectionType } from "../store/SettingStore";
import { runInAction } from "mobx";

const Header = () => {
  const { settingStore: store } = useStore();

  const changeProjectionTypeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    runInAction(() => {
      store.projectionType = event.target.value as ProjectionType;
    });
  };

  const changeHandler = (
    target: "left" | "right" | "bottom" | "top" | "near" | "far",
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    runInAction(() => {
      store[target] = Number(event.target.value);
    });
  };

  const resetHandler = () => {
    runInAction(() => {
      store.reset();
    });
  };

  return (
    <>
      <div className={classes.title}>WebGL</div>
      <div className={classes.header}>
        <div className={classes.leftItem1}>
          <div>Projection Type</div>
          <div>
            <div>
              <div>
                <input
                  type="radio"
                  id="perspective"
                  name="filterRadio"
                  checked={store.projectionType === ProjectionType.Perspective}
                  value={ProjectionType.Perspective}
                  onChange={changeProjectionTypeHandler}
                />
                <label htmlFor="perspective">Perspective</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="filterRadio"
                  name="orthographic"
                  checked={store.projectionType === ProjectionType.Orthographic}
                  value={ProjectionType.Orthographic}
                  onChange={changeProjectionTypeHandler}
                />
                <label htmlFor="orthographic">Orthographic</label>
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
              <input
                type="range"
                id="left"
                name="left"
                min="-10"
                max="0"
                value={store.left}
                onChange={(e) => changeHandler("left", e)}
              />
              <output id="leftOutput">{store.left}</output>
            </div>
            <div>
              <label htmlFor="right">Right</label>
              <input
                type="range"
                id="right"
                name="right"
                min="0"
                max="10"
                value={store.right}
                onChange={(e) => changeHandler("right", e)}
              />
              <output id="rightOutput">{store.right}</output>
            </div>
            <div>
              <label htmlFor="bottom">Bottom</label>
              <input
                type="range"
                id="bottom"
                name="bottom"
                min="-10"
                max="0"
                value={store.bottom}
                onChange={(e) => changeHandler("bottom", e)}
              />
              <output id="bottomOutput">{store.bottom}</output>
            </div>
            <div>
              <label htmlFor="top">Top</label>
              <input
                type="range"
                id="top"
                name="top"
                min="0"
                max="10"
                value={store.top}
                onChange={(e) => changeHandler("top", e)}
              />
              <output id="topOutput">{store.top}</output>
            </div>
            <div>
              <label htmlFor="near">Near</label>
              <input
                type="range"
                id="near"
                name="near"
                min="2"
                max="10"
                value={store.near}
                onChange={(e) => changeHandler("near", e)}
              />
              <output id="nearOutput">{store.near}</output>
            </div>
            <div>
              <label htmlFor="far">Far</label>
              <input
                type="range"
                id="far"
                name="far"
                min="10"
                max="20"
                value={store.far}
                onChange={(e) => changeHandler("far", e)}
              />
              <output id="farOutput">{store.far}</output>
            </div>
            <div>
              <div />
              <input type="button" value="Reset" onClick={resetHandler} />
              <div />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(Header);
