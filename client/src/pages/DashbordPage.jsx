import { Box, Center, Flex, Button, Avatar } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Footer from "../components/Footer";
import moment from "moment";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const userSelector = useSelector((state) => state.auth);
  const nav = useNavigate();
  const [log, setLog] = useState({ clock_in: "", clock_out: "" });
  // live jam
  const LiveJam = () => {
    const [time, setTime] = useState(moment().format("hh:mm:ss"));

    useEffect(() => {
      setTimeout(() => {
        setTime(moment().format("hh:mm:ss"));
      }, 1000);
    }, [time]);

    return <> {moment().format("hh:mm A")} </>;
  };

  //
  useEffect(() => {
    async function getTodayLog() {
      if (!userSelector.id) {
        return nav("/login");
      }
      await axios
        .get("http://localhost:2000/attendances/", {
          params: {
            date: moment().format("yyyy-MM-DD"),
            UserId: userSelector.id,
          },
        })
        .then((res) => setLog(res.data));
    }

    getTodayLog();
  }, []);

  async function InputClock(e) {
    const { id } = e.target;
    console.log(id);
    console.log(moment().format("HH:mm"));
    await axios
      .post("http://localhost:2000/attendances/v1", {
        UserId: userSelector.id,
        [id]: moment().format("HH:mm"),
      })
      .then((res) => {
        console.log(res.data);
        setLog(res.data);
      });
  }

  return (
    <>
      <Flex h="100vh" justifyContent={"center"}>
        <Flex color={"white"} flexDir={"column"}>
          <Box
            padding={"30px"}
            w="100vw"
            maxW="400px"
            bgGradient="linear(to-b, black, white)"
          >
            <Center fontWeight={"500"} flexDir={"column"} h="400px">
              <Center padding={"20px"} flexDir={"column"}>
                <Box p={"5px"}>
                  <Avatar size={"md"} src={userSelector.avatar_url} />
                </Box>
                <Box>welcome, {userSelector?.name}</Box>

                <Box fontSize={"40px"} fontWeight={"500"}>
                  {LiveJam()}
                </Box>
                <Box>
                  {moment().format("ddd")}, {moment().format("DD MMMM YYYY")}
                </Box>
              </Center>

              <Flex
                bgGradient="linear(to-b, white, #f3f3f3ff)"
                h={"100%"}
                w="100%"
                borderRadius={"10px"}
                flexDir={"column"}
                alignItems={"center"}
                padding={"30px"}
                gap="10px"
              >
                <Box color={"#8A8A8A"}>
                  {" "}
                  Schedule: {moment().format("DD MMMM YYYY")}
                </Box>
                <Box color={"black"} fontWeight={"bold"} fontSize={"40px"}>
                  08:00 - 17:00{" "}
                </Box>

                <Center
                  justifyContent={"space-between"}
                  w="100%"
                  h="100%"
                  gap="10px"
                >
                  <Button
                    w="100%"
                    maxW="180px"
                    h="50px"
                    bgColor="black"
                    onClick={InputClock}
                    id="clock_in"
                  >
                    Clock In
                  </Button>

                  <Button
                    w="100%"
                    maxW="180px"
                    h="50px"
                    bgColor="black"
                    onClick={InputClock}
                    id="clock_out"
                  >
                    Clock Out{" "}
                  </Button>
                </Center>
              </Flex>
            </Center>
          </Box>

          <Flex
            bgColor={"white"}
            color="black"
            w="100%"
            paddingX={"20px"}
            paddingTop={"20px"}
            flexDir={"column"}
            fontSize={"18px"}
            paddingBottom={"70px"}
          >
            <Flex justifyContent={"space-between"} w="100%" fontWeight={"500"}>
              <Box>Attendance Log</Box>
              <Box color="#8A8A8A">View Log</Box>
            </Flex>

            {log.clock_in ? (
              <Flex justifyContent={"space-between"}>
                <Box padding="10px" fontWeight={"500"}>
                  <Box> {log.clock_in} </Box>
                  <Box color="#8A8A8A">
                    {moment(log.createdAt).format("DD MMMM")}
                  </Box>
                </Box>

                <Center color="#8A8A8A" fontWeight={"500"} fontSize={"18px"}>
                  Clock In
                </Center>
                <Center>
                  <ChevronRightIcon fontSize={"30px"} color="#8A8A8A" />
                </Center>
              </Flex>
            ) : null}

            {log.clock_out ? (
              <Flex justifyContent={"space-between"}>
                <Box padding="10px" fontWeight={"500"}>
                  <Box>{log.clock_out}</Box>
                  <Box color="#8A8A8A">
                    {moment(log.createdAt).format("DD MMMM")}
                  </Box>
                </Box>

                <Center color="#8A8A8A" fontWeight={"500"} fontSize={"18px"}>
                  Clock Out
                </Center>
                <Center>
                  <ChevronRightIcon fontSize={"30px"} color="#8A8A8A" />
                </Center>
              </Flex>
            ) : null}
          </Flex>
        </Flex>
      </Flex>

      <Footer />
    </>
  );
}
