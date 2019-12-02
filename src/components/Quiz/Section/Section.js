import React, {Component} from "react";
import Answer from "./Answers/Answer";
import NextBtn from "./NextBtn/NextBtn";
import {connect} from 'react-redux';
import {quizAction} from "../../../actions/quizActions";

class QuizSection extends Component {
    state = {
        isChecked: false,
        value: '',
        name: ''
    };

    handleFieldChange = (checkedBox, value, name, type) => {
        if (type == 'multi') {
            let newValue = '';
            if(checkedBox){
                if (this.state.value == '') {
                    newValue = value;
                } else {
                    newValue = this.state.value + ',' + value;
                }
            }else {
                const array = this.state.value.split(',');
                array.forEach(item => {
                    if(item == value){

                    }else {
                        if (newValue == '') {
                            newValue = item;
                        } else {
                            newValue = newValue + ',' + item;
                        }
                    }
                })
            }


            this.setState({
                value: newValue,
                isChecked: checkedBox,
                name
            });

            this.props.quizAction({
                isChecked: checkedBox,
                value: newValue,
                name
            });
        } else {
            this.setState({
                isChecked: checkedBox,
                value,
                name
            });

            this.props.quizAction({
                isChecked: checkedBox,
                value,
                name
            });
        }

    };

    handlerNextBtn = e => {
        const t = this.props;
        t.clicked(this.state);

        this.setState({
            isChecked: false,
            value: '',
            name: ''
        })
    };

    handlerBackBtn = e => {
        // console.log('--- back button click --');
        this.props.backClick(this.state);
    };

    setPreviousValue = (preValue, array, type) => {
        if(type == "single"){
            const output = array.filter(item => item == this.state.value);
            if(this.state.value == '' || output.length == 0){
                this.setState({
                    value : preValue
                });
            }
        }
    };

    render() {
        console.log('------- value ------' , this.state.value);
        let screenType;
        let answerBlock;
        if (this.props.data.isQuestion && !this.props.data.isEnd) {
            let nextBtn;
            let answer;
            let answersArray = [this.props.data.answers[0]];
            const name = this.props.data.answers[0].name;
            const output = this.props.quizReducer.results.filter(item => item.name == name);

            if (output.length > 0) {
                this.setPreviousValue(output[0].answer, answersArray[0].options, answersArray[0].type);
            }
            if (answersArray[0].type === "single") {
                answerBlock = answersArray[0].options.map((q, qIndex) => (
                    <Answer
                        key={"k_" + qIndex}
                        id={"a_" + name + qIndex}
                        option={q}
                        type="single"
                        name={name}
                        output={this.state.value}
                        onChange={this.handleFieldChange}
                    />
                ));
            }

            if (answersArray[0].type === "multi") {
                answerBlock = answersArray[0].options.map((q, qIndex) => (
                    <Answer
                        key={"k_" + qIndex}
                        id={"a_" + name + qIndex}
                        option={q}
                        type="multi"
                        name={name}
                        onChange={this.handleFieldChange}
                    />
                ));
            }

            if (this.state.isChecked) {
                nextBtn = <NextBtn clicked={this.handlerNextBtn}/>;
            }

            screenType = (
                <div>
                    <h2>{this.props.data.question}</h2>
                    {answer}
                    {answerBlock}
                    {this.props.step > 1 && <button onClick={this.handlerBackBtn}>Back</button>}
                    {nextBtn}
                </div>
            );
        } else {
            screenType = (
                <div>
                    {this.props.data.title} <br></br><br></br>
                    {this.props.data.explainer} <br></br><br></br>
                    {this.props.data.isEnd ? <a href='/'>start</a> : null}
                    {!this.props.data.isEnd ? <NextBtn clicked={this.props.clicked}/> : null}

                </div>
            );
        }

        return <div className="c-quiz-section">{screenType}</div>;
    }
}

const mapStatToProps = state => ({
    quizReducer: state.quizReducer
});

const mapDispatchToProps = dispatch => ({
    quizAction: (value) => dispatch(quizAction(value))
});

export default connect(mapStatToProps, mapDispatchToProps)(QuizSection);
