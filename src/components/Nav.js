import React, { useContext, useCallback } from "react";
import { UserContext } from './App.js';
import { useHistory } from "react-router";
import { magic } from "../magic";
import { TextButton } from '@magiclabs/ui';
import logo from "../assets/magic.png"

export default function Nav(props) {
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();

  /**
  * Perform logout action via Magic.
  */
  const logout = useCallback(() => {
    magic.user.logout().then(() => {
      setUser(false);
      history.push("/login");
    })
  }, [history]);

  return (
    <>
      <nav>
        <img src={logo} height="30px" />
        {user && (
          <div>
            <TextButton color='warning' size='sm' onPress={logout}>
              Logout
            </TextButton>
          </div>
          )}
      </nav>
      <div>{props.children}</div>
    </>
  );
}

