import React, { Component } from "react";

class Option extends Component {
  clickHandler = path => {
    this.props.clickHandler(this.props.path);
  };

  render() {
    return (
      <div
        className="c-option"
        path={this.props.name}
        onClick={this.clickHandler}
      >
        <h2>{this.props.label}</h2>
        <h3>{this.props.desc}</h3>
      </div>
    );
  }
}

export default Option;
