import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Box, Center, Flex, Input, Button } from "@chakra-ui/react";

export default function ForgotPassword() {
  const location = useLocation();
  const [user, setUser] = useState([]);
  const [token, setToken] = useState();
  const dispatch = useDispatch();
  const nav = useNavigate();
  async function fetchUser(token) {
    await axios
      .get("http://localhost:2000/users/v3", { params: { token } })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }

  async function changePassword() {
    await axios
      .patch("http://localhost:2000/auth/v4?token=" + token, {
        user,
      })
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
        nav("/login");
      });
  }

  useEffect(() => {
    console.log(location);

    const tempToken = location.pathname.split("/")[2];
    //   ["", forgot-password , setiPkRkDCbKGZ6aYy-fq]
    //setiPkRkDCbKGZ6aYy-fq
    fetchUser(tempToken);
    setToken(tempToken);
  }, []);

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
    console.log(tempUser);
  };

  return (
    <>
      {user.id ? (
        <Box w="100vw" h="100vh" bgColor={"#F2F4F7"}>
          <Center w="100%" h="100%">
            <Flex
              bgColor={"white"}
              w="300px"
              flexDir={"column"}
              padding="20px"
              gap="10px"
              borderRadius={"10px"}
            >
              <Box
                fontWeight={"500"}
                fontSize={"30px"}
                fontFamily={"sans-serif"}
              >
                Forgot Password
              </Box>

              <Box>
                <Box fontWeight={"500"} paddingBottom={"10px"}>
                  {" "}
                  New Password
                </Box>
                <Input
                  type="password"
                  id="password"
                  onChange={inputHandler}
                ></Input>
              </Box>

              <Button
                marginTop={"25px"}
                bgColor="#035EBF"
                color={"white"}
                w="100%"
                onClick={changePassword}
              >
                Change Password
              </Button>
              {/* </Link> */}
            </Flex>
          </Center>
        </Box>
      ) : (
        <Center h="100vh">
          <h1> Link has Expired </h1>
        </Center>
      )}
    </>
  );
}

export function RequestForgotPassword() {
  const [email, setEmail] = useState("");
  const nav = useNavigate();

  async function forgotPassword() {
    await axios
      .get("http://localhost:2000/users/generate-token/email", {
        params: {
          email,
        },
      })
      .then(
        (res) => alert(res.data.message)
        // /forgot-password/token
        //    console.log(res.data));
      );
  }
  return (
    <Box w="100vw" h="100vh" bgColor={"#F2F4F7"}>
      <Center w="100%" h="100%">
        <Flex
          bgColor={"white"}
          w="300px"
          flexDir={"column"}
          padding="20px"
          gap="10px"
          borderRadius={"10px"}
        >
          <Box fontWeight={"500"} fontSize={"20px"} fontFamily={"sans-serif"}>
            Request Forgot Password
          </Box>

          <Box>
            <Box fontWeight={"500"} paddingBottom={"10px"}>
              {" "}
              Email
            </Box>
            <Input
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></Input>
          </Box>

          <Button
            marginTop={"25px"}
            bgColor="#035EBF"
            color={"white"}
            w="100%"
            onClick={forgotPassword}
          >
            Forgot Password
          </Button>
          {/* </Link> */}
        </Flex>
      </Center>
    </Box>
  );
}
