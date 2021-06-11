import React from "react";
import {
  Box,
  Badge,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

import { useFetch } from "../hooks/useFetch";

function TransactionHistory({
  url,
  button: ButtonComponent,
  cb = () => {},
  books,
}) {
  const { response, error } = useFetch(url);
  if (!response) {
    return null;
  }

  const handleBookReturn = (id) => cb(id);

  return (
    <Box
      w="90%"
      maxW="100%"
      p={[2, 4]}
      borderWidth="1px"
      borderRadius="lg"
      d="flex"
      flexDir="column"
      alignItems="flex-start"
      mt="4"
    >
      <Badge borderRadius="full" px="2" colorScheme="blue">
        Historia wypoyczeń
      </Badge>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>id ucznia</Th>
            {books || <Th>Tytuł</Th>}
            <Th>data wypozyczenia</Th>
            <Th>data oddania</Th>
          </Tr>
        </Thead>
        <Tbody>
          {response.history.map((item, i) => (
            <Tr key={i}>
              <Td>{item.user_id}</Td>
              {item.title && <Td>{item.title}</Td>}
              <Td>
                {format(new Date(item.date_of_rental), "dd MMM yyyy", {
                  locale: pl,
                })}
              </Td>
              <Td>
                {format(new Date(item.date_of_return), "dd MMM yyyy", {
                  locale: pl,
                })}
              </Td>
              {ButtonComponent && (
                <Td>
                  {item.returned || (
                    <ButtonComponent
                      onClick={() => handleBookReturn(item.book_id)}
                    >
                      oddaj
                    </ButtonComponent>
                  )}
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>id ucznia</Th>
            {books || <Th>Tytuł</Th>}
            <Th>data wypozyczenia</Th>
            <Th>data oddania</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  );
}

export default TransactionHistory;
