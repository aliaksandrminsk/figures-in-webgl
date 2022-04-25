import { makeAutoObservable } from "mobx";

export enum ProjectionType {
  Perspective = "PERSPECTIVE",
  Orthographic = "ORTHOGRAPHIC",
}

export class SettingStore {
  left = 0;
  right = 0;
  bottom = 0;
  top = 0;
  near = 0;
  far = 0;
  projectionType = ProjectionType.Perspective;

  constructor() {
    makeAutoObservable(this);
    this.reset();
  }

  reset() {
    this.left = -3.0;
    this.right = 3.0;
    this.bottom = -3.0;
    this.top = 3.0;
    this.near = 8.0;
    this.far = 14.0;
  }
}

export default SettingStore;
