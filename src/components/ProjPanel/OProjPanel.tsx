import React from "react";
import ProjPanel, { ProjPanelProps } from "./ProjPanel";

const OProjPanel = (Component: React.FC<ProjPanelProps>) => () => {
  return (
    <Component
      left="left_o"
      right="right_o"
      bottom="bottom_o"
      top="top_o"
      far="far_o"
      near="near_o"
    />
  );
};

export default OProjPanel(ProjPanel);
