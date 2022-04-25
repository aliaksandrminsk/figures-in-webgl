import React from "react";
import classes from "./App.module.css";
import Canvas from "./components/Canvas";

function App() {
  return (
    <div className={classes.app}>
      <div className={classes.content}>
        <Canvas />
      </div>
    </div>
  );
}

export default App;
