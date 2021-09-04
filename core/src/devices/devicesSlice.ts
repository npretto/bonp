import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Device } from "./deviceType";

const initialState = {
  list: [],
};

const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    addDevice: (
      state,
      action: PayloadAction<{ device: Device; devices: Device[] }>
    ) => {
      state.list = action.payload.devices;
    },
    removeDevice: (
      state,
      action: PayloadAction<{ device: Device; devices: Device[] }>
    ) => {
      state.list = action.payload.devices;
    },
  },
});

const { reducer, actions } = devicesSlice;

export const devicesReducer = reducer;
export const { addDevice, removeDevice } = actions;
