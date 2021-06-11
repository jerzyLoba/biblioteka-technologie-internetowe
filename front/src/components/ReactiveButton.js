import React, { useState, useEffect } from "react";
import { Button, useToast } from "@chakra-ui/react";

function ReactiveButton({ onClick: cb, children }) {
  const [disabled, setDisabled] = useState(false);
  const toast = useToast();

  const handleClick = async () => {
    try {
      const response = await cb();
      if (response) {
        setDisabled(true);
        toast({
          title: "Książka została oddana",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: err.response.data,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Button disabled={disabled} onClick={handleClick} colorScheme="green">
      {children}
    </Button>
  );
}

export default ReactiveButton;
