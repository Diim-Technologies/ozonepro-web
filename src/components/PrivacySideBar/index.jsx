import { Box, Link, Text } from "@chakra-ui/react";

const PrivacySideBar = ({ getTab, selectedTab }) => {
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
        onClick={() => getTab(0)}
      >
        1. INTRODUCTION
      </Text>
      <Text
        color={selectedTab == 1 ? "#D6333A" : "#0D2F48"}
        paddingBottom="20px"
        onClick={() => getTab(1)}
      >
        2. ABOUT US
      </Text>
      <Text
        color={selectedTab == 2 ? "#D6333A" : "#0D2F48"}
        paddingBottom="20px"
        onClick={() => getTab(2)}
      >
        3. ELIGIBILITY
      </Text>
      <Text
        color={selectedTab == 3 ? "#D6333A" : "#0D2F48"}
        paddingBottom="20px"
        onClick={() => getTab(3)}
      >
        4. INFORMATION COLLECTED BY US
      </Text>
      <Text
        color={selectedTab == 4 ? "#D6333A" : "#0D2F48"}
        paddingBottom="20px"
        onClick={() => getTab(4)}
      >
        5. HOW YOUR PERSONAL INFORMATION IS COLLECTED BY US
      </Text>
      <Text
        color={selectedTab == 5 ? "#D6333A" : "#0D2F48"}
        paddingBottom="20px"
        onClick={() => getTab(5)}
      >
        6. HOW YOUR PERSONAL INFORMATION IS USED BY US
      </Text>
      <Text
        color={selectedTab == 6 ? "#D6333A" : "#0D2F48"}
        paddingBottom="20px"
        onClick={() => getTab(6)}
      >
        7. DISCLOSURE OF PERSONAL INFORMATION:
      </Text>
      <Text
        color={selectedTab == 7 ? "#D6333A" : "#0D2F48"}
        paddingBottom="20px"
        onClick={() => getTab(7)}
      >
        8. MARKETING YOUR INFORMATION
      </Text>
      <Text
        color={selectedTab == 8 ? "#D6333A" : "#0D2F48"}
        paddingBottom="20px"
        onClick={() => getTab(8)}
      >
        9. WHO HANDLES YOUR INFORMATION
      </Text>
      <Text
        color={selectedTab == 9 ? "#D6333A" : "#0D2F48"}
        paddingBottom="20px"
        onClick={() => getTab(9)}
      >
        10. SECURITY MEASURES
      </Text>
      <Text
        color={selectedTab == 10 ? "#D6333A" : "#0D2F48"}
        paddingBottom="20px"
        onClick={() => getTab(10)}
      >
        11. DATA RETENTION
      </Text>
      <Text
        color={selectedTab == 11 ? "#D6333A" : "#0D2F48"}
        paddingBottom="20px"
        onClick={() => getTab(11)}
      >
        12. USER RIGHTS
      </Text>
      <Text
        paddingBottom="20px"
        color={selectedTab == 12 ? "#D6333A" : "#0D2F48"}
        onClick={() => getTab(12)}
      >
        13. COOKIES AND TRACKING TECHNOLOGIES
      </Text>

      <Text
        color={selectedTab == 13 ? "#D6333A" : "#0D2F48"}
        paddingBottom="20px"
        onClick={() => getTab(13)}
      >
        14. CHANGES TO THIS PRIVACY POLICY
      </Text>
      <Text
        paddingBottom="20px"
        color={selectedTab == 14 ? "#D6333A" : "#0D2F48"}
        onClick={() => getTab(14)}
      >
        15. CONTACT US
      </Text>
    </Box>
  );
};

export default PrivacySideBar;
