import React, { Component } from 'react';
import './Login.scss';

import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
// import { findDOMNode } from 'react-dom';

import FormControls from '../../FormControls/FormControls';
import * as actions from '../../../store/actions/index';

class Login extends Component {

    loginHandler = (event) => {
        event.preventDefault();

        const email = this.refs.eml.value;
        const password = this.refs.pwd.value;
        
        this.props.onAuth(email, password);
    }

    switchToReset = () => {
        this.props.history.replace('/reset-pw');
    };
   
    render() {
        let redirect = null;
        if(this.props.isAuthenticated) {
            
            redirect = <Redirect to={this.props.authRedirectPath} />;
        }
        
        return (
            <div className="login">
                { redirect }
                <h2>Login to your account</h2>

                <form onSubmit={this.loginHandler}>
                    <FormControls ref="eml" id="eml" name="email" title="email" plcHolder="e.g joshuagato37@gmail.com" 
                        type="email" changed={this.changeHandler} />
                    
                    <FormControls ref="pwd" id="pwd" name="password" title="password" plcHolder="Your password" 
                        type="password" changed={this.changeHandler} />
                    
                    <button type="submit">Login</button>
                </form>
                <p onClick={this.props.switchForm}>Don't have an account yet? Register here!!</p>
                <br />
                <p onClick={this.switchToReset}>Forgotten your password? Click here to reset!!</p>
            </div>
        );
    }
}

const mapStateToProps = state =>  {
    return {
        errors: state.auth.error,
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));