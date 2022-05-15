import { makeAutoObservable } from "mobx";

export enum ProjectionType {
  Perspective = "PERSPECTIVE",
  Frustum = "FRUSTUM",
  Orthographic = "ORTHOGRAPHIC",
}

export enum CameraType {
  Target = "TARGET",
  Free = "FREE",
}

export class SettingStore {
  near_p = 0;
  far_p = 0;
  fovy_p = 0;
  aspect_p = 0;

  left_f = 0;
  right_f = 0;
  bottom_f = 0;
  top_f = 0;
  near_f = 0;
  far_f = 0;

  left_o = 0;
  right_o = 0;
  bottom_o = 0;
  top_o = 0;
  near_o = 0;
  far_o = 0;

  x_target = 0;
  y_target = 0;
  z_target = 0;

  x_free = 0;
  y_free = 0;
  z_free = 0;

  projectionType = ProjectionType.Frustum;
  cameraType = CameraType.Target;

  constructor() {
    makeAutoObservable(this);
    this.reset();
  }

  reset(): void {
    this.near_p = 1;
    this.far_p = 20;
    this.fovy_p = 57;
    this.aspect_p = 1.5;

    this.left_f = -3.0;
    this.right_f = 3.0;
    this.bottom_f = -3.0;
    this.top_f = 3.0;
    this.near_f = 8;
    this.far_f = 20;

    this.left_o = -3.0;
    this.right_o = 3.0;
    this.bottom_o = -3.0;
    this.top_o = 3.0;
    this.near_o = 1;
    this.far_o = 20;

    this.x_target = 0;
    this.y_target = 6;
    this.z_target = -14;

    this.x_free = 0;
    this.y_free = 0;
    this.z_free = -11;
  }
}

export default SettingStore;
