import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

function BookEditModal({
  bookData = { title: "", author: "", isbn: "" },
  header,
  isOpen,
  handleClose,
  endpoint,
  cb,
}) {
  const [values, setValues] = useState({ ...bookData });

  const handleClick = () => {
    cb(endpoint, { ...values }).then((_) => handleClose());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal blockScrollOnMount={true} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalBody>
          <FormControl mt={4}>
            <FormLabel htmlFor="title">Tytuł</FormLabel>
            <Input
              mb="1"
              id="title"
              name="title"
              value={values.title}
              onChange={handleChange}
              valueplaceholder="tytuł"
            />
            <FormLabel htmlFor="author">Autor</FormLabel>
            <Input
              mb="1"
              id="author"
              name="author"
              value={values.author}
              onChange={handleChange}
              placeholder="autor"
            />
            <FormLabel htmlFor="isbn">ISBN</FormLabel>
            <Input
              mb="1"
              id="isbn"
              name="isbn"
              value={values.isbn}
              onChange={handleChange}
              placeholder="isbn"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleClick}>
            Zapisz
          </Button>
          <Button variant="ghost" onClick={handleClose}>
            Anuluj
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default BookEditModal;
