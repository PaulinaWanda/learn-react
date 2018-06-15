import React, { Component } from 'react';

const Desc = (props) => {
    return (
        <h2> { props.text } </h2>
        //React.createElement("Desc", null, "click it!")
    );
};

// class Button extends React.Component {
class Button extends Component {
    handleClick = () => {
        this.props.onClickFunction(this.props.incrementValue)
    };

    render () {
        return (
            <button
                className="btn btn-secondary"
                role="group"
                onClick={ this.handleClick }
            >
                + { this.props.incrementValue }
            </button>
        )
    }
}

const Result = (props) => {
    return (
        <div className="alert alert-info">
            <span className="badge badge-pill badge-info">{ props.counter }</span> clicks!
        </div>
    )
};

class First extends React.Component {
    state = { counter: 0 };
    incrementCounter = (incrementValue) => {
        this.setState((prevState) => ({ counter: prevState.counter + incrementValue }))
    };

    render() {
        return (
            <div className="text-center">
                <Desc text="click it!"/>
                <div className="btn-group mt-3 mb-4">
                    <Button incrementValue={ 1 } onClickFunction={ this.incrementCounter }/>
                    <Button incrementValue={ 5 } onClickFunction={ this.incrementCounter }/>
                    <Button incrementValue={ 10 } onClickFunction={ this.incrementCounter }/>
                    <Button incrementValue={ 100 } onClickFunction={ this.incrementCounter }/>
                </div>
                <Result counter={ this.state.counter }/>
            </div>
        )
    }
}

// ReactDOM.render(<First />, mountNode);

// ReactDOM.render(<Desc label="click it!"/>, mountNode);

export default First;