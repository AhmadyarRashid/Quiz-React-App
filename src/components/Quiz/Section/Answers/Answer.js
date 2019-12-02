import React, {Component} from "react";

class Answer extends Component {
    checkHandler = event => {
        // console.log('----- selected item -----' ,event.target.value, event.target.name);
        const checkedBox = event.target.checked;
        this.props.onChange(checkedBox, event.target.value, event.target.name, this.props.type);
    };

    render() {

        if (this.props.type === "single") {
            return (
                <div>
                    <input
                        type="radio"
                        id={this.props.id}
                        name={this.props.name}
                        value={this.props.option}
                        checked={this.props.output == this.props.option ? true : false}
                        onChange={this.checkHandler}
                    />
                    <label htmlFor={this.props.id}>{this.props.option}</label>
                </div>
            );
        } else if (this.props.type === "multi") {
            return (
                <div>
                    <input
                        type="checkbox"
                        id={this.props.id}
                        name={this.props.name}
                        value={this.props.option}
                        onChange={this.checkHandler}
                    />
                    <label htmlFor={this.props.id}>{this.props.option}</label>
                </div>
            );
        }
    }
}

export default Answer;
