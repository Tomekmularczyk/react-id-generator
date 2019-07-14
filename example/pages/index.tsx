import React from "react";
import Input from "../components/Input";

export default () => (
  <div>
    <p>
      Try to refresh page and look to the console - it's clear! <br />
      No mismatch between id's generated in server and in browser.
    </p>
    <Input />
    <Input />
    <Input />
    <Input />
  </div>
);
