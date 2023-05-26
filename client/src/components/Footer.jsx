import { Box, Center } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome, AiOutlineLogout, AiOutlineFileText } from "react-icons/ai";

export default function Footer() {
  const nav = useNavigate();

  async function logout() {
    localStorage.removeItem("auth");
    nav("/login");
  }

  return (
    <>
      <Center position={"fixed"} bottom={"0"} w="100%" zIndex={2}>
        <Center
          h="70px"
          w="400px"
          bgGradient="linear(to-b, transparent 70%,black 30%)"
          justifyContent={"space-evenly"}
          padding={"10px"}
          color="white"
          fontWeight={"500"}
        >
          <Link to="/attendanceLog">
            <Box borderRadius={5} p={1}>
              <AiOutlineFileText size={"40px"} color="black" />
            </Box>
          </Link>
          <Link to="/">
            <Box borderRadius={5} p={1}>
              <AiFillHome size={"40px"} color="black" />
            </Box>
          </Link>

          <Box borderRadius={5} p={1} onClick={logout}>
            <AiOutlineLogout size={"40px"} color="black" />
          </Box>
        </Center>
      </Center>
    </>
  );
}
