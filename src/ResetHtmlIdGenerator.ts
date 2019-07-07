import React from "react";
import { resetId, setGlobalPrefix } from "./nextId";

/*
  put it on root of the app to reset id on each app render.
  (otherwise server would keep increasing it with each request
  and cause client-server markup mismatch)
*/

interface Props {
  prefix?: string;
}

class ResetHtmlIdGenerator extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    resetId();
    if (props.prefix) {
      if (typeof props.prefix !== "string")
        throw new Error("prefix should be of string type");
      setGlobalPrefix(props.prefix);
    }
  }

  render() {
    return null;
  }
}

export default ResetHtmlIdGenerator;
