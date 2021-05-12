import React, { useContext } from "react";
import { UserContext } from './App.js';
import Loading from "./Loading";

export default function Profile() {
  const [user] = useContext(UserContext);

  return user ? 
    <div className="container">
      <h1>Profile</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div> : 
    <Loading />;
}

