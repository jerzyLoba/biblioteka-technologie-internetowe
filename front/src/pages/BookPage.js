import React, { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Badge,
  Center,
  Divider,
  Button,
  Stack,
  Skeleton,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import AdminContext from "../AdminContext";
import TransactionHistory from "../components/TransactionHistory";
import BookEditModal from "../components/BookEditModal";
import { useFetch } from "../hooks/useFetch";

function BookPage({ match }) {
  const [borrowed, setBorrowed] = useState(false);
  const isAdmin = useContext(AdminContext);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDialogOpen,
    onOpen: onDialogOpen,
    onClose: onDialogClose,
  } = useDisclosure();
  const cancelRef = React.useRef();
  const history = useHistory();

  const { response: book, error } = useFetch(
    `/books/${match.params.id}`,
    null,
    [isOpen, borrowed]
  );

  const handleBorrow = async () => {
    try {
      const res = await axios.get(`/transactions/borrow/${match.params.id}`);
      toast({
        title: "Ksiażka została wypożyczona",
        description: "życzymy miłego czytania",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setBorrowed(true);
    } catch (err) {
      toast({
        title: err.response.data,
        description: "oddaj przynajmniej jedną książkę",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const editRequest = async (endpoint, data) => {
    axios
      .put(endpoint, data)
      .then((res) => {
        toast({
          title: "Książka została zaktualizowana",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
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

  const handleDelete = () => {
    axios
      .delete(`/books/delete/${book.id}`)
      .then((_) => {
        toast({
          title: "Książka została usunięta",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onDialogClose();
        history.push("/dashboard/browse-books");
      })
      .catch((err) => {
        toast({
          title: err.response.data,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      });
  };

  if (!book) {
    return (
      <Stack p="2">
        <Skeleton height="300px" />
        <Skeleton height="300px" />
        <Skeleton height="300px" />
      </Stack>
    );
  }

  return (
    <Center p="4" d="flex" flexDir="column">
      <Box w="90%" maxW="100%" mb="3" d="flex" flexDir="row">
        {isAdmin && (
          <>
            <Button
              color="#fff"
              mr="3"
              colorScheme="red"
              onClick={onDialogOpen}
            >
              Usuń
            </Button>
            <Button colorScheme="blue" onClick={onOpen}>
              Edytuj
            </Button>
          </>
        )}
        {isOpen && (
          <BookEditModal
            bookData={{
              title: book.title,
              author: book.author,
              isbn: book.isbn,
            }}
            header="Edytuj ksiązkę"
            isOpen={isOpen}
            handleClose={onClose}
            endpoint={`/books/update/${book.id}`}
            cb={editRequest}
          />
        )}
        <Button
          color="teal.500"
          disabled={!book.returned}
          onClick={handleBorrow}
          ml="auto"
        >
          Wypożycz
        </Button>
      </Box>
      <Box
        w="90%"
        maxW="100%"
        p="2"
        borderWidth="1px"
        borderRadius="lg"
        d="flex"
        flexDir="column"
        alignItems="flex-start"
      >
        <Badge borderRadius="full" px="2" colorScheme="gray">
          Informacje o ksiązce
        </Badge>
        <Box mt="3" ml="2" fontWeight="bold" as="h2" fontSize="2xl">
          {book.title}
        </Box>
        <Box ml="2" fontSize="sm">
          {book.author}
        </Box>
        <Box mt="1" mb="2" ml="2" fontSize="md" fontWeight="semibold">
          ISBN: {book.isbn}
        </Box>
        <Divider />
        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
          mt="2"
          ml="2"
        >
          Status
          <Badge
            ml="3"
            borderRadius="full"
            px="2"
            colorScheme={book.returned ? "teal" : "red"}
          >
            {book.returned ? "Dostępna" : "Niedostępna"}
          </Badge>
        </Box>
      </Box>
      {isAdmin && (
        <TransactionHistory
          books
          url={`/transactions/get-book/${match.params.id}`}
        />
      )}
      <AlertDialog isOpen={isDialogOpen} onClose={onDialogClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Usuń książkę
            </AlertDialogHeader>
            <AlertDialogBody>
              Jesteś pewien? Tej operacji nie mozna cofnąć!
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDialogClose}>
                Anuluj
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Usuń
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Center>
  );
}

export default BookPage;
