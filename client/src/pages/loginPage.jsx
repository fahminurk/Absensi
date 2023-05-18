import {
  Box,
  Center,
  Flex,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  useToast,
  Toast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { userLogin } from "../redux/userauth";
// import { useDispatch } from "react-redux";

export default function LoginPage() {
  const nav = useNavigate();
  // const dispatch = useDispatch();
  // const toast = useToast();
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

  const login = async () => {
    if (!user.email && !user.password) {
      alert("isi semua");
    } else {
      const result = await axios.post("http://localhost:2000/users/v1", user);
      console.log(result.data);
      // alert(result.data.message);
      if (!result.data.value) {
        alert("email atau password salah");
      } else {
        alert(result.data.message);
        nav("/");
      }
      return;
    }
  };

  // async function login() {
  //   const status = await dispatch(userLogin(user));
  //   alert(status);

  //   if (status) {
  //     toast({
  //       title: "Account Created.",
  //       status: "success",
  //       duration: 9000,
  //       isClosable: true,
  //     });
  //     return nav("/");
  //   }
  //   return toast({
  //     title: "Wrong Email/Password.",
  //     status: "error",
  //     duration: 9000,
  //     isClosable: true,
  //   });
  // }

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
            Login
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
          <Box>
            <Box fontWeight={"500"} paddingBottom={"10px"} color={"white"}>
              {" "}
              Password
            </Box>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                id="password"
                onChange={inputHandler}
                fontSize={12}
                placeholder="Password..."
                color={"white"}
                _placeholder={{ color: "inherit" }}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={handleClick}
                  color={"#21b3b8"}
                  _focus={{ color: "white", bg: "#21b3b8" }}
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
          {/* <Link to="/"> */}
          <Button
            marginTop={"25px"}
            bgColor="#21b3b8"
            color={"white"}
            w="100%"
            onClick={login}
            _hover={{ color: "#21b3b8", bg: "white" }}
          >
            Sign In
          </Button>
          {/* </Link> */}

          <Link to="/register">
            <Center color={"#21b3b8"}>don't have an account? register</Center>
          </Link>
        </Flex>
      </Center>
    </Box>
  );
}
