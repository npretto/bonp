export enum ClipType {
  HIGHLIGHT = "HIGHLIGHT",
  NOTE = "NOTE",
}

type CommonParts = {
  clipId: string;
  bookId: string;
  // iso string
  device_created_at: string;
  content?: string;
  annotation?: string;
};

type KindleSpecific = {
  type: "kindle";
  raw: string;
};

type KoboSpecific = {
  type: "kobo";
  k_annotation_id: string;
};

export type Clip = CommonParts & (KindleSpecific | KoboSpecific);

export type ClipToAdd = Omit<CommonParts, "clipId" | "bookId"> &
  (KindleSpecific | KoboSpecific) & { book: string };
