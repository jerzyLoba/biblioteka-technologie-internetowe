import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  Link,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import axios from "axios";

function Login({ setAuthed }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/auth/login", {
        email,
        password: pass,
      })
      .then((res) => {
        setAuthed(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Center h="80vh">
      <Box w="500px" mx="auto" borderWidth="1px" borderRadius="xl" p="6">
        <Box
          color="gray.600"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="3xl"
        >
          Zaloguj się
        </Box>
        <form>
          <FormControl id="email" isRequired>
            <FormLabel pt="2" fontSize="sm">
              Adres e-mail
            </FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              autoComplete="email"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel pt="2" fontSize="sm">
              Hasło
            </FormLabel>
            <Input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              autoComplete="new-password"
            />
          </FormControl>
          <Button
            colorScheme="teal"
            size="md"
            type="submit"
            mt="4"
            onClick={handleSubmit}
          >
            Zaloguj się
          </Button>
        </form>
        <Link as={RouterLink} to="/register">
          Nie masz konta? Zarejestruj się
        </Link>
      </Box>
    </Center>
  );
}

export default Login;
