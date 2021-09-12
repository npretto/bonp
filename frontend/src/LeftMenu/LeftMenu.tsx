import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { range } from "ramda";
import { useSelector } from "react-redux";
import { addClips, selectDevices } from "@bonp/core";
import { useAppContext } from "../App";
import { useAppDispatch } from "../store/useStoreHooks";

export const Leftmenu: React.FC = () => {
  const devices = useSelector(selectDevices);

  const { parseDevice } = useAppContext();
  const dispatch = useAppDispatch();

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
          {range(0, 100).map((i) => (
            <li key={i}>Book {i}</li>
          ))}
        </ul>
      </Box>
      {parseDevice && (
        <Box minHeight="150" borderTop="1px solid gray">
          <Heading size="lg">Devices</Heading>
          {devices.length
            ? devices.map((device, i) => (
                <li
                  key={i}
                  onClick={() => {
                    const clips = parseDevice(device);
                    dispatch(addClips(clips));
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
