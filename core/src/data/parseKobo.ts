import { DeviceType } from "../devices";
import { Clip } from "./clip";

type KoboResult = {
  BookmarkID: string;
  DateCreated: string;
  Annotation: string;
  Text: string;
  BookTitle: string;
  Title: string;
  Attribution: string;
};

type KoboClipRaw = {
  device_type: DeviceType.KOBO;
  content: string;
  book: string;
  note?: string;
  device_created_at: Date;
  author: string;
  device_bookmark_id: string;
};

export const mapRawKoboToClips = ({
  BookmarkID,
  DateCreated,
  Annotation,
  Text,
  BookTitle,
  Title,
  Attribution,
}: KoboResult): KoboClipRaw => ({
  device_type: DeviceType.KOBO,
  content: Text?.trim(),
  book: Title?.trim(),
  note: Annotation?.trim(),
  device_created_at: new Date(DateCreated),
  device_bookmark_id: BookmarkID,
  author: Attribution?.trim(),
});

export const selectKoboCLipsQuery = `
  SELECT 
    Bookmark.BookmarkID,
    Bookmark.DateCreated,
    Bookmark.Annotation,
    Bookmark.Text,
    content.BookTitle, 
    content.Title, 
    content.Attribution 
    FROM Bookmark INNER JOIN content 
    ON Bookmark.VolumeID = content.ContentID 
    ORDER BY Bookmark.DateCreated;`;
