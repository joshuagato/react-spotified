import React, { Component } from 'react';
import './Login.scss';

import { withRouter } from 'react-router-dom';

// import { findDOMNode } from 'react-dom';

class Login extends Component {

    state = {
        credentials: {
            email: '',
            password: ''
        }
    }

    changeHandler = (event) => {

        // let credentials = this.state.credentials;
        let credentials = {
            email: '',
            password: ''
        }

        credentials[event.target.type] = event.target.value;
        // this.setState({ credentials });

        // return console.log('Email =>' + credentials.email, 'Password =>' + credentials.password);
    }

    loginHandler = (event) => {
        event.preventDefault();

        const email = this.refs.eml.value;
        const password = this.refs.pwd.value;

        // console.log(email, password);

        if(email === 'joshuagato37@gmail.com' && password === 'joshuagato37@gmail.com') {
            localStorage.setItem('name', 'Joshua Gato');
            this.props.sess(localStorage.getItem('name'));
            // this.props.sess('Joshua Gato');
            this.props.history.push('/music-home');
        }
        else {
            alert('Please check your username or password');
            localStorage.removeItem('name');
            this.props.sess(localStorage.getItem('name'));
        }

        // console.log(localStorage.name);
        // console.log(localStorage.getItem('name'));
    }
    
    render() {
        // localStorage.removeItem('name');
        return (
            <div className="login">
                <h2>Login to your account</h2>
                <form ref="forms" onSubmit={this.loginHandler}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input ref="eml" id="email" type="email" placeholder="e.g joshuagato37@gmail.com" onChange={this.changeHandler} required />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input ref="pwd" id="password" type="password" placeholder="Your password" onChange={this.changeHandler} required />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p onClick={this.props.switchForm}>Don't have an account yet? Sign up here!!</p>
            </div>
        );
    }
}

export default withRouter(Login);