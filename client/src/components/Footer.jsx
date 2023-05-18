import { Box, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineLogout, AiOutlineFileText } from "react-icons/ai";

export default function Footer() {
  return (
    <>
      <Center position={"fixed"} bottom={"0"} w="100%" zIndex={2}>
        <Center
          h="70px"
          w="400px"
          bgColor={"red"}
          justifyContent={"space-evenly"}
          padding={"10px"}
          color="white"
          fontWeight={"500"}
        >
          <Link to="/attendance-log">
            <Box bg={"white"} borderRadius={5} p={1}>
              <AiOutlineFileText size={"30px"} color="red" />
            </Box>
          </Link>
          <Link to="/">
            <Box bg={"white"} borderRadius={5} p={1}>
              <AiFillHome size={"30px"} color="red" />
            </Box>
          </Link>

          <Link to="/login">
            <Box bg={"white"} borderRadius={5} p={1}>
              <AiOutlineLogout size={"30px"} color="red" />
            </Box>
          </Link>
        </Center>
      </Center>
    </>
  );
}
