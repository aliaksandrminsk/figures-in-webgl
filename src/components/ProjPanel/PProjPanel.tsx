import classes from "./PProjPanel.module.css";
import React from "react";
import { useStore } from "../../store";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";

const PProjPanel = () => {
  const { settingStore: store } = useStore();

  const changeHandler = (
    target: "fovy_p" | "aspect_p" | "near_p" | "far_p",
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
          <label htmlFor="fovy">Fovy:</label>
          <input
            type="range"
            id="fovy"
            name="fovy"
            min="5"
            max="179"
            step="1"
            value={store.fovy_p}
            onChange={(e) => changeHandler("fovy_p", e)}
          />
          <output id="fovyOutput">{store.fovy_p}</output>
        </div>
        <div>
          <label htmlFor="aspect">Aspect:</label>
          <input
            type="range"
            id="aspect"
            name="aspect"
            min="1"
            max="5"
            step="0.5"
            value={store.aspect_p}
            onChange={(e) => changeHandler("aspect_p", e)}
          />
          <output id="aspectOutput">{store.aspect_p}</output>
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
            value={store.near_p}
            onChange={(e) => changeHandler("near_p", e)}
          />
          <output id="nearOutput">{store.near_p}</output>
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
            value={store.far_p}
            onChange={(e) => changeHandler("far_p", e)}
          />
          <output id="farOutput">{store.far_p}</output>
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

export default observer(PProjPanel);
