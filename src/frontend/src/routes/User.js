/* eslint-disable no-unused-vars */
import { Avatar, Box, Flex } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils";

export default function User() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);

  const { slack_id } = useParams();

  useEffect(() => {
    fetchData(`http://localhost:8000/users/${slack_id}/`, setUser, setLoading);
  }, [slack_id]);

  return (
    <Flex direction="row" justify="space-evenly" align="center" width="100%">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Box
          key={user.slack_id}
          textAlign="center"
          textDecoration="none"
          color="inherit"
        >
          <Avatar size="2md" name={user.name} src={user.avatar} />
          <h3>{user.name}</h3>
        </Box>
      )}
    </Flex>
  );
}
