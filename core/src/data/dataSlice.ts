import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Clip, ClipToAdd } from "./clip";

import { compareAsc, parseISO } from "date-fns";
import { nanoid } from "nanoid";
import { Book } from "./book";
import { RootState } from "../store";
import { DeviceType } from "../devices";

const alreadyPresent = (clips: Clip[]) => (clip: ClipToAdd) => {
  return Boolean(
    clips.find((c) => {
      switch (clip.device_type) {
        case DeviceType.KINDLE:
          return c.device_type === DeviceType.KINDLE && c.raw === clip.raw;

        case DeviceType.KOBO:
          return (
            c.device_type === DeviceType.KOBO &&
            clip.k_annotation_id === c.k_annotation_id
          );
      }
    })
  );
};

const clipsAdapter = createEntityAdapter<Clip>({
  selectId: (clip) => clip.clipId,
  sortComparer: (a, b) =>
    compareAsc(parseISO(a.device_created_at), parseISO(b.device_created_at)),
});

const booksAdapter = createEntityAdapter<Book>({
  selectId: (book) => book.bookId,
});

const initialState = {
  books: booksAdapter.getInitialState(),
  clips: clipsAdapter.getInitialState(),
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addClips: (state, action: PayloadAction<ClipToAdd[]>) => {
      const allClips = clipsAdapter.getSelectors().selectAll(state.clips);

      const newClips = action.payload.filter(
        (c) => !alreadyPresent(allClips)(c)
      );

      for (const clip of newClips) {
        const allBooks = booksAdapter.getSelectors().selectAll(state.books);
        const clipId = nanoid();

        let book = allBooks.find((b) => b.title === clip.book);
        if (!book) {
          book = {
            title: clip.book,
            bookId: nanoid(),
            clips: [],
          };
          booksAdapter.addOne(state.books, book);
        }

        const clipToAdd = {
          ...clip,
          clipId,
          bookId: book.bookId,
        };

        clipsAdapter.addOne(state.clips, clipToAdd);

        booksAdapter.setOne(state.books, {
          ...book,
          clips: [...book.clips, clipId],
        });
      }
    },
  },
});

export const { addClips } = dataSlice.actions;
export const dataReducer = dataSlice.reducer;

export const { selectIds: selectClipIds, selectById: selectClipById } =
  clipsAdapter.getSelectors((s: RootState) => s.data.clips);

export const { selectIds: selectBookIds, selectById: selectBookById } =
  booksAdapter.getSelectors((s: RootState) => s.data.books);
