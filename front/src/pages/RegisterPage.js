import React, { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  Center,
} from "@chakra-ui/react";
import axios from "axios";

const RegisterPage = ({ setAuthed }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [secondPass, setSecondPass] = useState("");
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/auth/register", {
        name,
        email,
        password: pass,
        password2: secondPass,
      })
      .then((res) => {
        setAuthed(true);
        history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Center h="80vh">
      <Box m={2} w="500px" mx="auto" borderWidth="1px" borderRadius="xl" p="6">
        <Box
          color="gray.600"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="3xl"
        >
          Zarejestruj się
        </Box>
        <form>
          <FormControl id="name" isRequired>
            <FormLabel pt="1" fontSize="sm">
              Imię
            </FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jan"
              autoComplete="given-name"
            />
          </FormControl>
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
          <FormControl id="password-repeat" isRequired>
            <FormLabel pt="2" fontSize="sm">
              Powtórz hasło
            </FormLabel>
            <Input
              type="password"
              value={secondPass}
              onChange={(e) => setSecondPass(e.target.value)}
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
            Zarejestruj się
          </Button>
        </form>
        <Link as={RouterLink} to="/login">
          Masz konto? Zaloguj się
        </Link>
      </Box>
    </Center>
  );
};

export default RegisterPage;
