import React, { useEffect, useContext } from "react";
import { UserContext } from './App.js';
import { useHistory } from "react-router";
import { magic } from "../magic";
import Loading from "./Loading";

export default function Callback() {
  const history = useHistory();
  const [, setUser] = useContext(UserContext);

  useEffect(() => {
    // On mount, we try to login with a Magic credential in the URL query.
    magic.auth.loginWithCredential().finally(() => {
      magic.user.getMetadata().then(setUser);
      history.push("/profile");
    });
  }, []);

  return <Loading />;
}

