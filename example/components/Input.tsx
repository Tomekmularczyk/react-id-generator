import React from "react";
import nextId from "../../lib";

class Input extends React.Component {
  uniqueId = nextId();

  render(): JSX.Element {
    return (
      <div>
        <label htmlFor={this.uniqueId}>Input with id: {this.uniqueId}</label>
        <br />
        <input id={this.uniqueId} placeholder={this.uniqueId} />
      </div>
    );
  }
}

export default Input;
