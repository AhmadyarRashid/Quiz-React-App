import React, { Component } from "react";

class SplashScreen extends Component {
  render() {
    return (
      <div className="c-splashscreen">
        <div className="c-splashscreen__intro">
          <h1>Quiz</h1>
          <h2>Quiz Tag</h2>
          <p>This is an overview of the quiz</p>
        </div>
        <div className="c-options">  
          <p>Topics:</p>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default SplashScreen;
