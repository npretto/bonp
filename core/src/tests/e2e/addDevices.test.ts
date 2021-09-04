import { addDevice, DeviceType, removeDevice } from "../../devices";
import { createStore } from "../../store";

const Kindle = {
  type: DeviceType.KINDLE,
  path: "/kindle/",
  filePath: "/kindle/Documents/My Clippings.txt",
};

const Kobo = {
  type: DeviceType.KOBO,
  path: "/kobo/",
  filePath: "kobo/.kobo/something.sqlite",
};

describe("devices", () => {
  const store = createStore();
  it("should start with an empty array", () => {
    expect(store.getState().devices?.list).toStrictEqual([]);
  });

  it("should add a device", () => {
    store.dispatch(
      addDevice({
        device: Kindle,
        devices: [Kindle],
      })
    );

    expect(store.getState().devices.list).toHaveLength(1);
  });

  it("should add another device", () => {
    store.dispatch(
      addDevice({
        device: Kobo,
        devices: [Kindle, Kobo],
      })
    );
    expect(store.getState().devices.list).toHaveLength(2);
  });

  it("should remove a device", () => {
    store.dispatch(
      removeDevice({
        device: Kobo,
        devices: [Kindle],
      })
    );
    expect(store.getState().devices.list).toHaveLength(1);
  });
});
