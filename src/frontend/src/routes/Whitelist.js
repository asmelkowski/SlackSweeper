import { Box, Flex } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils";

export default function Whitelist() {
  const [loading, setLoading] = useState(true);
  const [whitelist, setWhitelist] = useState([]);
  const [users, setUsers] = useState([]);

  const { id } = useParams();

  const getUserBySlackId = (slack_id) => {
    return users.find((user) => user.slack_id === slack_id);
  };

  useEffect(() => {
    fetchData(
      `http://localhost:8000/whitelists/${id}/`,
      setWhitelist,
      setLoading
    );
    fetchData("http://localhost:8000/users/", setUsers);
  }, [id]);

  return (
    <Flex justify="space-evenly" align="center">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Box key={whitelist.id} textAlign="center" bg="Red">
          <h3>{whitelist.name}</h3>
          <Flex direction="column" bg="Yellow">
            {whitelist.users.map((user) => {
              return <div>{getUserBySlackId(user).name}</div>;
            })}
          </Flex>
        </Box>
      )}
    </Flex>
  );
}
