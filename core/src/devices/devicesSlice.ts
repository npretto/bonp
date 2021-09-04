import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Device } from "./deviceType";

const initialState = {
  list: [] as Device[],
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

export const selectDevices = (s: RootState) => s.devices.list;
