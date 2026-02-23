import React, { useState } from "react";
import { Box, Input, Text } from "@chakra-ui/react";
import { Eye, EyeSlash } from "iconsax-react";

export default function CustomPassword({ label, placeholder, ...rest }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Box pt="25px" w="full" position="relative">
      <Text textAlign="left" textColor="#1E3747" pb="2">
        {label}
      </Text>
      <Input
        type={show ? "text" : "password"}
        variant="outline"
        borderColor="#6CA6D0"
        _placeholder={{
          color: "#6CA6D0",
        }}
        color="gray"
        placeholder={placeholder}
        // focusBorderColor="blue.900"
        style={{ outline: "none", boxShadow: "none" }}
        h="50px"
        w="full"
        {...rest}
      />
      <Box
        position="absolute"
        right={3}
        top="72px"
        cursor="pointer"
        zIndex={2}
        onClick={handleClick}
      >
        {show ? (
          <Eye size="22" color="#98989c" />
        ) : (
          <EyeSlash size="22" color="#98989c" />
        )}
      </Box>
    </Box>
  );
}
