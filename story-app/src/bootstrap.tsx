import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import App from "./App";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  errorBoundary() {
    return <div>Error loading Story App</div>;
  }
});

export const { bootstrap, mount, unmount } = lifecycles;

// Standalone render
const el = document.getElementById("app");
if (el) ReactDOM.render(<App />, el);
