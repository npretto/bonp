import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { Leftmenu } from "../LeftMenu";
import { EReaderDevice } from "@bonp/core";

export const Layout: React.FC = ({ children }) => {
  return (
    <Flex direction="row" height="100%" border="1px solid black">
      <Leftmenu />
      <Box flex={1} overflow="scroll">
        {children}
      </Box>
    </Flex>
  );
};
