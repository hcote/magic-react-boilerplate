import React, { useCallback, useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { UserContext } from './App.js';
import { magic } from "../magic";
import { CallToAction } from '@magiclabs/ui';

export default function Login() {
  const [user, setUser] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const history = useHistory();

  /* Redirect if user is already logged in */
  useEffect(() => {
    user && history.push('/');
  }, [user])

  /**
   * Perform login action via Magic's passwordless flow. Upon successuful
   * completion of the login flow, a user is redirected to the homepage.
   */
  const login = useCallback(async () => {
    setIsLoggingIn(true);

    try {
      await magic.auth.loginWithMagicLink({
        email,
        redirectURI: new URL("/callback", window.location.origin).href,
      });
      magic.user.getMetadata().then(setUser);
      history.push("/");
    } catch {
      setIsLoggingIn(false);
    }
  }, [email]);

  /**
   * Saves the value of our email input into component state.
   */
  const handleInputOnChange = useCallback(event => {
    setEmail(event.target.value);
  }, []);

  return (
    <div className="form">
        <h2>Sign up or Login</h2>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={handleInputOnChange}
          disabled={isLoggingIn}
        />
        <div className="submit-btn">
          <CallToAction
            color='primary'
            size='sm'
            onClick={login} 
            disabled={isLoggingIn}
          >
            Login
          </CallToAction>
        </div>
    </div>
  );
}

