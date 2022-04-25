import { makeObservable, observable } from "mobx";

export enum ProjectionType {
  Perspective = "PERSPECTIVE",
  Orthographic = "ORTHOGRAPHIC",
}

export class SettingStore {
  left = -3.0;
  right = 3.0;
  bottom = -3.0;
  top = 3.0;
  near = 8.0;
  far = 14.0;
  projectionType = ProjectionType.Perspective;

  constructor() {
    makeObservable(this, {
      left: observable,
      right: observable,
      bottom: observable,
      top: observable,
      near: observable,
      far: observable,
      projectionType: observable,
    });
  }
}

export default SettingStore;
