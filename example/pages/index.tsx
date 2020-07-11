import React from "react";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import { setPrefix } from "../../lib";

setPrefix("test-");

const IndexPage: React.FC = () => (
  <div>
    <h4>
      Try to refresh page and look to the console - it&apos;s clear! <br />
      No mismatch between id&apos;s generated in server and in browser.
    </h4>
    <Input />
    <Input />
    <Input />
    <br />
    <Checkbox />
    <Checkbox />
    <Checkbox />
  </div>
);

export default IndexPage;
