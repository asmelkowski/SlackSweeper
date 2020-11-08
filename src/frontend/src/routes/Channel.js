import { Flex } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils";

export default function Channels() {
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState([]);
  const [users, setUsers] = useState([]);

  const { slack_id } = useParams();

  const getUserBySlackId = (slack_id) => {
    return users.find((user) => user.slack_id === slack_id);
  };

  useEffect(() => {
    fetchData(
      `http://localhost:8000/channels/${slack_id}`,
      setChannel,
      setLoading
    );
    fetchData("http://localhost:8000/users/", setUsers);
  }, [slack_id]);

  return (
    <Flex wrap="wrap" direction="row" justify="center">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Flex padding="5px" align="center" justify="center" direction="column">
          <div>Name: {channel.name}</div>
          <div>
            Whitelist:
            {channel.whitelist.length !== 0
              ? channel.whitelist.map((user) => getUserBySlackId(user).name)
              : "empty..."}
          </div>
        </Flex>
      )}
    </Flex>
  );
}
