import React, {useEffect, useRef} from "react";
import classes from "./Canvas.module.css";
import {CanvasApp} from "../webgl/CanvasApp";

const Canvas = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
      const app = new CanvasApp();
      if (ref.current) {
          ref.current.appendChild(app.view);
          app.start();
      }
      return () => {
         app.destroy();
      };
  });
  return (<div ref={ref} className={classes.canvas} />);
};

export default Canvas;
