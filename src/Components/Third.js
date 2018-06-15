import  React, { Component } from 'react';
import _ from 'lodash';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-solid'
import './Third.css';

const possibleCombinationSum = function(arr,n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length -1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }
    const listSize = arr.length, combinationsCount = (1 << listSize)
    for (let i = 1; i < combinationsCount ; i++) {
        let combinationSum = 0;
        for (let j = 0 ; j < listSize ; j++ ) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
    }
    return false;
};

const Stars = (props) => {
    // const stars = [];
    // for (let i=0; i<numberOfStars; i++) {
    // 	stars.push(<i key={ i } class="fa fa-star"></i>)
    // }

    return (
        <div className="col-5">
            { _.range(props.numberOfStars).map((i) =>
                <FontAwesomeIcon icon="star" key={ i } />
            )}
        </div>
    );
};

const Buttons = (props) => {
    let button;

    switch (props.answerIsCorrect) {
        case true:
            button =
                <button
                    className="btn btn-success"
                    onClick={ props.acceptAnswer }
                >
                    <FontAwesomeIcon icon="check" />
                </button>;
            break;
        case false:
            button =
                <button className="btn btn-danger">
                    <FontAwesomeIcon icon="times" />
                </button>;
            break;
        default:
            button =
                <button
                    className="btn"
                    onClick={ props.checkAnswer }
                    disabled={ props.selectedNumbers.length === 0 }
                >
                    =
                </button>;
            break;
    }

    return (
        <div className="col-2 text-center">
            { button }
            <br/>
            <button
                className="btn btn-warning btn-sm mt-4"
                style={{ color: 'white' }}
                disabled={ props.redraws === 0 }
            >
                <FontAwesomeIcon
                    icon="sync-alt"
                    onClick={ props.redraw }
                /> { props.redraws }
            </button>
        </div>
    );
};

const Answer = (props) => {
    return (
        <div className="col-5">
            {props.selectedNumbers.map((number, index) =>
                    <span
                        key={ index }
                        onClick={ () => props.unselectNumber(number) }
                    >
        	{ number }
        </span>
            )}
        </div>
    );
};

const Numbers = (props) => {
    // const numbersList = _.range(1,10);
    const numberClassName = (number) => {
        if (props.selectedNumbers.indexOf(number) >= 0) {
            return 'selected';
        }
        if (props.usedNumbers.indexOf(number) >= 0) {
            return 'used';
        }
    };

    return (
        <div className="card text-center">
            <div>
                {Numbers.list.map((number, index) =>
                    <span
                        key={ index }
                        className={ numberClassName(number) }
                        onClick={ () => props.selectNumber(number) }
                    >
          	{ number }
          </span>
                )}
            </div>
        </div>
    );
};
Numbers.list = _.range(1, 10);

const GameStatusFrame = (props) => {
    return (
        <div className="text-center">
            <h2>{ props.gameStatus }</h2>
            <button
                className="btn btn-secondary m-3"
                onClick={ props.resetGame }
            >
                Play Again
            </button>
        </div>
    );
};

class Game extends Component {
    static randomNumber = () => Math.floor(Math.random() * 9) + 1;
    static initialState = () => ({
        selectedNumbers: [],
        randomNumberOfStars: Game.randomNumber(),
        usedNumbers: [],
        answerIsCorrect: null,
        redraws: 5,
        gameStatus: null
    });

    state = Game.initialState();

    resetGame = () => this.setState( Game.initialState() );
    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) return;
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: (prevState.selectedNumbers.concat(clickedNumber)).sort()
        }));
    };
    unselectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.filter(number =>  number !== clickedNumber)
        }));
    };
    checkAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect: prevState.randomNumberOfStars === prevState.selectedNumbers.reduce((curr, next) => curr + next, 0)
        }));
    };
    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: null,
            randomNumberOfStars: Game.randomNumber()
        }), this.updateGameStatus);
    };
    redraw = () => {
        if (this.state.redraws === 0) return;
        this.setState(prevState => ({
            randomNumberOfStars: Game.randomNumber(),
            selectedNumbers: [],
            answerIsCorrect: null,
            redraws: prevState.redraws - 1
        }), this.updateGameStatus);
    };
    possibleSolutions = ({ randomNumberOfStars, usedNumbers }) => {
        const possibleNumbers = _.range(0, 10).filter(number =>
            usedNumbers.indexOf(number) === -1
        );

        return possibleCombinationSum(possibleNumbers, randomNumberOfStars);
    };
    updateGameStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9) {
                return { gameStatus: 'You won!' };
            }

            if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
                return { gameStatus: 'Game Over!' };
            }
        });
    };

    render () {
        const {
            selectedNumbers,
            randomNumberOfStars,
            usedNumbers,
            answerIsCorrect,
            redraws,
            gameStatus
        } = this.state;

        return (
            <div className="game">
                <h3>Play Nine</h3>
                <hr />
                <div className="row mb-4">
                    <Stars numberOfStars={ randomNumberOfStars }/>
                    <Buttons
                        selectedNumbers={ selectedNumbers }
                        answerIsCorrect={ answerIsCorrect }
                        redraws={ redraws }
                        checkAnswer={ this.checkAnswer }
                        acceptAnswer={ this.acceptAnswer }
                        redraw={ this.redraw }
                    />
                    <Answer
                        selectedNumbers={ selectedNumbers }
                        unselectNumber={ this.unselectNumber }
                    />
                </div>
                { gameStatus ?
                    <GameStatusFrame
                        gameStatus={ gameStatus }
                        resetGame={ this.resetGame }
                    />
                    :
                    <Numbers
                        selectedNumbers={ selectedNumbers }
                        usedNumbers={ usedNumbers }
                        selectNumber={ this.selectNumber }
                    />
                }
            </div>
        );
    }
}

class Third extends Component {
    render () {
        return (
            <div>
                <Game />
            </div>
        );
    }
}

// ReactDOM.render(<Third/>, mountNode);

export default Third;
