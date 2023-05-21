import { Box, Center } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome, AiOutlineLogout, AiOutlineFileText } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { auth_types } from "../redux/types";

export default function Footer() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  function logout() {
    dispatch({ type: auth_types.logout });
    localStorage.removeItem("user");
    nav("/login");
  }

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
          <Link to="/attendanceLog">
            <Box bg={"white"} borderRadius={5} p={1}>
              <AiOutlineFileText size={"30px"} color="red" />
            </Box>
          </Link>
          <Link to="/">
            <Box bg={"white"} borderRadius={5} p={1}>
              <AiFillHome size={"30px"} color="red" />
            </Box>
          </Link>

          <Box bg={"white"} borderRadius={5} p={1} onClick={logout}>
            <AiOutlineLogout size={"30px"} color="red" />
          </Box>
        </Center>
      </Center>
    </>
  );
}
