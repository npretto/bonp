import { createStore } from "../../store";

describe("devices", () => {
  const store = createStore();
  it("should start with an empty array", () => {
    expect(store.getState().devices?.list).toStrictEqual([]);
  });
});
