import {
  Box,
  Center,
  Flex,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function ForgetPasswordPage() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
    console.log(tempUser);
  };

  return (
    <Box w="100vw" h="100vh" bgGradient="linear(to-b, white, #21b3b8)">
      <Center w="100%" h="100%">
        <Flex
          bgGradient="linear(to-b, #21b3b8, white)"
          w="400px"
          flexDir={"column"}
          padding="20px"
          gap="10px"
          borderRadius={"10px"}
        >
          <Box
            fontWeight={"bold"}
            fontSize={"20px"}
            fontFamily={"sans-serif"}
            color={"white"}
          >
            forgot password
          </Box>
          <Box>
            <Box fontWeight={"500"} paddingBottom={"10px"} color={"white"}>
              Email
            </Box>
            <Input
              id="email"
              onChange={inputHandler}
              fontSize={12}
              placeholder="Email..."
              color={"white"}
              _placeholder={{ color: "inherit" }}
            ></Input>
          </Box>

          {/* <Link to="/"> */}
          <Button
            marginTop={"25px"}
            bgColor="#21b3b8"
            color={"white"}
            w="100%"
            _hover={{ color: "#21b3b8", bg: "white" }}
          >
            confirm
          </Button>
          {/* </Link> */}
        </Flex>
      </Center>
    </Box>
  );
}
