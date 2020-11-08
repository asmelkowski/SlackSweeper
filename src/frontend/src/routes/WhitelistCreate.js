import {
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Input,
  useToast,
} from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { fetchData } from "../utils";

export default function WhitelistCreate() {
  const [loading, setLoading] = useState(true);
  const [whitelists, setWhitelists] = useState([]);
  const [users, setUsers] = useState([]);
  const [whitelistName, setWhitelistName] = useState(false);
  const [userFilter, setUserFilter] = useState("");
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [whitelistNameInvalid, setWhitelistNameInvalid] = useState(false);
  const toast = useToast();

  const showToast = (msg, success = true) => {
    toast({
      title: "",
      description: msg,
      status: success ? "success" : "error",
      duration: 9000,
      isClosable: true,
    });
  };

  const handleWhitelistNameInput = (e) => {
    let validity_check = whitelists.find(
      (whitelist) => whitelist.name === e.target.value
    );
    if (!validity_check) {
      setWhitelistName(e.target.value);
    } else {
      setWhitelistNameInvalid(true);
      showToast("This name is already taken!", false);
    }
  };

  const handleUserFilterInput = (e) => {
    setUserFilter(e.target.value);
  };

  const handleCheckedUsers = (e) => {
    setCheckedUsers(e);
  };

  const submitChanges = () => {
    setIsSubmitting(true);
    const body = {
      name: whitelistName,
      users: checkedUsers,
    };
    fetch("http://localhost:8000/whitelists/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 200) {
          setIsSubmitting(false);
          showToast("Successfuly created whitelist!");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData("http://localhost:8000/whitelists/", setWhitelists);
    fetchData("http://localhost:8000/users/", setUsers, setLoading);
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Flex justify="center" align="center">
          <Flex direction="column" align="center">
            <Input
              placeholder="Whitelist name"
              onChange={handleWhitelistNameInput}
              errorBorderColor="Red"
              isInvalid={whitelistNameInvalid}
            />
            <Input
              placeholder="Filter users"
              onChange={handleUserFilterInput}
            />
            <CheckboxGroup variantColor="green" onChange={handleCheckedUsers}>
              {users
                .filter((user) =>
                  user.name.toLowerCase().includes(userFilter.toLowerCase())
                )
                .map((user) => {
                  return (
                    <Checkbox key={user.slack_id} value={user.slack_id}>
                      {user.name}
                    </Checkbox>
                  );
                })}
            </CheckboxGroup>
            <Button onClick={submitChanges} isSubmitting={isSubmitting}>
              Submit
            </Button>
          </Flex>
        </Flex>
      )}
    </div>
  );
}
