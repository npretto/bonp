import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
export const Hello = () => {
  return <div>Hello world from {`"electron/src/index.ts"`}</div>;
};

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        fuck
        <Route path="/" component={Hello} />
      </Switch>
    </BrowserRouter>
  );
};
