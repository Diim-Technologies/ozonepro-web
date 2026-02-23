import { Button } from "@chakra-ui/react";
import Link from "next/link";

export const CustomButton = ({
  children,
  color,
  icon,
  route,
  handleClick,
  ...rest
}) => (
  <Link w="100%" href={route != null ? route : ""}>
    <Button
      // isLoading={isLoading || false}
      // loadingText="Submitting"
      // textAlign="center"
      borderRadius="24px"
      w="full"
      height="64px"
      fontWeight="semibold"
      colorScheme="primary.500"
      textColor="white"
      size="xs"
      fontSize="16px"
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Button>
  </Link>
);
