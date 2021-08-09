import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from "./Layout";
import { range } from "ramda";
import { EReaderDevice } from "@bonp/core";

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

type AppProps = {
  useDevices?: () => EReaderDevice[];
};

export const App: React.FC<AppProps> = ({ useDevices }) => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Switch>
          <Layout>
            <Route path="/" component={Hello} />
          </Layout>
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
};
