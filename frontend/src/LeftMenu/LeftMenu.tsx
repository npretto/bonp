import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { range } from "ramda";
import { EReaderDevice } from "@bonp/core";

type LeftMenuPRops = {
  useDevices?: () => EReaderDevice[];
};

export const Leftmenu: React.FC<LeftMenuPRops> = ({ useDevices }) => {
  const devices = useDevices();
  return (
    <Flex
      direction="column"
      width={200}
      borderRight="2px solid gray"
      height="100%"
    >
      <Box borderBottom="2px solid gray">
        <Heading size="2xl">BONP</Heading>
      </Box>
      <Heading size="lg">Books</Heading>
      <Box overflow="scroll" flex={1}>
        <ul>
          {range(0, 50).map((i) => (
            <li key={i}>Book {i}</li>
          ))}
        </ul>
      </Box>
      <Box></Box>
    </Flex>
  );
};
