import React, { useState, createContext, useEffect } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { magic } from "../magic";

// Views
import Nav from "./Nav";
import Login from "./Login";
import Callback from "./Callback";
import Profile from "./Profile";

// Create a context to store the user across all components in the app
export const UserContext = createContext(null);

export default function App() {
  const [user, setUser] = useState();

  // On mount, we check if a user is logged in.
  // If so, we'll retrieve the authenticated user's profile.
  useEffect(() => {
    magic.user.isLoggedIn().then(magicIsLoggedIn => {
      magicIsLoggedIn && magic.user.getMetadata().then(setUser);
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <UserContext.Provider value={[user, setUser]}>
            <Nav>
              <Route path='/login' component={Login} />
              <Route path='/profile' component={Profile} />
              <Route path='/callback' component={Callback} />
            </Nav>
          </UserContext.Provider>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

