import React, { useState, useEffect, useContext } from "react";
import {
  SimpleGrid,
  Container,
  Box,
  Button,
  Input,
  Flex,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";

import AdminContext from "../AdminContext";
import BookEditModal from "../components/BookEditModal";
import { useFetch } from "../hooks/useFetch";

function BrowseBooks({ match }) {
  const isAdmin = useContext(AdminContext);
  const [filtered, setFiltered] = useState([]);
  const [value, setValue] = useState("");
  const [added, setAdded] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { response, error } = useFetch("/books", null, [isOpen, added]);
  const toast = useToast();

  useEffect(() => {
    const filteredResults = response?.books.filter((item) =>
      item.title.toLowerCase().includes(value.toLocaleLowerCase())
    );
    setFiltered(filteredResults);
  }, [value]);

  useEffect(() => {
    setFiltered(response?.books || []);
  }, [response]);

  const addRequest = async (endpoint, data) => {
    axios
      .post(endpoint, data)
      .then((res) => {
        toast({
          title: "Książka została dodana",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setAdded(true);
      })
      .catch((err) => {
        toast({
          title: err.response.data,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  if (!response) {
    return null;
  }

  return (
    <Box>
      {isOpen && (
        <BookEditModal
          header="Dodaj ksiązkę"
          isOpen={isOpen}
          handleClose={onClose}
          endpoint="/books/create"
          cb={addRequest}
        />
      )}
      <Flex justifyContent="center" alignItems="center">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Szukaj książki..."
          w="500px"
          maxW="90%"
          m="5"
        />
        {isAdmin && (
          <Button colorScheme="green" onClick={onOpen}>
            Dodaj
          </Button>
        )}
      </Flex>
      <SimpleGrid minChildWidth="450px" p="3" spacing={4}>
        {filtered.map((item, i) => (
          <Container mt="3" borderWidth="1px" borderRadius="lg" p="3" key={i}>
            <Box d="flex" alignItems="baseline">
              <Box>
                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  fontSize="xl"
                  lineHeight="tight"
                  isTruncated
                  textAlign="left"
                >
                  <Link to={`/dashboard/book/${item.id}`}>{item.title}</Link>
                </Box>
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  textAlign="left"
                >
                  {item.author}
                </Box>
              </Box>
            </Box>
          </Container>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default BrowseBooks;
