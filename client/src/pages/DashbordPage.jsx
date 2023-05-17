import { Box, Center, Flex, Button } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Footer from "../components/Footer";
import moment from "moment";

export default function DashboardPage() {
  return (
    <>
      <Flex h="100vh" justifyContent={"center"}>
        <Flex color={"white"} flexDir={"column"}>
          <Box
            padding={"30px"}
            w="100vw"
            maxW="500px"
            bgGradient="linear(to-b, red, white)"
          >
            <Center fontWeight={"500"} flexDir={"column"} h="400px">
              <Box> Live Attendance</Box>
              <Center padding={"20px"} flexDir={"column"}>
                <Box fontSize={"40px"} fontWeight={"500"}>
                  {moment().format("LT")}
                </Box>
                <Box>
                  {moment().format("ddd")}, {moment().format("DD MMMM YYYY")}
                  {/* {moment().format("llll").split(" ", 4)} */}
                </Box>
              </Center>

              <Flex
                bgColor={"white"}
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
                  <Button w="100%" maxW="180px" h="50px" bgColor="red">
                    Clock In
                  </Button>

                  <Button w="100%" maxW="180px" h="50px" bgColor="red">
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

            <Flex justifyContent={"space-between"}>
              <Box padding="10px" fontWeight={"500"}>
                <Box>07:30</Box>
                <Box color="#8A8A8A">17 May</Box>
              </Box>

              <Center color="#8A8A8A" fontWeight={"500"} fontSize={"18px"}>
                Clock In
              </Center>
              <Center>
                <ChevronRightIcon fontSize={"30px"} color="#8A8A8A" />
              </Center>
            </Flex>

            <Flex justifyContent={"space-between"}>
              <Box padding="10px" fontWeight={"500"}>
                <Box>17:30</Box>
                <Box color="#8A8A8A">17 May</Box>
              </Box>

              <Center color="#8A8A8A" fontWeight={"500"} fontSize={"18px"}>
                Clock Out
              </Center>
              <Center>
                <ChevronRightIcon fontSize={"30px"} color="#8A8A8A" />
              </Center>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Footer />
    </>
  );
}
