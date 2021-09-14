import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { range } from "ramda";
import { useSelector } from "react-redux";
import {
  addClips,
  EntityId,
  RootState,
  selectBookById,
  selectBookIds,
  selectDevices,
} from "@bonp/core";

import { useAppDispatch } from "../store/useStoreHooks";
import { useAppContext } from "../AppPropsAndContext";
import { Link } from "react-router-dom";

export const Leftmenu: React.FC = () => {
  const devices = useSelector(selectDevices);

  const { parseDevice } = useAppContext();
  const dispatch = useAppDispatch();

  const bookIds = useSelector(selectBookIds);

  return (
    <Flex
      direction="column"
      width={200}
      borderRight="2px solid gray"
      height="100%"
    >
      <Box borderBottom="2px solid gray">
        <Link to="/">
          <Heading size="2xl">BONP!</Heading>
        </Link>
      </Box>
      <Heading size="lg">Books</Heading>
      <Box overflow="scroll" flex={1}>
        <ul>
          {bookIds.length ? (
            bookIds.map((id) => <BookListItem bookId={id} key={id} />)
          ) : (
            <p>no books yet, add from device</p>
          )}
        </ul>
      </Box>
      {parseDevice && (
        <Box minHeight="150" borderTop="1px solid gray">
          <Heading size="lg">Devices</Heading>
          {devices.length
            ? devices.map((device, i) => (
                <li
                  key={i}
                  onClick={async () => {
                    const clips = await parseDevice(device);
                    dispatch(addClips(clips as any));
                  }}
                >
                  Device ({device.type})
                </li>
              ))
            : "No devices connected"}
        </Box>
      )}
      <Box></Box>
    </Flex>
  );
};

const BookListItem: React.FC<{ bookId: EntityId }> = ({ bookId }) => {
  const book = useSelector((s: RootState) => selectBookById(s, bookId));
  return (
    <li style={{ borderBottom: "1px solid gray" }}>
      <Link to={`/book/${book.bookId}`}>{book.title}</Link>
    </li>
  );
};
