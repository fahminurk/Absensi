import { Box, Center, Divider, Flex, Input } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Footer from "../components/Footer";
import moment from "moment";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function AttendanceLogPage() {
  return (
    <Flex h="100vh" justifyContent={"center"}>
      <Flex color={"white"} flexDir={"column"}>
        <Flex
          w="100vw"
          maxW="400px"
          bg={"red"}
          h={"50px"}
          alignItems={"center"}
          paddingLeft={3}
        >
          <Link to={"/"}>
            <FiArrowLeft size={"25px"} />
          </Link>

          <Box marginLeft={"100px"}>Attendance Log</Box>
        </Flex>
        <Input type="month" color={"black"} />
        <Tabs isFitted>
          <TabList mb="1em" color={"black"}>
            <Tab>Logs</Tab>
            <Tab>Attendace</Tab>
            <Tab>Shift</Tab>
          </TabList>
          <TabPanels color={"black"}>
            <TabPanel>
              <Flex justifyContent={"space-between"}>
                <Box>24 Jan</Box>
                <Flex gap={10}>
                  <Box>07:45</Box>
                  <Box>17:00</Box>
                </Flex>

                <Box>icon</Box>
              </Flex>
            </TabPanel>
            <Center>
              <Divider w={"330px"} />
            </Center>

            <TabPanel>
              <p>tAttendance</p>
            </TabPanel>
            <TabPanel>
              <p>Shift</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
}
