import { Box, Center, Divider, Flex, Input } from "@chakra-ui/react";
import { AddIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Footer from "../components/Footer";
import moment from "moment";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function AttendanceLogPage() {
  const userSelector = useSelector((state) => state.auth);
  const nav = useNavigate();
  const [data, setData] = useState([]);
  async function getAttendances(e) {
    if (!userSelector.id) {
      return nav("/login");
    }
    await axios
      .post("http://localhost:2000/attendances", {
        month: e ? e.target.value.split("-")[1] : moment().format("MM"),
        year: e ? e.target.value.split("-")[0] : moment().format("yyyy"),
        UserId: userSelector.id,
      })
      .then((res) => setData(res.data.value));
  }

  useEffect(() => {
    getAttendances();
  }, []);

  return (
    <Flex h="100vh" alignItems={"center"} flexDir={"column"}>
      <Center
        color={"white"}
        bgColor={"red"}
        // h="40px"
        padding={"20px"}
        fontWeight={"500"}
        w="100vw"
        maxW="400px"
      >
        Attendance Log
      </Center>

      <Flex
        w="100vw"
        maxW="400px"
        h="100%"
        flexDirection={"column"}
        padding={"10px"}
      >
        <Input
          width="100%"
          type="month"
          defaultValue={moment().format("yyyy-MM")}
          fontWeight={"500"}
          onChange={getAttendances}
        ></Input>

        {data.map((val, idx) => (
          <Center
            justifyContent={"space-between"}
            borderBottom={"1px solid rgba(0, 0, 0, 0.1)"}
            padding={"20px"}
            key={"log_" + idx}
          >
            <Box fontWeight={"bold"}>
              {moment(val.createdAt).format("DD MMMM")}
            </Box>
            <Box fontWeight={500}>{val.clock_in}</Box>
            <Box fontWeight={500}>{val.clock_out}</Box>
            <AddIcon fontSize={"8px"} />
          </Center>
        ))}
      </Flex>
      <Footer />
    </Flex>
  );
}
