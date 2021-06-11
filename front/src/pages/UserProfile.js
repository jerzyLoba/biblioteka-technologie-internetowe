import React, { useContext } from "react";
import { Box, Center, Button } from "@chakra-ui/react";

import AdminContext from "../AdminContext";
import TransactionHistory from "../components/TransactionHistory";
import { useFetch } from "../hooks/useFetch";
import ReactiveButton from "../components/ReactiveButton";
import axios from "axios";

function UserProfile({ match }) {
  const isAdmin = useContext(AdminContext);
  const { response: user, error } = useFetch(
    `/transactions/get-user/${match.params.id}`
  );

  if (!user) {
    return <div>wait...</div>;
  }

  return (
    <Box>
      <Box ml="12">
        <Box textAlign="left" fontWeight="600" fontSize="2xl" color="teal.600">
          {user.user_info?.name}
        </Box>
        <Box textAlign="left" fontWeight="600" fontSize="md" color="gray.400">
          {user.user_info?.email}
        </Box>
      </Box>
      <Center>
        <TransactionHistory
          url={`/transactions/get-user/${match.params.id}`}
          button={ReactiveButton}
          cb={(bookId) =>
            axios.post(`/transactions/return/${bookId}`, {
              user_id: user.user_info?.id,
            })
          }
        />
      </Center>
    </Box>
  );
}

export default UserProfile;
