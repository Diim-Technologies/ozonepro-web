import { Box, Link, Text } from "@chakra-ui/react";

const TermSideBar = ({ getTab, selectedTab }) => {
  return (
    <Box
      width={{ md: "246px " }}
      paddingLeft={{ md: "40px" }}
      paddingTop={{ md: "70px", base: "40px" }}
      paddingBottom={{ base: "40px" }}
      overflowY="auto"
      className="hide-scrollbar"
      cursor="pointer"
      // display={{ base: "none" }}
    >
      <Text
        color={selectedTab == 0 ? "#D6333A" : "#0D2F48"}
        paddingBottom="20px"
        onClick={() => {
          getTab(0);
        }}
      >
        1. INTRODUCTION
      </Text>
      <Text
        color={selectedTab == 1 ? "#D6333A" : "#0D2F48"}
        paddingBottom="20px"
        // onClick={() => getTab(1)}
        onClick={() => {
          getTab(1);
        }}
      >
        2. OUR FUNCTIONS
      </Text>
      <Text
        color={selectedTab == 2 ? "#D6333A" : "#0D2F48"}
        paddingBottom="20px"
        onClick={() => {
          getTab(2);
        }}
      >
        3. YOUR FUNCTIONS
      </Text>
      <Text
        color={selectedTab == 3 ? "#D6333A" : "#0D2F48"}
        paddingBottom="20px"
        onClick={() => {
          getTab(3);
        }}
      >
        4. WARRANTIES AND LIABILITY
      </Text>
      <Text
        color={selectedTab == 4 ? "#D6333A" : "#0D2F48"}
        paddingBottom="20px"
        onClick={() => {
          getTab(4);
        }}
      >
        5. USE OF OUR WEBSITE, APPLICATION (APP) AND SERVICES
      </Text>
      <Text
        color={selectedTab == 5 ? "#D6333A" : "#0D2F48"}
        paddingBottom="20px"
        onClick={() => {
          getTab(5);
        }}
      >
        6. PROHIBITION OF USE
      </Text>
      <Text
        color={selectedTab == 6 ? "#D6333A" : "#0D2F48"}
        paddingBottom="20px"
        onClick={() => {
          getTab(6);
        }}
      >
        7. DIGITAL COMMUNICATIONS
      </Text>
      <Text
        color={selectedTab == 7 ? "#D6333A" : "#0D2F48"}
        paddingBottom="20px"
        onClick={() => {
          getTab(7);
        }}
      >
        8. REWARDS
      </Text>
      <Text
        color={selectedTab == 8 ? "#D6333A" : "#0D2F48"}
        paddingBottom="20px"
        onClick={() => {
          getTab(8);
        }}
      >
        9. INDEMNIFICATION
      </Text>
      <Text
        color={selectedTab == 9 ? "#D6333A" : "#0D2F48"}
        paddingBottom="20px"
        onClick={() => {
          getTab(9);
        }}
      >
        10. TERMINATION
      </Text>
      <Text
        color={selectedTab == 10 ? "#D6333A" : "#0D2F48"}
        paddingBottom="20px"
        onClick={() => {
          getTab(10);
        }}
      >
        11. COMPLAINTS
      </Text>
      <Text
        color={selectedTab == 11 ? "#D6333A" : "#0D2F48"}
        paddingBottom="20px"
        onClick={() => {
          getTab(11);
        }}
      >
        12. DISPUTE RESOLUTION
      </Text>
      <Text
        color={selectedTab == 12 ? "#D6333A" : "#0D2F48"}
        onClick={() => {
          getTab(12);
        }}
      >
        13. GENERAL
      </Text>
    </Box>
  );
};

export default TermSideBar;
