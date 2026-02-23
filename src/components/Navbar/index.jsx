import React, { useContext } from "react";
import {
  HStack,
  Heading,
  Image,
  Flex,
  Text,
  Icon,
  Drawer,
  DrawerBody,
  Box,
  VStack,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { CustomButton } from "../../components/Button";
import { TextalignRight } from "iconsax-react";
import Link from "next/link";
import FeaturesTab from "../../components/FeaturesTab";
import { useRouter } from "next/router";
import { UserContext } from "../../contexts/UserContext";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const router = useRouter();

  const { clientPhoneNumber } = useContext(UserContext);

  const handleChat = () => {
    const url = `https://wa.me/${clientPhoneNumber}`;

    router.push(url);
  };

  return (
    <HStack
      py="20px"
      px={{ base: "10px", md: "30px", lg: "70px", xl: "100px" }}
      justifyContent="space-between"
    >
      <Image src="/images/ozone-pro-logo.png" h="68px" w="85px" />

      <Flex gap="30px" display={{ base: "none", lg: "flex" }}>
        <Link href="/">
          <Text
            as="button"
            _hover={{
              textColor: "primary.500",
            }}
            cursor="pointer"
            fontWeight="semibold"
          >
            Home
          </Text>
        </Link>

        <FeaturesTab />

        <Text
          as="button"
          _hover={{
            textColor: "primary.500",
          }}
          cursor="pointer"
          fontWeight="semibold"
          onClick={handleChat}
        >
          Chat with Us
        </Text>
      </Flex>

      <Flex
        gap={{ md: 3, base: 3 }}
        display={{ base: "flex", lg: "flex" }}
        justifyContent={{ base: "space-between" }}
      >
        <CustomButton
          px={{ md: "30px", base: "25px" }}
          textColor="primary.500"
          variant="outline"
          height="41px"
          route="/login"
        >
          Log in
        </CustomButton>

        <CustomButton
          route="/signup"
          px={{ md: "30px", base: "17px" }}
          bg="primary.500"
          height="41px"
        >
          Register
        </CustomButton>
      </Flex>

      <Icon
        as={TextalignRight}
        boxSize="32px"
        onClick={onOpen}
        display={{ base: "block", lg: "none" }}
      />

      {/* Dwawer for mobile screens */}

      <Drawer
        placement="top"
        onClose={onClose}
        isOpen={isOpen}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>
            <VStack pt={14} pb={10} spacing={4} textAlign="center">
              <Link href="/">
                <Text
                  _hover={{
                    textColor: "primary.500",
                  }}
                  cursor="pointer"
                  fontWeight="semibold"
                  onClick={onClose}
                >
                  Home
                </Text>
              </Link>
              <Link href="/money-exchange">
                <Text
                  _hover={{
                    textColor: "primary.500",
                  }}
                  cursor="pointer"
                  fontWeight="semibold"
                  onClick={onClose}
                >
                  Money Exchange
                </Text>
              </Link>
              <Link href="/accounting">
                <Text
                  _hover={{
                    textColor: "primary.500",
                  }}
                  cursor="pointer"
                  fontWeight="semibold"
                  onClick={onClose}
                >
                  Accounting
                </Text>
              </Link>
              <Text
                _hover={{
                  textColor: "primary.500",
                }}
                cursor="pointer"
                fontWeight="semibold"
                onClick={handleChat}
              >
                Chat with Us
              </Text>

              {/* <CustomButton
                px="90px"
                textColor="primary.500"
                variant="outline"
                w={{ base: "70%", md: "40%" }}
                height="41px"
                route="/login"
              >
                Log in
              </CustomButton>

              <CustomButton
                px="90px"
                bg="primary.500"
                w={{ base: "70%", md: "40%" }}
                height="41px"
                route="/signup"
              >
                Register
              </CustomButton> */}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
}
