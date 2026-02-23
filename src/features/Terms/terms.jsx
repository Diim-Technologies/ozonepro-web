import {
  Box,
  Button,
  ListItem,
  Icon,
  Text,
  Heading,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TermSideBar from "../../components/TermSideBar";
import PrivacySideBar from "../../components/PrivacySideBar";
import { sectionContent } from "../../features/Terms/sectionContent";
import { ChevronRight, ChevronDown } from "react-iconly";

const NewTerms = () => {
  const [tab, setTabNumber] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const handlePrivacyClick = () => {
    setIsPrivacyOpen(!isPrivacyOpen);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // const handleDropDown = () => {
  //   setIsOpen(false);
  // };
  // console.log(typeof handleDropDown);

  // console.log("Heading", tab);
  return (
    <Box overflowY={{ lg: "clip" }}>
      <Box
        paddingLeft="25px"
        paddingTop="31px"
        paddingRight="49px"
        paddingBottom="23px"
        color="blue.900"
        fontWeight="bold"
        display={{ md: "none" }}
      >
        <Flex
          justifyContent="space-between"
          paddingBottom="27px"
          color="blue.900"
        >
          <Link href="/terms" cursor="pointer">
            Terms of Service
          </Link>
          <Box onClick={handleClick}>
            {isOpen ? (
              <Icon
                as={ChevronDown}
                cursor="pointer"
                w={5}
                h={5}
                color="blue.900"
                style={{ fontWeight: "600px" }}
              />
            ) : (
              <Icon
                as={ChevronRight}
                w={5}
                h={5}
                cursor="pointer"
                color="blue.900"
                fontWeight="bold"
              />
            )}
          </Box>

          {/* <Icon as={ChevronRight} w={5} h={5} color="blue.900" /> */}
        </Flex>
        {isOpen && (
          <Box>
            <TermSideBar
              getTab={(tabNumber) => {
                setTabNumber(tabNumber);
                setIsOpen(false);
              }}
              selectedTab={tab}
            />
          </Box>
        )}
        <Flex
          justifyContent="space-between"
          paddingBottom="27px"
          color="blue.900"
        >
          <Link href="/privacy" cursor="pointer">
            Privacy Policy
          </Link>
          <Box onClick={handlePrivacyClick}>
            {isPrivacyOpen ? (
              <Icon
                as={ChevronDown}
                w={5}
                h={5}
                cursor="pointer"
                color="blue.900"
                style={{ fontWeight: "600px" }}
              />
            ) : (
              <Icon
                as={ChevronRight}
                w={5}
                h={5}
                cursor="pointer"
                color="blue.900"
                fontWeight="bold"
              />
            )}
          </Box>

          {/* <Icon as={ChevronRight} w={5} h={5} color="blue.900" /> */}
        </Flex>
        {isPrivacyOpen && (
          <Box>
            <PrivacySideBar
              getTab={(tabNumber) => {
                setTabNumber(tabNumber);
                setIsPrivacyOpen(false);
              }}
              selectedTab={tab}
            />
          </Box>
        )}
      </Box>

      <Box
        display={{ md: "flex" }}
        justifyContent={{ md: "space-between" }}
        flexDirection={{ md: "row" }}
        h="700px"
      >
        <Box display={{ base: "none", md: "inline-flex" }}>
          {" "}
          <TermSideBar
            getTab={(tabNumber) => setTabNumber(tabNumber)}
            selectedTab={tab}
          />
        </Box>

        {/* {sectionContent.map((section) => ( */}
        <Box
          bg=" #F8FDFB"
          // bgSize="contain"
          paddingRight={{ md: "110px", base: "23px" }}
          paddingLeft={{ md: "40px", base: "23px" }}
          paddingTop="45px"
          id="sectionContent"
          // w={{ md: "800px", lg: "978px" }}
        >
          <Box mb={{ lg: "20px", base: "" }}>
            <Heading
              fontFamily="body"
              color="#0D2F48"
              fontWeight="extrabold"
              fontSize="32px"
              paddingBottom={{ base: "17px" }}
              w={{ md: "600px", lg: "978px" }}
            >
              Terms of Service for Ozone Pro-Financial Corporation
            </Heading>
            <Text
              mt={{ lg: "10px" }}
              fontSize="20px"
              fontWeight="normal"
              fontFamily="body"
              paddingBottom={{ base: "39px" }}
            >
              Effective Date (1st of July, 2023)
            </Text>
          </Box>
          <Text
            color={tab && "#D6333A"}
            mb={{ lg: "26px" }}
            mt={{ lg: "45px" }}
            fontFamily="body"
            fontWeight={600}
            fontSize="16px"
            paddingBottom={{ base: "24px" }}
          >
            {sectionContent[tab]?.heading}
          </Text>
          <Box
            w={{ md: "800px", lg: "978px" }}
            h={{ lg: "450px" }}
            overflowY="auto"
            overflowX="hidden"
            css={{
              "&::-webkit-scrollbar": {
                width: "8px",
                backgroundColor: "#F1F1F1",
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "4px",
                backgroundColor: "#F84950",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#555",
              },
            }}
          >
            <Box
              w={{ md: "auto", base: "auto" }}
              h={{ lg: "450px" }}
              mr={{ md: "200px" }}
            >
              {sectionContent[tab]?.contentArray.map((content, index) => (
                <Text
                  key={index}
                  fontFamily="body"
                  fontSize="20px"
                  lineHeight="24px"
                  paddingBottom="10px"
                >
                  <span
                    style={{
                      fontWeight:
                        content.substring(0, 1).includes("(") ||
                        content.substring(0, 1).includes(")")
                          ? "normal"
                          : "bold",
                      paddingRight:
                        content.substring(0, 1).includes("(") ||
                        content.substring(0, 1).includes(")")
                          ? "0px"
                          : "25px",
                      marginLeft:
                        content.substring(0, 1).includes("(") ||
                        content.substring(0, 1).includes(")") ||
                        content.substring(0, 1).includes("-")
                          ? "20px"
                          : "0px",
                    }}
                  >
                    {content.substring(0, 4)}
                  </span>
                  {content.substring(4)}
                </Text>
              ))}
            </Box>
          </Box>
        </Box>
        {/* ))} */}
      </Box>
    </Box>
  );
};

export default NewTerms;
