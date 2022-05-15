import React from "react";
import { useStore } from "../store";
import { observer } from "mobx-react-lite";
import classes from "./Header.module.css";
import { CameraType, ProjectionType } from "../store/SettingStore";
import { runInAction } from "mobx";
import FProjPanel from "./ProjPanel/FProjPanel";
import OProjPanel from "./ProjPanel/OProjPanel";
import PProjPanel from "./ProjPanel/PProjPanel";
import TargetCameraPanel from "./CameraPanel/TargetCameraPanel";
import FreeCameraPanel from "./CameraPanel/FreeCameraPanel";

const Header = () => {
  const { settingStore: store } = useStore();

  const changeProjectionTypeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    runInAction(() => {
      store.projectionType = event.target.value as ProjectionType;
    });
  };

  const changeCameraTypeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    runInAction(() => {
      store.cameraType = event.target.value as CameraType;
    });
  };

  return (
    <>
      <div className={classes.title}>WebGL</div>
      <div className={classes.header}>
        <div className={classes.cameraType}>
          <div>Camera Type: </div>
          <div>
            <div>
              <div>
                <input
                  type="radio"
                  id="target"
                  name="cameraRadio"
                  checked={store.cameraType === CameraType.Target}
                  value={CameraType.Target}
                  onChange={changeCameraTypeHandler}
                />
                <label htmlFor="target">Target</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="free"
                  name="cameraRadio"
                  checked={store.cameraType === CameraType.Free}
                  value={CameraType.Free}
                  onChange={changeCameraTypeHandler}
                />
                <label htmlFor="free">Free</label>
              </div>
            </div>
          </div>
        </div>
        {store.cameraType === CameraType.Free ? (
          <FreeCameraPanel />
        ) : (
          <TargetCameraPanel />
        )}

        <div className={classes.projectionType}>
          <div>Projection Type: </div>
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
                  id="frustum"
                  name="filterRadio"
                  checked={store.projectionType === ProjectionType.Frustum}
                  value={ProjectionType.Frustum}
                  onChange={changeProjectionTypeHandler}
                />
                <label htmlFor="frustum">Perspective (Frustum)</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="orthographic"
                  name="filterRadio"
                  checked={store.projectionType === ProjectionType.Orthographic}
                  value={ProjectionType.Orthographic}
                  onChange={changeProjectionTypeHandler}
                />
                <label htmlFor="orthographic">Orthographic</label>
              </div>
            </div>
          </div>
        </div>
        {store.projectionType === ProjectionType.Perspective ? (
          <PProjPanel />
        ) : store.projectionType === ProjectionType.Frustum ? (
          <FProjPanel />
        ) : (
          <OProjPanel />
        )}
      </div>
    </>
  );
};

export default observer(Header);
