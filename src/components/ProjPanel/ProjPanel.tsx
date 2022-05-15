import classes from "./ProjPanel.module.css";
import React from "react";
import { useStore } from "../../store";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";

export type ProjPanelProps = {
  left: string;
  right: string;
  bottom: string;
  top: string;
  far: string;
  near: string;
};

const ProjPanel = (props: ProjPanelProps) => {
  const { settingStore: store } = useStore();
  const left = store[props.left];
  const right = store[props.right];
  const bottom = store[props.bottom];
  const top = store[props.top];
  const far = store[props.far];
  const near = store[props.near];

  const changeHandler = (
    target: string,
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
    <div className={classes.panel}>
      <div>
        <div>
          <label htmlFor="left">Left:</label>
          <input
            type="range"
            id="left"
            name="left"
            min="-10"
            max="0"
            step="0.5"
            value={left}
            onChange={(e) => changeHandler(props.left, e)}
          />
          <output id="leftOutput">{left}</output>
        </div>
        <div>
          <label htmlFor="right">Right:</label>
          <input
            type="range"
            id="right"
            name="right"
            min="0"
            max="10"
            step="0.5"
            value={right}
            onChange={(e) => changeHandler(props.right, e)}
          />
          <output id="rightOutput">{right}</output>
        </div>
        <div>
          <label htmlFor="bottom">Bottom:</label>
          <input
            type="range"
            id="bottom"
            name="bottom"
            min="-10"
            max="0"
            step="0.5"
            value={bottom}
            onChange={(e) => changeHandler(props.bottom, e)}
          />
          <output id="bottomOutput">{bottom}</output>
        </div>
        <div>
          <label htmlFor="top">Top:</label>
          <input
            type="range"
            id="top"
            name="top"
            min="0"
            max="10"
            step="0.5"
            value={top}
            onChange={(e) => changeHandler(props.top, e)}
          />
          <output id="topOutput">{top}</output>
        </div>
        <div>
          <label htmlFor="near">Near:</label>
          <input
            type="range"
            id="near"
            name="near"
            min="0"
            max="20"
            step="0.5"
            value={near}
            onChange={(e) => changeHandler(props.near, e)}
          />
          <output id="nearOutput">{near}</output>
        </div>
        <div>
          <label htmlFor="far">Far:</label>
          <input
            type="range"
            id="far"
            name="far"
            min="0"
            max="20"
            step="0.5"
            value={far}
            onChange={(e) => changeHandler(props.far, e)}
          />
          <output id="farOutput">{far}</output>
        </div>
        <div className={classes.reset}>
          <div />
          <input type="button" value="Reset" onClick={resetHandler} />
          <div />
        </div>
      </div>
    </div>
  );
};

export default observer(ProjPanel);
