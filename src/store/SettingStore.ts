import { makeAutoObservable } from "mobx";

export enum ProjectionType {
  Perspective = "PERSPECTIVE",
  Frustum = "FRUSTUM",
  Orthographic = "ORTHOGRAPHIC",
}

export class SettingStore {
  near_p = 8.0;
  far_p = 14.0;
  fovy_p = 8.0;
  aspect_p = 0.5;

  left_f = -3.0;
  right_f = 3.0;
  bottom_f = -3.0;
  top_f = 3.0;
  near_f = 8.0;
  far_f = 0;

  left_o = -3.0;
  right_o = 3.0;
  bottom_o = -3.0;
  top_o = 3.0;
  near_o = 8.0;
  far_o = 14.0;

  projectionType = ProjectionType.Frustum;

  constructor() {
    makeAutoObservable(this);
    this.reset();
  }

  reset(): void {
    this.near_p = 8.0;
    this.far_p = 14.0;
    this.fovy_p = 57;
    this.aspect_p = 1.5;

    this.left_f = -3.0;
    this.right_f = 3.0;
    this.bottom_f = -3.0;
    this.top_f = 3.0;
    this.near_f = 8.0;
    this.far_f = 14.0;

    this.left_o = -3.0;
    this.right_o = 3.0;
    this.bottom_o = -3.0;
    this.top_o = 3.0;
    this.near_o = 8.0;
    this.far_o = 14.0;
  }
}

export default SettingStore;
