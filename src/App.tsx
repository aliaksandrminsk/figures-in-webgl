import React from "react";
import classes from "./App.module.css";
import Canvas from "./components/Canvas";
import Header from "./components/Header";

function App() {
  return (
    <div className={classes.app}>
      <div className={classes.content}>
        <Header />
        <Canvas />
      </div>
    </div>
  );
}

export default App;
