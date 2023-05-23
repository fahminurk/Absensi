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
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { MdArrowDropDown } from "react-icons/md";

export default function RegisterPage() {
  const nav = useNavigate();
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  //
  const [user, setUser] = useState({
    name: "",
    address: "",
    email: "",
    password: "",
    CompanyId: 0,
  });
  const [companies, setCompanies] = useState([]);

  //fungsi input
  function inputHandler(e) {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
    console.log(tempUser);
  }

  //get daftar company
  useEffect(() => {
    async function getCompany() {
      const res = await axios.get("http://192.168.203.43:2000/users/companies");
      console.log(res.data);
      setCompanies(res.data);
    }
    getCompany();
  }, []);

  const register = async () => {
    if (
      !(
        user.name &&
        user.address &&
        user.email &&
        user.password &&
        user.CompanyId
      )
    ) {
      toast({
        title: "fill in all data.",
        status: "warning",
        position: "top",
        duration: 1000,
        isClosable: true,
      });
    } else {
      const result = await axios.post("http://192.168.203.43:2000/users", user);
      toast({
        title: result.data.message,
        status: "success",
        position: "top",
        duration: 1000,
        isClosable: true,
      });
      return nav("/login");
    }
  };

  return (
    <Box w="100vw" h="100vh">
      <Center w="100%" h="100%" p={"10px"}>
        <Flex
          // bgColor={"white"}

          w="400px"
          flexDir={"column"}
          padding="20px"
          gap="10px"
          borderRadius={"10px"}
          border={"4px"}
        >
          <Box
            fontWeight={"bold"}
            fontSize={"20px"}
            fontFamily={"sans-serif"}
            color={"black"}
          >
            Daftar Akun Baru
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

          <Box>
            <Box fontWeight={"500"} paddingBottom={"10px"}>
              Name
            </Box>
            <Input
              id="name"
              onChange={inputHandler}
              fontSize={12}
              placeholder="Name..."
              variant={"filled"}
            ></Input>
          </Box>

          <Box>
            <Box fontWeight={"500"} paddingBottom={"10px"}>
              Company
            </Box>
            <Select
              id="CompanyId"
              onChange={inputHandler}
              placeholder="Pilih Company"
              icon={<MdArrowDropDown />}
              variant={"filled"}
            >
              {companies?.map((val) => (
                <option key={val.id} value={val.id}>
                  {val.name}
                </option>
              ))}
            </Select>
          </Box>

          <Box>
            <Box fontWeight={"500"} paddingBottom={"10px"}>
              Address
            </Box>
            <Textarea
              id="address"
              onChange={inputHandler}
              fontSize={12}
              variant={"filled"}
            ></Textarea>
          </Box>

          <Button
            marginTop={"20px"}
            bg={"black"}
            color={"white"}
            onClick={register}
            _hover={{ bg: "#474747" }}
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
