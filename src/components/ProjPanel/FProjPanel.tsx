import React from "react";
import ProjPanel, { ProjPanelProps } from "./ProjPanel";

const FProjPanel = (Component: React.FC<ProjPanelProps>) => () => {
  return (
    <Component
      left="left_f"
      right="right_f"
      bottom="bottom_f"
      top="top_f"
      far="far_f"
      near="near_f"
    />
  );
};

export default FProjPanel(ProjPanel);
