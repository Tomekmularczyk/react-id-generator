import React from "react";
import Input from "../components/Input";
import { setPrefix } from "../../lib";

setPrefix("test-");

const IndexPage = () => (
  <div>
    <p>
      Try to refresh page and look to the console - it&apos;s clear! <br />
      No mismatch between id&apos;s generated in server and in browser.
    </p>
    <Input />
    <Input />
    <Input />
    <Input />
  </div>
);

export default IndexPage;
