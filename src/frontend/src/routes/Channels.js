import { Flex, Link } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import { fetchData } from "../utils";

export default function Channels() {
  const [loading, setLoading] = useState(true);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    fetchData("http://localhost:8000/channels/", setChannels, setLoading);
  }, []);

  return (
    <Flex wrap="wrap" direction="row" justify="center">
      {loading ? (
        <div>Loading...</div>
      ) : (
        channels.map(({ name, slack_id, whitelist }) => {
          return (
            <Link as={ReactLink} to={"/channels/" + slack_id} color="inherit">
              <Flex p="55px" align="center" justify="center" direction="column">
                <div>Name: {name}</div>
                <div>
                  Whitelist: {whitelist.length !== 0 ? whitelist : "empty..."}
                </div>
              </Flex>
            </Link>
          );
        })
      )}
    </Flex>
  );
}
