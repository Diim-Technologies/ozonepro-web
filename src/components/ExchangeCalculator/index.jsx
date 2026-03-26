import React from "react";
import {
  Box,
  Flex,
  Text,
  Icon,
  Select,
  VStack,
  HStack,
  Heading,
  Button,
  useColorModeValue,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { ArrowSwapVertical, InfoCircle, WalletMoney } from "iconsax-react";
import exchangeCalculatorHooks from "./hooks";

export default function ExchangeCalculator({ fullWidth = false, isShortcut = false, ...rest }) {
  const {
    exchange,
    currencies,
    currencyPair,
    handleAmountChange,
    handleExchangeDetails,
    exchangeDetails,
    handleContinue,
    exchangeAmount,
  } = exchangeCalculatorHooks();

  const cardBg = useColorModeValue("white", "gray.800");
  const inputBg = useColorModeValue("gray.50", "whiteAlpha.100");
  const borderColor = useColorModeValue("blue.100", "blue.900");

  return (
    <Box
      w={fullWidth ? "full" : { base: "full", md: "450px" }}
      bg={cardBg}
      boxShadow="2xl"
      rounded="3xl"
      p={isShortcut ? 6 : 8}
      border="1px"
      borderColor={borderColor}
      {...rest}
    >
      <VStack spacing={6} align="stretch">
        {!isShortcut && (
          <HStack justify="space-between">
            <VStack align="start" spacing={0}>
              <Heading size="md" color="blue.900">Currency Exchange</Heading>
              <Text fontSize="sm" color="gray.500">Fast and secure currency conversion</Text>
            </VStack>
            <Icon as={WalletMoney} size="32" color="primary.500" variant="Bold" />
          </HStack>
        )}

        <VStack spacing={4}>
          {/* Send Amount */}
          <Box w="full" bg={inputBg} p={4} rounded="2xl">
            <Flex justify="space-between" mb={2}>
              <Text fontSize="xs" fontWeight="700" color="gray.500" textTransform="uppercase">You Send</Text>
              <Select
                variant="unstyled"
                w="fit-content"
                fontWeight="800"
                fontSize="lg"
                color="blue.600"
                value={exchange?.currency1}
                onChange={handleExchangeDetails}
                name="currency1"
              >
                {currencies?.map((curr) => (
                    <option key={curr.id} value={curr.code}>
                        {curr.code}
                    </option>
                ))}
              </Select>
            </Flex>
            <NumberInput
              variant="unstyled"
              value={exchangeAmount}
              onChange={(val) => handleAmountChange(val)}
              min={1}
            >
              <NumberInputField fontSize="2xl" fontWeight="800" p={0} />
            </NumberInput>
          </Box>

          {/* Swap Icon */}
          <Flex
            bg="primary.500"
            color="white"
            p={2}
            rounded="full"
            boxShadow="lg"
            zIndex={2}
            my="-5"
          >
            <ArrowSwapVertical size="20" variant="Bold" />
          </Flex>

          {/* Receive Amount */}
          <Box w="full" bg={inputBg} p={4} rounded="2xl" border="1px" borderColor="transparent">
            <Flex justify="space-between" mb={2}>
              <Text fontSize="xs" fontWeight="700" color="gray.500" textTransform="uppercase">You Receive</Text>
              <Select
                variant="unstyled"
                w="fit-content"
                fontWeight="800"
                fontSize="lg"
                color="blue.600"
                name="currency2"
                onChange={handleExchangeDetails}
                value={exchange?.currency2}
              >
                {currencyPair?.data?.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </Select>
            </Flex>
            <Text fontSize="2xl" fontWeight="800" color="green.500">
              {exchangeDetails?.convertedAmount?.toFixed(2) || "0.00"}
            </Text>
          </Box>
        </VStack>

        <VStack spacing={3} py={2}>
          <Flex justify="space-between" w="full">
            <HStack color="gray.500">
              <Text fontSize="sm">Exchange Rate</Text>
              <Icon as={InfoCircle} boxSize={3} />
            </HStack>
            <Text fontSize="sm" fontWeight="700" color="blue.900">
               1 {exchange?.currency1} = {exchangeDetails?.rate?.toFixed(4) || "0.00"} {exchange?.currency2}
            </Text>
          </Flex>
          <Flex justify="space-between" w="full">
            <Text fontSize="sm" color="gray.500">Transfer Fee</Text>
            <Text fontSize="sm" fontWeight="700" color="red.500">
              ${exchangeDetails?.fee?.toFixed(2) || "0.00"}
            </Text>
          </Flex>
        </VStack>

        <Button
          w="full"
          h={isShortcut ? "55px" : "65px"}
          bg="primary.500"
          color="white"
          fontSize="lg"
          fontWeight="700"
          rounded="2xl"
          _hover={{ bg: "primary.600", transform: "translateY(-2px)" }}
          _active={{ transform: "translateY(0)" }}
          transition="all 0.2s"
          boxShadow="0 10px 20px -5px rgba(214, 51, 58, 0.4)"
          isDisabled={!exchangeDetails}
          onClick={handleContinue}
        >
          {isShortcut ? "Exchange Now" : "Continue Transfer"}
        </Button>

        {!isShortcut && (
          <Text fontSize="xs" color="gray.400" textAlign="center">
            Estimated time: within minutes
          </Text>
        )}
      </VStack>
    </Box>
  );
}
