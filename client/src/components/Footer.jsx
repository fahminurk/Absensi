import { Box, Center } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome, AiOutlineLogout, AiOutlineFileText } from "react-icons/ai";

export default function Footer() {
  const nav = useNavigate();

  async function logout() {
    localStorage.removeItem("user");
    nav("/login");
  }

  return (
    <>
      <Center position={"fixed"} bottom={"0"} w="100%" zIndex={2}>
        <Center
          h="70px"
          w="400px"
          bgColor={"black"}
          justifyContent={"space-evenly"}
          padding={"10px"}
          color="white"
          fontWeight={"500"}
        >
          <Link to="/attendanceLog">
            <Box bg={"black"} borderRadius={5} p={1}>
              <AiOutlineFileText size={"30px"} color="white" />
            </Box>
          </Link>
          <Link to="/">
            <Box bg={"black"} borderRadius={5} p={1}>
              <AiFillHome size={"30px"} color="white" />
            </Box>
          </Link>

          <Box bg={"black"} borderRadius={5} p={1} onClick={logout}>
            <AiOutlineLogout size={"30px"} color="white" />
          </Box>
        </Center>
      </Center>
    </>
  );
}
