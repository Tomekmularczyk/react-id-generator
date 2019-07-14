import React from "react";
import getId from "../../lib";

class Input extends React.Component {
  uniqueId = getId();

  render() {
    return (
      <div>
        <input id={this.uniqueId} defaultValue={this.uniqueId} />
        <label htmlFor={this.uniqueId}> label for input {this.uniqueId}</label>
      </div>
    );
  }
}

export default Input;
