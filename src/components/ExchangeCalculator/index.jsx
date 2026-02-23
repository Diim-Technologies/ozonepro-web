import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  Select,
  Divider,
  Icon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Swap, ChevronDown } from "react-iconly";
import { CustomButton } from "../../components/Button";
import exchangeCalculatorHooks from "./hooks";
import { UserContext } from "../../contexts/UserContext";

export default function ExchangeCalculator({ ...rest }) {
  const [disable,setDisable] = useState(true)

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


  return (
    <Box
      w={{ base: "full", md: "450px", xl: "600px" }}
      h={{ base: "480px", md: "590px", xl: "650px" }}
      // display="flex"
      // alignItems="center"
      // mx="auto"
      boxShadow="0px 9.70117px 97.0117px rgba(13, 47, 72, 0.12)"
      bgColor="#FFFFFF"
      mt="30px"
      rounded={40}
      p={{ base: 15, md: 25 }}
      {...rest}
    >
      <Box
        border="2px"
        p={{ base: "10px", md: "15px" }}
        rounded={24}
        borderColor="blue.400"
      >
        <Flex gap={3} alignItems="center" justifyContent="space-between">
          <Text fontSize={{ base: "16", md: "20", xl: "28" }}>Transfer</Text>
          <Flex alignItems="center" gap={{ base: 1, md: 3 }}>
            <Box>
              <Select
                name="currency1"
                rounded={{ base: "8px", md: "16px" }}
                h="41px"
                size={{ base: "md", md: "lg" }}
                fontSize={{ base: "14px", md: "20px" }}
                fontWeight={700}
                icon={<ChevronDown set="light" primaryColor="#1C496A" />}
                style={{
                  color: "#1C496A",
                }}
                value={exchange?.currency1}
                onChange={handleExchangeDetails}
                // placeholder="NGN"
              >
                {currencies?.data.filter(({ attributes }) => attributes?.isAvailable).map(({ attributes, id }) => (
                  <option
                    key={id}
                    style={{
                      color: "#1C496A",
                    }}
                    value={attributes?.currency}
                    defaultValue='NGN'
                    
                  >
                    {attributes?.currency}
                  </option>
                ))}
              </Select>
            </Box>

            <Icon
              as={Swap}
              w={{ base: 4, md: 8 }}
              h={{ base: 4, md: 8 }}
              color="#6CA6D0"
              style={{ transform: "rotate(90deg)" }}
            />

            <Box>
              <Select
                name="currency2"
                rounded={{ base: 8, md: 16 }}
                size={{ base: "md", md: "lg" }}
                fontSize={{ base: "14px", md: "20px" }}
                fontWeight={700}
                icon={<ChevronDown set="light" primaryColor="#1C496A" />}
                style={{
                  color: "#1C496A",
                }}
                onChange={handleExchangeDetails}
                placeholder={exchange?.currency1 == 'CAD' ? "" : 'CAD'}
              >
                {currencyPair?.data.map((currency) => (
                  
                  <option
                    key={currency}
                    style={{
                      color: "#1C496A",
                    }}
                    value={currency}
                  >
                    {currency}
                  </option>
                ))}
              </Select>
            </Box>
          </Flex>
        </Flex>

        <Box>
          <NumberInput
            size="xl"
            fontWeight={600}
            fontSize={{ base: "20", md: "20", xl: "28" }}
            variant="unstyled"
            value={exchangeAmount}
            onChange={handleAmountChange}
            // min={0}
          >
            <NumberInputField />
          </NumberInput>
        </Box>
      </Box>

      {/* <CustomButton mx="auto" w="220px" my="20px" bg="primary.500">
        Convert
      </CustomButton> */}

      <Box
        border="2px"
        mt={{ base: 15, md: 25 }}
        p={{ base: "10px", md: "15px" }}
        rounded={24}
        borderColor="blue.400"
      >
        <Flex justifyContent="space-between">
          <Text fontSize={{ base: "16", md: "20", xl: "28" }}>Receive</Text>
        </Flex>

        <Box display="flex" justifyContent="flex-start" alignItems="center">
          <Text
            h="40px"
            fontSize={{ base: "20", md: "20", xl: "28" }}
            fontWeight={600}
            textColor="blue.900"
            textAlign="left"
          >
            {exchangeDetails?.amountToRecieve}
          </Text>
        </Box>
      </Box>

      <Divider borderColor="#93CAF2" my={{ base: "15px", md: "30px" }} />

      <Flex justifyContent="space-between" alignItems="center">
        <Text
          fontSize={{ base: "16", md: "20", xl: "28" }}
          textColor="blue.800"
        >
         Indicative Exchange Rate
        </Text>

        <Text fontSize={{ base: "16", md: "20", xl: "28" }} textColor="#4DB955">
          {exchangeDetails?.currentExchangeDetails?.exchangeRate}
        </Text>
      </Flex>

      <Box pt="18">
        <Flex
          fontSize={{ base: "16", md: "20", xl: "28" }}
          justifyContent="space-between"
        >
          <Text textColor="blue.800">Transfer Fee</Text>
          <Text textColor="#D6333A">
            {exchangeDetails?.currentExchangeDetails?.transactionFee}
          </Text>
        </Flex>

        <Flex
          fontSize={{ base: "16", md: "20", xl: "28" }}
          justifyContent="space-between"
          pt="18"
          pb="40px"
        >
          <Text textColor="blue.800">Transfer time</Text>
          <Text textColor="#4DB955">within minutes</Text>
        </Flex>

         <CustomButton 
         handleClick={handleContinue}  
         isDisabled={!exchangeDetails}
         bg="primary.500">
          Continue
        </CustomButton>
      </Box>
    </Box>
  );
}
