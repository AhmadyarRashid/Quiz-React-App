import React, {Component} from "react";
// import Aux from "./hoc/Aux/Aux.js";
import SplashScreen from "./components/Quiz/SplashScreen";
import Option from "./components/Quiz/Option/Option";
import QuizScreen from "./components/Quiz/QuizScreen";
import {connect} from 'react-redux';
import {quizAction} from './actions/quizActions';

class App extends Component {

    quizAction = (event) => {
        this.props.quizAction();
    };


    state = {
        showLanding: true,
        showQuiz1: false,
        showQuiz2: false
    };

    pathHandler = path => {
        if (path === "Quiz1") {
            this.setState({
                showLanding: false,
                showQuiz1: true,
                showQuiz2: false
            });
        }
        if (path === "Quiz2") {
            this.setState({
                showLanding: false,
                showQuiz1: false,
                showQuiz2: true
            });
        }
    };

    render() {
        const data = [
            {name: "Quiz1", label: "Quiz Path 1", desc: "Description of Path 1"},
            {name: "Quiz2", label: "Quiz Path 2", desc: "Description of Path 2"},
        ];

        const Quiz1 = [
            {
                number: 1,
                heading: "What’s been happening?",
                isQuestion: true,
                heroImage: "./quiz1/hero/q1q1.png",
                heroClassOverride: "heroOverrideClass",
                isEnd: false,
                question: "What does HTML stand for?",
                answers: [
                    {
                        type: "single",
                        options: [
                            "Hyper Text Markup Language",
                            "Healing Tranquil Motivating Learner",
                            "Hacker Trojan Mainfram Login"
                        ],
                        name: "q1"
                    }
                ]
            },
            {
                number: 2,
                heading: "What’s been happening?",
                isQuestion: false,
                heroImage: "./quiz1/hero/q1q2.png",
                isEnd: false,
                title: "Good job!",
                explainer: "Some text about why"
            },
            {
                number: 3,
                heading: "What’s been happening?",
                isQuestion: true,
                isEnd: false,
                question: "Choose the correct HTML element for the largest heading:",
                answers: [
                    {
                        type: "single",
                        options: ["<head>", "<h1>", "<h6>", "<p>"],
                        name: "q2"
                    }
                ]
            },
            {
                number: 4,
                heading: "What’s been happening?",
                isQuestion: false,
                isEnd: false,
                title: "Good job!!!",
                explainer: "Some text about why"
            },
            {
                number: 5,
                heading: "What’s been happening?",
                isQuestion: true,
                isEnd: false,
                question: "Multi choice",
                answers: [
                    {
                        type: "multi",
                        options: ["1", "2", "3", "4"],
                        name: "q3"
                    }
                ]
            },
            {
                number: 6,
                heading: "What’s been happening?",
                isQuestion: false,
                isEnd: true,
                title: "END OF QUIZ",
                explainer: "Some text about why"
            }
        ];

        const Quiz2 = [
            {
                number: 1,
                heading: "What can you do?",
                isQuestion: true,
                isEnd: false,
                question: "What does CSS stand for?",
                answers: [
                    {
                        type: "single",
                        options: [
                            "Hyper Text Markup Language",
                            "Healing Tranquil Motivating Learner",
                            "Hacker Trojan Mainfram Login"
                        ],
                        name: "q1"
                    }
                ]
            },
            {
                number: 2,
                heading: "What can you do?",
                isQuestion: false,
                isEnd: false,
                title: "Good job!",
                explainer: "Some text about why"
            },
            {
                number: 3,
                heading: "What can you do?",
                isQuestion: true,
                isEnd: false,
                question: "Another question about CSS",
                answers: [
                    {
                        type: "single",
                        options: ["<head>", "<h1>", "<h6>", "<p>"],
                        name: "q2"
                    }
                ]
            },
            {
                number: 4,
                heading: "What can you do?",
                isQuestion: false,
                isEnd: false,
                title: "Good job!",
                explainer: "Some text about why"
            },
            {
                number: 5,
                heading: "What can you do?",
                isQuestion: false,
                isEnd: true,
                title: "END OF QUIZ",
                explainer: "Some text about why"
            }
        ];

        let splash;

        if (this.state.showLanding) {
            const options = data.map((q, index) => {
                return (
                    <Option
                        path={q.name}
                        label={q.label}
                        name={q.name}
                        desc={q.desc}
                        key={"k_" + index}
                        clickHandler={this.pathHandler}
                    />
                );
            });
            splash = <SplashScreen>{options}</SplashScreen>;
        }

        let currentquiz;

        if (this.state.showQuiz1) {
            currentquiz = <QuizScreen options={Quiz1}/>;
        }

        if (this.state.showQuiz2) {
            currentquiz = <QuizScreen options={Quiz2}/>;
        }

        return (
            <div>
        <pre>
          {
              JSON.stringify(this.props)
          }
        </pre>
                {splash}
                {currentquiz}
                <button onClick={this.quizAction}>Test redux action</button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    quizAction: () => dispatch(quizAction())
})

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
