import {
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Input,
  InputGroup,
  Select,
  useToast,
} from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { fetchData, getChannelBySlackId, getUserBySlackId } from "../utils";

export default function Manage() {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [channels, setChannels] = useState([]);
  const [users, setUsers] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [whitelists, setWhitelists] = useState([]);
  const [userInput, setUserInput] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [whitelistInput, setwhitelistInput] = useState("");
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const showToast = (msg, success = true) => {
    toast({
      title: "",
      description: msg,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };
  const handleChannelInput = (event) => {
    setSelectedChannel(event.target.value);
    let channel = getChannelBySlackId(event.target.value, channels);
    if (channel && channel.whitelist.length !== 0) {
      setCheckedUsers(
        checkedUsers.concat(
          channel.whitelist.filter((item) => checkedUsers.indexOf(item) < 0)
        )
      );
    } else {
      setCheckedUsers([]);
    }
  };

  const checkedUsersHandler = (event) => {
    try {
      setCheckedUsers(
        checkedUsers.concat(
          event.target.value
            .split(",")
            .filter((item) => checkedUsers.indexOf(item) < 0)
        )
      );
    } catch (error) {
      if (error instanceof TypeError) {
        setCheckedUsers(event);
      } else {
        throw error;
      }
    }
  };

  const submitChanges = () => {
    if (selectedChannel !== null) {
      setIsSubmitting(true);
      const body = {
        whitelist: checkedUsers,
      };
      fetch(`http://localhost:8000/channels/${selectedChannel}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (response.status === 200) {
            setIsSubmitting(false);
            showToast("Successfuly updated channel whitelist!");
            fetchData(
              "http://localhost:8000/channels/",
              setChannels,
              setLoading
            );
          }
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    fetchData("http://localhost:8000/users/", setUsers);
    fetchData("http://localhost:8000/whitelists/", setWhitelists);
    fetchData("http://localhost:8000/channels/", setChannels, setLoading);
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Flex direction="column" justify="space-evenly" align="center" w="100%">
          <Flex justify="center" w="100%">
            <Flex direction="column" w="50%">
              <InputGroup>
                <Input placeholder="Filter users" onChange={handleUserInput} />
                <Input
                  placeholder="Select whitelist"
                  onChange={checkedUsersHandler}
                  list="whitelists-list"
                />
                <datalist id="whitelists-list">
                  {whitelists.map((whitelist) => {
                    return (
                      <option value={whitelist.users}>{whitelist.name}</option>
                    );
                  })}
                </datalist>
              </InputGroup>
              <CheckboxGroup
                variantColor="green"
                value={checkedUsers}
                onChange={checkedUsersHandler}
              >
                {users
                  .filter((user) =>
                    user.name.toLowerCase().includes(userInput.toLowerCase())
                  )
                  .map((user) => {
                    return (
                      <Checkbox value={user.slack_id}>{user.name}</Checkbox>
                    );
                  })}
              </CheckboxGroup>
            </Flex>
            <Flex direction="column" flex="1 1 50%">
              <InputGroup>
                <Select
                  placeholder="Select channel"
                  onChange={handleChannelInput}
                >
                  {channels.map((channel) => {
                    return (
                      <option value={channel.slack_id}>{channel.name}</option>
                    );
                  })}
                </Select>
              </InputGroup>
              <Flex direction="column">
                {selectedChannel !== null
                  ? getChannelBySlackId(selectedChannel, channels)
                    ? getChannelBySlackId(
                        selectedChannel,
                        channels
                      ).whitelist.map((user) => {
                        return <div>{getUserBySlackId(user, users).name}</div>;
                      })
                    : null
                  : null}
              </Flex>
            </Flex>
          </Flex>
          <Button isLoading={isSubmitting} onClick={submitChanges}>
            Submit
          </Button>
        </Flex>
      )}
    </div>
  );
}
