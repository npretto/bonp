import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Device } from "./deviceType";

const initialState = {
  list: [],
};

const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    addDevice: (state, action: PayloadAction<Device>) => {
      return state;
    },
    removeDevice: (state, action: PayloadAction<Device>) => {
      return state;
    },
  },
});

const { reducer, actions } = devicesSlice;

export const devicesReducer = reducer;
