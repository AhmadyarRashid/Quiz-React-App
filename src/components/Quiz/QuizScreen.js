import React, { Component } from "react";
import QuizSection from "./Section/Section";

// Require context image folder
const getImages = require.context("../../../public/images", true);

class QuizScreen extends Component {
  state = {
    data: this.props.options,
    step: 0
  };

  getHero(type) {
    const step = this.state.step;
    const showHero = this.state.data[step].heroImage;
    const showHeroClass = this.state.data[step].heroClassOverride;
    const blankImg = "./empty.png";

    if (type === "src") {
      if (showHero !== "" && showHero !== undefined && showHero !== undefined) {
        return getImages(showHero);
      } else {
        return getImages(blankImg);
      }
    }

    if (type === "class") {
      let heroClass = "hidden";
      if (showHero !== "") {
        if (
          showHeroClass !== "" &&
          showHeroClass !== undefined &&
          showHeroClass !== undefined
        ) {
          heroClass = "hero " + showHeroClass;
        } else {
          heroClass = "hero"; //this needs to be a global varible
        }
        return heroClass;
      }
    }
  }

  handleFieldChange = checkedBox => {
    this.setState({ isChecked: checkedBox });
  };

  nextStep = () => {

    const step = this.state.step;
    const data = this.state.data;

    console.log(this.state.data)
    if (this.state.step < data.length) {

      this.setState({
        step: step + 1
      });
    }

    if (this.state.step + 1 === data.length) {
     this.setState({
        step: 0
      });
    }
  };

  backStep = () => {
    const step = this.state.step;
    const data = this.state.data;

    console.log(this.state.data)
    if (this.state.step > 1) {

      this.setState({
        step: step - 2
      });
    }

  };

  render() {
    const step = this.state.step;
    const firstScreen = this.state.data;

    return (
      <div className="c-quiz-screen">
        <div className="c-quiz-screen__intro">
          <img
            className={this.getHero("class")}
            alt=""
            src={this.getHero("src")}
          ></img>
        </div>
        <div className="c-quiz-screen__options">
          <h1>{this.state.data[step].heading}</h1>
          <QuizSection data={firstScreen[step]} step={step} backClick={this.backStep} clicked={this.nextStep} />
        </div>
      </div>
    );
  }
}

// {this.props.options.map((section, sectionIndex) => {
//   return <QuizSection data={section} key={"k_" + sectionIndex} />;
// })}

export default QuizScreen;
