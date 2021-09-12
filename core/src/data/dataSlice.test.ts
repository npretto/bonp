import { createStore } from "../store";

import { addClips } from ".";
import { ClipToAdd } from "./clip";
import { selectBookIds, selectClipIds } from "./dataSlice";

const c1: ClipToAdd = {
  content: "Content of a clip 1",
  book: "First book in the kindle",
  type: "kindle",
  device_created_at: "2021-10-10 21:21:11",
  raw: "raw raw first content of a clip 1",
};

const c2: ClipToAdd = {
  content: "Content of a clip 2",
  book: "First book in the kindle",
  type: "kindle",
  device_created_at: "2021-10-10 21:21:11",
  raw: "raw raw first content of a clip 2",
};

const c3: ClipToAdd = {
  content: "Content of the third clip",
  book: "A book on the kobo",
  type: "kobo",
  device_created_at: "2021-10-10 21:21:11",
  k_annotation_id: "1q2w3e4r",
};

describe("clips slice", () => {
  it("should add clips", () => {
    const store = createStore();

    store.dispatch(addClips([c1]));

    expect(selectClipIds(store.getState())).toHaveLength(1);

    store.dispatch(addClips([c2]));

    expect(selectClipIds(store.getState())).toHaveLength(2);
  });

  it("should add multiple clips at once", () => {
    const store = createStore();

    store.dispatch(addClips([c1, c2, c3]));

    expect(selectClipIds(store.getState())).toHaveLength(3);
    expect(selectBookIds(store.getState())).toHaveLength(2);
  });

  it("should add clips only once", () => {
    const store = createStore();

    store.dispatch(addClips([c1]));

    store.dispatch(addClips([c1]));

    expect(selectClipIds(store.getState())).toHaveLength(1);
  });

  it("should add the book", () => {
    const store = createStore();

    store.dispatch(addClips([c1]));

    expect(selectBookIds(store.getState())).toHaveLength(1);
  });

  it("should add the book just once", () => {
    const store = createStore();

    store.dispatch(addClips([c1]));

    expect(selectBookIds(store.getState())).toHaveLength(1);

    store.dispatch(addClips([c2]));

    expect(selectBookIds(store.getState())).toHaveLength(1);
  });
});
