import classes from "./CameraPanel.module.css";
import React from "react";
import { useStore } from "../../store";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";

type typeX = "x_target" | "x_free";
type typeY = "y_target" | "y_free";
type typeZ = "z_target" | "z_free";

export type CameraPanelProps = {
  x: typeX;
  y: typeY;
  z: typeZ;
};

const CameraPanel = (props: CameraPanelProps) => {
  const { settingStore: store } = useStore();
  const x = store[props.x];
  const y = store[props.y];
  const z = store[props.z];

  const changeHandler = (
    target: typeX | typeY | typeZ,
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
          <label htmlFor="x">x:</label>
          <input
            type="range"
            id="x"
            name="x"
            min="-10"
            max="10"
            step="0.5"
            value={x}
            onChange={(e) => changeHandler(props.x, e)}
          />
          <output id="leftOutput">{x}</output>
        </div>
        <div>
          <label htmlFor="right">y:</label>
          <input
            type="range"
            id="y"
            name="y"
            min="-10"
            max="10"
            step="0.5"
            value={y}
            onChange={(e) => changeHandler(props.y, e)}
          />
          <output id="rightOutput">{y}</output>
        </div>
        <div>
          <label htmlFor="bottom">z:</label>
          <input
            type="range"
            id="z"
            name="z"
            min="-25"
            max="-5"
            step="0.5"
            value={z}
            onChange={(e) => changeHandler(props.z, e)}
          />
          <output id="bottomOutput">{z}</output>
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

export default observer(CameraPanel);
