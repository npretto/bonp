import { DeviceType } from "../devices";

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
  device_type: DeviceType.KINDLE;
  raw: string;
};

type KoboSpecific = {
  device_type: DeviceType.KOBO;
  k_annotation_id: string;
};

export type Clip = CommonParts & (KindleSpecific | KoboSpecific);

export type ClipToAdd = Omit<CommonParts, "clipId" | "bookId"> &
  (KindleSpecific | KoboSpecific) & { book: string };
