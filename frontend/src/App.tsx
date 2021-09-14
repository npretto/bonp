import { Clip, Device, store } from "@bonp/core";
import { ChakraProvider } from "@chakra-ui/react";
import { range } from "ramda";
import React, { createContext, useContext } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AppContext, AppProps } from "./AppPropsAndContext";
import { BookPage } from "./BookPage";
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

export const App: React.FC<AppProps> = (props) => {
  return (
    <AppContext.Provider value={props}>
      <Provider store={store}>
        <ChakraProvider>
          <BrowserRouter>
            <Switch>
              <Layout>
                <Route path="/" exact component={Hello} />
                <Route path="/book/:bookId" component={BookPage} />
              </Layout>
            </Switch>
          </BrowserRouter>
        </ChakraProvider>
      </Provider>
    </AppContext.Provider>
  );
};
