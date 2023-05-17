import { Box, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <Center position={"fixed"} bottom={"0"} w="100%" zIndex={2}>
        <Center
          h="70px"
          w="500px"
          bgColor={"red"}
          justifyContent={"space-between"}
          padding={"10px"}
          color="white"
          fontWeight={"500"}
        >
          <Link to="/">
            <Box>DASHBOARD</Box>
          </Link>
          <Link to="/attendance-log">
            <Box>ATTENDANCE LOG</Box>
          </Link>

          <Link to="/login">
            <Box>LOG OUT</Box>
          </Link>
        </Center>
      </Center>
    </>
  );
}
