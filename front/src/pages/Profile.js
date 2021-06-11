import React from "react";
import { Box, Badge, Center, Divider, Button } from "@chakra-ui/react";

import TransactionHistory from "../components/TransactionHistory";

function Profile() {
  return (
    <Center>
      <Box m="2">
        <Box
          textAlign="left"
          p="3"
          fontWeight="600"
          fontSize="3xl"
          color="teal.600"
        >
          Twoja historia
        </Box>
        <TransactionHistory url={`/transactions/get-profile`} />
      </Box>
    </Center>
  );
}

export default Profile;
