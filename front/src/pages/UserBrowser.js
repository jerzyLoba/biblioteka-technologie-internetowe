import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Stack,
  Skeleton,
  Box,
  SimpleGrid,
  Input,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";

import { useFetch } from "../hooks/useFetch";

function UserBrowser() {
  const { response, error } = useFetch(`/users/get-users/`);
  const [filtered, setFiltered] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    const filteredResults = response?.user_info.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(filteredResults);
  }, [value]);

  useEffect(() => {
    setFiltered(response?.user_info || []);
  }, [response]);

  if (!response) {
    return (
      <Stack p="2">
        <Skeleton height="300px" />
        <Skeleton height="300px" />
        <Skeleton height="300px" />
      </Stack>
    );
  }
  return (
    <Box>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Szukaj użytkownika..."
        w="500px"
        maxW="90%"
        m="5"
      />
      <SimpleGrid minChildWidth="300px">
        {filtered.map((user, i) => (
          <LinkBox
            key={i}
            m="4"
            p="4"
            borderWidth="1px"
            borderRadius="lg"
            borderColor="teal.400"
          >
            <Box
              fontSize="xl"
              textAlign="left"
              color="gray.600"
              fontWeight="600"
            >
              <LinkOverlay to={`/dashboard/user/${user.id}`} as={RouterLink}>
                {user.name}
              </LinkOverlay>
            </Box>
            <Box fontSize="xl" textAlign="left" color="gray.400">
              {user.email}
            </Box>
          </LinkBox>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default UserBrowser;
