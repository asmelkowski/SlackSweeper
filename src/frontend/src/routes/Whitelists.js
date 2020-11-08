import { Box, Flex, Link } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import { fetchData } from "../utils";

export default function Whitelists() {
  const [loading, setLoading] = useState(true);
  const [whitelists, setWhitelists] = useState([]);
  const [users, setUsers] = useState([]);

  const getUserBySlackId = (slack_id) => {
    return users.find((user) => user.slack_id === slack_id);
  };

  useEffect(() => {
    fetchData("http://localhost:8000/whitelists/", setWhitelists);
    fetchData("http://localhost:8000/users/", setUsers, setLoading);
  }, []);

  return (
    <Flex justify="space-evenly" align="center">
      {loading ? (
        <div>Loading...</div>
      ) : (
        whitelists.map((whitelist) => {
          return (
            <Link
              as={ReactLink}
              to={"/whitelists/" + whitelist.id}
              color="inherit"
            >
              <Box key={whitelist.id} textAlign="center" bg="Red">
                <h3>{whitelist.name}</h3>
                <Flex direction="column" bg="Yellow">
                  {whitelist.users.map((user) => {
                    return <div>{getUserBySlackId(user).name}</div>;
                  })}{" "}
                </Flex>
              </Box>
            </Link>
          );
        })
      )}
    </Flex>
  );
}
