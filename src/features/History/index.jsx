import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Text,
  Spinner,
} from "@chakra-ui/react";
import historyHooks from "./hooks";

export default function HistoryPage() {
  const { transactionHistory, isLoading } = historyHooks();
  // console.log(transactionHistory);

  return (
    <Box p="30px">
      <Text fontSize={{ base: "16px", lg: "20px" }} pb="30px" fontWeight={600}>
        History
      </Text>
      {isLoading ? (
        <Spinner />
      ) : transactionHistory?.data.length > 0 ? (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th isNumeric>Amount to Exchange</Th>
                <Th isNumeric>Amount to Receive</Th>
                <Th>Pair Exchanged</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactionHistory?.data?.map((txn) => (
                <Tr key={txn.id}>
                  <Td isNumeric>
                    {txn.amountToExchange.toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                    })}
                  </Td>
                  <Td isNumeric>
                    {txn.amountToReceive.toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                    })}
                  </Td>
                  <Td>{txn.pairExchanged}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Text>You have not yet made a transaction</Text>
      )}
    </Box>
  );
}
