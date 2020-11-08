/* eslint-disable no-unused-vars */
import { Avatar, Box, Flex, Link } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import { fetchData } from "../utils";

export default function Users() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData("http://localhost:8000/users/", setUsers, setLoading);
  }, []);

  return (
    <Flex direction="row" justify="space-evenly" align="center" width="100%">
      {loading ? (
        <div>Loading...</div>
      ) : (
        users.map((user) => {
          return (
            <Link as={ReactLink} to={"/users/" + user.slack_id} color="inherit">
              <Box
                key={user.slack_id}
                textAlign="center"
                textDecoration="none"
                color="inherit"
              >
                <Avatar size="2md" name={user.name} src={user.avatar} />
                <h3>{user.name}</h3>
              </Box>
            </Link>
          );
        })
      )}
    </Flex>
  );
}
