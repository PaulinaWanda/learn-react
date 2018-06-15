import React, { Component } from 'react';
import axios from 'axios';

const Card = (props) => {
    return (
        <div className="col-6">
            <img
                style={{ width: 75 }}
                alt={ props.name }
                src={ props.avatar_url }
            />
            <div
                className="info ml-3"
                style={{ display: 'inline-block' }}
            >
                <div style={{ fontWeight: 700, fontSize: '1.25em' }}>
                    { props.name }
                </div>
                <div>{ props.company }</div>
            </div>
        </div>
    );
};

const CardList = (props) => {
    return (
        <div className="row">
            { props.cards.map(card => <Card key={ card.id } {...card}/>) }
        </div>
    );
};

// class Form extends React.Component {
class Form extends Component {
    state = { userName: '' };
    handleSubmit = (event) => {
        event.preventDefault();
        axios.get(`https://api.github.com/users/${this.state.userName}`)
            .then(response => {
                this.props.onSubmit(response.data);
                this.setState({ userName: '' });
            })
    };

    render () {
        return (
            <form action="" onSubmit={ this.handleSubmit }>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Github Username</span>
                    </div>
                    <input
                        value={ this.state.userName }
                        onChange={ (event) => this.setState({ userName: event.target.value }) }
                        type="text"
                        placeholder="john.doe"
                        className="form-control pl-3"
                        style={{ minWidth: 100 }}
                        aria-label="Github Username"
                        required
                    />
                    <div className="input-group-append">
                        <button
                            type="submit"
                            className="btn btn-secondary"
                        >
                            Add Username
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

// class Second extends React.Component {
class Second extends Component {
    state = {
        cards: []
    };
    addNewCard = (cardInfo) => {
        // console.log(cardInfo);
        this.setState( (prevState) => ({
            cards: prevState.cards.concat(cardInfo)
        }));
    };

    render () {
        return (
            <div className="row justify-content-center">
                <div className="col-10 offset-1">
                    <h2>Search for github users</h2>
                    <Form onSubmit={ this.addNewCard } />
                    <CardList cards={ this.state.cards } />
                </div>
            </div>
        )
    }
}

export default Second;

// ReactDOM.render(<Second />, mountNode);
