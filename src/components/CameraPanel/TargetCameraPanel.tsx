import React from "react";
import { CameraPanelProps } from "./CameraPanel";
import CameraPanel from "./CameraPanel";

const TargetCameraPanel = (Component: React.FC<CameraPanelProps>) => () => {
  return <Component x="x_target" y="y_target" z="z_target" />;
};

export default TargetCameraPanel(CameraPanel);
