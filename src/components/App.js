import React, { useState, createContext, useEffect } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { magic } from "../magic";

// Views
import Nav from "./Nav";
import Login from "./Login";
import Callback from "./Callback";
import Profile from "./Profile";

// Create a context to store the user, to be shared across all components
export const UserContext = createContext(null);

export default function App() {
  const [user, setUser] = useState(null);
  
  // If user is logged in, we'll retrieve the authenticated user's profile.
  // Otherwise redirect to /login
  useEffect(() => {
    magic.user.isLoggedIn().then(magicIsLoggedIn => {
      if (magicIsLoggedIn) {
        magic.user.getMetadata().then(setUser)
      } else {
        // Don't redirect on mount of /login or /callback as user is expected to not be logged in yet here
        if (window.location.pathname !== "/login" && window.location.pathname !== "/callback") {
          window.location.href = new URL("/login", window.location.origin).href
        }
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <UserContext.Provider value={[user, setUser]}>
          <Nav>
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/callback' component={Callback} />
              <Route exact path='*' component={Profile} />
            </Switch>
          </Nav>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

