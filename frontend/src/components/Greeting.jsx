import React from "react";

export default function Greeting({ username }) {
  return (
    <div className="greetings">
      <h1>Welcome Back, {username}!</h1>
      <h4>Here's a quick view of your updates</h4>
    </div>
  );
}
