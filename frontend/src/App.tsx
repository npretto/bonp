import { store } from "@bonp/core";
import { ChakraProvider } from "@chakra-ui/react";
import { range } from "ramda";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout } from "./Layout";

export const Hello = () => {
  return (
    <div>
      <div>Hello world from {`"electron/src/index.ts"`}</div>
      {range(0)(100).map((i) => (
        <h1 key={i}>line {i}</h1>
      ))}
    </div>
  );
};

type AppProps = {};

export const App: React.FC<AppProps> = () => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <BrowserRouter>
          <Switch>
            <Layout>
              <Route path="/" component={Hello} />
            </Layout>
          </Switch>
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  );
};
