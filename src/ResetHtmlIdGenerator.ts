import React from "react";
import { resetId, setGlobalPrefix } from "./nextId";

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
