import React, { useEffect, useContext } from "react";
import axios from "axios";
import { Switch, Route, Link as RouterLink, Redirect } from "react-router-dom";
import { Box, Link, Flex, Button } from "@chakra-ui/react";
import styled from "@emotion/styled";

import AdminContext from "../AdminContext";
import BrowseBooks from "./BrowseBooks";
import Profile from "./Profile";
import BookPage from "./BookPage";
import UserProfile from "./UserProfile";
import PrivateRoute from "../components/PrivateRoute";
import UserBrowser from "./UserBrowser";

function Dashboard({ setAuthed, match, ...props }) {
  const isAdmin = useContext(AdminContext);
  const logOut = () => {
    axios
      .get("/auth/log-out")
      .then((res) => {
        setAuthed(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box>
      <Box w="100%" h="60px" bgColor="teal" pos="fixed" top="0" zIndex="2">
        <Flex h="100%" alignItems="center" justifyItems="space-between">
          <Box color="#fff" fontSize="xl" ml="4">
            Biblioteczka
          </Box>
          <Wrap>
            {isAdmin && (
              <Link to={`${match.path}/user/browse`} as={RouterLink}>
                użytkownicy
              </Link>
            )}
            <Link to={`${match.path}/browse-books`} as={RouterLink}>
              przeglądaj książki
            </Link>
            <Link to={`${match.path}/profile`} as={RouterLink}>
              profil
            </Link>
            <Button onClick={logOut}>Wyloguj się</Button>
          </Wrap>
        </Flex>
      </Box>
      <Box mt="80px">
        <Switch>
          <PrivateRoute
            authed={true}
            path={`${match.path}/user/browse`}
            redirect={`${match.path}/profile`}
            component={UserBrowser}
          />
          <PrivateRoute
            authed={isAdmin}
            path={`${match.path}/user/:id`}
            redirect={`${match.path}/profile`}
            component={UserProfile}
          />
          <Route path={`${match.path}/book/:id`} component={BookPage} />
          <Route path={`${match.path}/browse-books`} component={BrowseBooks} />
          <Route path={`${match.path}/profile`} component={Profile} />
          <Route exact path={`${match.path}`}>
            <Redirect to={`${match.path}/profile`} />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-self: center;
  align-items: center;
  flex-grow: 1;
  height: 100%;
  margin-left: auto;
  max-width: 500px;
  a {
    display: block;
    color: white;
    font-size: 15px;
    font-weight: 500;
    &:hover {
      text-decoration: none;
      color: pink;
      transition: color 200ms ease-out;
    }
  }
`;

export default Dashboard;
