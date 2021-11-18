import { RootState, selectBookById, selectClipById } from "@bonp/core";
import React from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router";

export const BookPage = () => {
  const { bookId } = useRouteMatch<{ bookId: string }>().params;
  const book = useSelector((s: RootState) => selectBookById(s, bookId));

  console.log("clips", book?.clips);
  return (
    <div>
      <h1 style={{ fontSize: "2em", fontWeight: "bold" }}>{book?.title}</h1>
      {book?.clips.map((id) => (
        <ClipView clipId={id} />
      ))}
    </div>
  );
};

const ClipView: React.FC<{ clipId: string }> = ({ clipId }) => {
  const clip = useSelector((s: RootState) => selectClipById(s, clipId));

  console.log("clip", clip);
  return <div style={{ padding: 10 }}>{clip.content}</div>;
};
