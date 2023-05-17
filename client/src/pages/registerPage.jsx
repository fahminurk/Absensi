import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Textarea,
} from "@chakra-ui/react";

export default function RegisterPage() {
  const nav = useNavigate();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [user, setUser] = useState({
    name: "",
    address: "",
    email: "",
    password: "",
    company_id: 0,
  });

  useEffect(() => {}, [user]);

  function inputHandler(e) {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
    console.log(tempUser);
  }

  const register = async () => {
    try {
      if (
        !(
          user.name &&
          user.address &&
          user.email &&
          user.password &&
          user.company_id
        )
      ) {
        alert("isi semuanya");
      } else {
        const result = await axios.post("http://localhost:2000/users", user);
        alert(result.data.message);
        return nav("/login");
      }
    } catch (err) {
      console.log("isi semau boss");
    }
  };

  return (
    <Box w="100vw" h="100vh" bgGradient="linear(to-b, #303030, black)">
      <Center w="100%" h="100%">
        <Flex
          // bgColor={"white"}
          bgGradient="linear(to-b, black, #303030)"
          w="300px"
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
            Daftar Akun Baru
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
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>

          <Box>
            <Box fontWeight={"500"} paddingBottom={"10px"} color={"white"}>
              Name
            </Box>
            <Input
              id="name"
              onChange={inputHandler}
              fontSize={12}
              placeholder="Name..."
              color={"white"}
            ></Input>
          </Box>

          <Box>
            <Box fontWeight={"500"} paddingBottom={"10px"} color={"white"}>
              Company ID
            </Box>
            <Input
              id="company_id"
              onChange={inputHandler}
              fontSize={12}
              placeholder="Company ID..."
              color={"white"}
            ></Input>
          </Box>

          <Box>
            <Box fontWeight={"500"} paddingBottom={"10px"} color={"white"}>
              Address
            </Box>
            <Textarea
              id="address"
              onChange={inputHandler}
              fontSize={12}
              color={"white"}
            ></Textarea>
          </Box>

          <Button
            marginTop={"20px"}
            bg={"black"}
            color={"white"}
            onClick={register}
            _hover={{ color: "black", bg: "white" }}
          >
            Register
          </Button>

          <Link to="/login">
            <Center color={"white"} fontSize={12}>
              Have an account? Sign in
            </Center>
          </Link>
        </Flex>
      </Center>
    </Box>
  );
}
