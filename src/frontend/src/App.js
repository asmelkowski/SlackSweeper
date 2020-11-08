import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  ThemeProvider,
  useDisclosure,
} from "@chakra-ui/core";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Channel from "./routes/Channel";
import Channels from "./routes/Channels";
import Manage from "./routes/Manage";
import User from "./routes/User";
import Users from "./routes/Users";
import Whitelist from "./routes/Whitelist";
import WhitelistCreate from "./routes/WhitelistCreate";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Button ref={btnRef} variantColor="teal" onClick={onOpen}>
            Open
          </Button>
          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />

              <DrawerBody>
                <nav>
                  <ul>
                    <li>
                      <Link to="/channels">Channels</Link>
                    </li>
                    <li>
                      <Link to="/create-whitelist">Create Whitelist</Link>
                    </li>
                    <li>
                      <Link to="/users">Users</Link>
                    </li>
                    <li>
                      <Link to="/manage">Manage</Link>
                    </li>
                  </ul>
                </nav>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </div>
        <Switch>
          <Route path="/users/:slack_id" children={<User />} />
          <Route path="/users" children={<Users />} />
          <Route path="/whitelists/:id" children={<Whitelist />} />
          <Route path="/create-whitelist" children={<WhitelistCreate />} />
          <Route path="/channels/:slack_id" children={<Channel />} />
          <Route path="/channels" children={<Channels />} />
          <Route path="/manage" children={<Manage />} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
