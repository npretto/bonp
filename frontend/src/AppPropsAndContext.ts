import { Clip, Device } from "@bonp/core";
import { createContext, useContext } from "react";

export type AppProps = {
  parseDevice?: (d: Device) => Promise<Clip[]>;
};

export const AppContext = createContext<AppProps>({});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw Error("Missing app context!");
  }
  return context;
};
