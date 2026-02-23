import React, { useState } from "react";
import {
  Flex,
  Box,
  Image,
  HStack,
  Text,
  keyframes,
  Input,
  Icon,
  Heading,
  Spinner,
  Select,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import CustomInput from "../../components/Input";
import CustomPassword from "../../components/Password";
import { CustomButton } from "../../components/Button";
import { TickSquare, Camera, ChevronDown } from "react-iconly";
import kycHooks from "./hooks";
import { GrStatusGood } from "react-icons/gr";
import AuthHero from "../../components/AuthHero";

export default function KYC() {
  const {
    handleSubmit,
    handleChange,
    handleUploadImage,
    docFile,
    passwordScreen,
    handlePasswordChange,
    handlePasswordSubmit,
    passwordIsLoading,
    initKycIsLoading,
  } = kycHooks();

  return (
    <>
      {!passwordScreen && (
        <Flex h="100vh">
          <Box
            // py="38px"
            // px="38px"
            h="100vh"
            w={{ base: "full", md: "50%" }}
            display={{ base: "none", lg: "flex" }}
            alignItems="center"
          >
            <AuthHero />
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            overflowY="scroll"
            w={{ base: "full", lg: "50%" }}
            p={{ base: "10px", md: "30px" }}
          >
            <Box w={{ base: "full", md: "80%" }} mx="auto">
              <Image src="/images/ozone-pro-logo.png" h="100px" w="135px" />

              <Text
                pt="30px"
                fontSize={24}
                fontWeight={600}
                w={{ base: "full", lg: "80%", xl: "50%" }}
                textColor="blue.900"
              >
                Let’s get to know you better!
              </Text>

              <Text
                pt="15px"
                fontSize={20}
                fontWeight={600}
                textColor="blue.900"
              >
                Government Issued ID
              </Text>
              <Text py="15px" fontWeight={500} textColor="blue.900">
                Confirm your identity by taking a live upload
              </Text>

              <UnorderedList textColor="#6CA6D0">
                <ListItem>
                  Upload a clear and legible image of your governmental ID, such
                  as a passport, driver's license, or national ID card.
                </ListItem>
                <ListItem>
                  Make sure the image is well-lit and without any obstructions
                  or reflections, as blurry or overexposed images may be
                  rejected
                </ListItem>
                <ListItem>
                  {" "}
                  Your ID will be stored securely and only used for verification
                  purposes, as we take the protection of your personal
                  information seriously.
                </ListItem>
              </UnorderedList>

              <Box pt="5">
                <Text pb="2">Government Issued ID</Text>

                <Select
                  name="idType"
                  borderColor="#6CA6D0"
                  size={{ base: "md", md: "lg" }}
                  fontSize="16px"
                  icon={<ChevronDown set="light" primaryColor="#1C496A" />}
                  style={{
                    color: "#1C496A",
                  }}
                  onChange={handleChange}
                  placeholder="Please select your prefered type of document"
                >
                  <option
                    style={{
                      color: "#1C496A",
                    }}
                    value="Drivers License"
                  >
                    Drivers License
                  </option>
                  <option
                    style={{
                      color: "#1C496A",
                    }}
                    value="NIN"
                  >
                    NIN
                  </option>
                  <option
                    style={{
                      color: "#1C496A",
                    }}
                    value="Passport"
                  >
                    Passport
                  </option>
                </Select>
              </Box>

              {/* <CustomInput
  type="text"
  label="Government Issued ID"
  placeholder="Select ID Type"
  onChange={handleChange}
  name="idType"
/> */}

              <Box cursor="pointer" pt="25px">
                <Text pb="2">Upload photo of ID</Text>
                <Box
                  position="relative"
                  h="200px"
                  w="full"
                  borderColor="#6CA6D0"
                  borderWidth="1px"
                  rounded="lg"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Input
                    h="200px"
                    name="docFile"
                    opacity={0}
                    cursor="pointer"
                    w="full"
                    pos="absolute"
                    accept="image/x-png,image/jpg,image/jpeg"
                    onChange={handleUploadImage}
                    type="file"
                  />
                  {docFile ? (
                    docFile?.name
                  ) : (
                    <>
                      <Camera
                        set="light"
                        size="xlarge"
                        primaryColor="#31658C"
                      />
                      <Text>Upload Photo</Text>
                    </>
                  )}
                </Box>
              </Box>

              <Box py="70px">
                <CustomButton
                  isLoading={initKycIsLoading}
                  loadingText="Loading..."
                  spinner={<Spinner size="sm" />}
                  onClick={handleSubmit}
                  bg="primary.500"
                >
                  Continue
                </CustomButton>
              </Box>
            </Box>
          </Box>
        </Flex>
      )}

      {passwordScreen && (
        <Flex
          h={"100vh"}
          w={"full"}
          bg="#FFFFFF"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            w={"600px"}
            h={{ base: "650px", md: "600px" }}
            bg="#F5FAFF"
            p="30px"
            borderWidth="1px"
            borderColor="#93CAF2"
            rounded="24px"
            textAlign="center"
          >
            <Icon as={GrStatusGood} w={113} h={113} color="#4DB955" />
            <Heading textColor="#4DB955">Successful</Heading>
            {/* <Text textAlign="center" mx="auto" pt="53px" w="90%">
              Your documents are on their way to our team. We will email you
              once they are approved. In the meantime, you can go back to the
              homepage by clicking the button below. Thank you for using our
              service. We hope to see you again soon. 😊
            </Text> */}

            <Text textAlign="center" mx="auto" pt="53px" w="90%">
              Do you want to become a user, so that you won't have to go through
              the process of signing up again? Input a password below.
            </Text>

            <CustomPassword
              label="Password"
              placeholder="*********"
              onChange={handlePasswordChange}
            />

            <CustomButton
              isLoading={passwordIsLoading}
              loadingText="Loading..."
              spinner={<Spinner size="sm" />}
              onClick={handlePasswordSubmit}
              mt="70px"
              bg="primary.500"
              // route="/"
            >
              Submit
            </CustomButton>
          </Box>
        </Flex>
      )}
    </>
  );
}
