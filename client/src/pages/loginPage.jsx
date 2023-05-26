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
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function LoginPage() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  //state untuk login
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  //function input
  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
    console.log(tempUser);
  };
  //

  //function login
  const login = async () => {
    let token;

    if (!user.email || !user.password) {
      toast({
        title: "fill in all data.",
        status: "warning",
        position: "top",
        duration: 1000,
        isClosable: true,
      });
    } else {
      await axios
        .post("http://localhost:2000/users/v2", user)
        .then((res) => {
          localStorage.setItem("auth", JSON.stringify(res.data.token));
          // dispatch({
          //   type: "login",
          //   payload: res.data.value,
          // });
          // nav("/");
          token = res.data.token;
        })
        .catch((err) =>
          toast({
            title: "email/password salah",
            status: "error",
            position: "top",
            duration: 1000,
            isClosable: true,
          })
        );
      // console.log(token);

      await axios
        .get("http://localhost:2000/users/v3", {
          params: {
            token,
          },
        })
        .then((res) => {
          dispatch({
            type: "login",
            payload: res.data,
          });

          nav("/");
          console.log(res.data);
        });

      return;
    }
  };

  return (
    <Box w="100vw" h="100vh">
      <Center w="100%" h="100%" p={"10px"}>
        <Flex
          // bgGradient="linear(to-b, #21b3b8, white)"
          w="400px"
          flexDir={"column"}
          padding="20px"
          gap="10px"
          borderRadius={"10px"}
          border={"4px"}
        >
          <Box fontWeight={"bold"} fontSize={"20px"} fontFamily={"sans-serif"}>
            Login
          </Box>
          <Box>
            <Box fontWeight={"500"} paddingBottom={"10px"}>
              Email
            </Box>
            <Input
              id="email"
              onChange={inputHandler}
              fontSize={12}
              placeholder="Email..."
              variant={"filled"}
            ></Input>
          </Box>
          <Box>
            <Box fontWeight={"500"} paddingBottom={"10px"}>
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
                variant={"filled"}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
          {/* <Link to="/"> */}
          <Button
            marginTop={"25px"}
            bgColor="black"
            color={"white"}
            w="100%"
            onClick={login}
          >
            Sign In
          </Button>
          {/* </Link> */}

          <Link to="/register">
            <Center>don't have an account? register</Center>
          </Link>
        </Flex>
      </Center>
    </Box>
  );
}
