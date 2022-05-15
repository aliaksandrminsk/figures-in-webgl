import React from "react";
import CameraPanel, { CameraPanelProps } from "./CameraPanel";

const FreeCameraPanel = (Component: React.FC<CameraPanelProps>) => () => {
  return <Component x="x_free" y="y_free" z="z_free" />;
};

export default FreeCameraPanel(CameraPanel);
