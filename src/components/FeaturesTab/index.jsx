import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Text,
  Image,
  Flex,
  Icon,
  Link,
} from "@chakra-ui/react";
import { ChevronDown } from "react-iconly";

export default function FeaturesTab() {
  return (
    <Popover>
      <PopoverTrigger>
        <Flex
          alignItems="center"
          _hover={{
            textColor: "primary.500",
          }}
          as="button"
          cursor="pointer"
        >
          <Text
            // as="button"
            // _hover={{
            //   textColor: "primary.500",
            // }}
            cursor="pointer"
            fontWeight="semibold"
          >
            Features
          </Text>
          <Icon
            as={ChevronDown}
            w={5}
            h={5}
            color="#000000"
            _hover={{
              textColor: "primary.500",
            }}
          />
        </Flex>
      </PopoverTrigger>
      <PopoverContent border="none" bg="white" p={8}>
        <PopoverBody>
          <Link cursor="pointer" href="/money-exchange">
            <Flex gap={5} alignItems="center">
              <Image src="/images/green_dollar.png" h={"36px"} w={"36px"} />
              <Text>Money Exchange</Text>
            </Flex>
          </Link>

          <Link cursor="pointer" href="/accounting">
            <Flex mt="35px" gap={5} alignItems="center">
              <Image src="/images/accounting_icon.png" h={"36px"} w={"36px"} />
              <Text>Accounting</Text>
            </Flex>
          </Link>
          <Link cursor="pointer" href="/about">
            <Flex mt="35px" gap={5} alignItems="center">
              <Image src="/images/about_icon.png" h={"36px"} w={"36px"} />
              <Text>About Us</Text>
            </Flex>
          </Link>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
