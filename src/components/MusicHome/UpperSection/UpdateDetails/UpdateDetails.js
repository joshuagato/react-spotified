import React, { Component } from 'react';
import './UpdateDetails.scss';

import Form from './Form/Form';
import Input from './Input/Input';

export class UpdateDetails extends Component {

    state = {
        
        emailForm: {
            email: ''
        },        
        passwordForm: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''

        }
    }

    nameChangeInputHandler = (event) => {
        const target = event.target;
        
        const updatedState = { ...this.state.emailForm };
        updatedState.email = target.value
        
        this.setState({ emailForm: updatedState });
    };

    pwdChangeInputHandler = (event) => {

        const updatedState = { ...this.state.passwordForm };
        updatedState[event.target.name] = event.target.value;

        this.setState({ passwordForm: updatedState });
    };
    
    nameChangeHandler = (event) => {
        event.preventDefault();
    }

    passwordUpdateHandler = (event) => {
        event.preventDefault();
    };

    render() {
        console.log(this.state.passwordForm.currentPassword)
        return (
            <div className="update-details-container">
                
                <Form name="email" pholder="Email address" btnName="save" submit={this.nameChangeHandler}>
                    <Input type="email" pholder="Email address" changed={this.nameChangeInputHandler} 
                        value={this.state.emailForm.email} name="email" />
                </Form>

                <Form name="password" pholder="Current Password" btnName="save" submit={this.passwordUpdateHandler}>
                    <Input type="password" pholder="Current Password" changed={this.pwdChangeInputHandler} 
                        value={this.state.passwordForm.currentPassword} name="currentPassword" />

                    <Input type="password" pholder="New Password" changed={(event) => this.pwdChangeInputHandler(event)} 
                        value={this.state.passwordForm.newPassword} name="newPassword" />

                    <Input type="password" pholder="Confirm New Password" changed={(event) => this.pwdChangeInputHandler(event)}
                        value={this.state.passwordForm.confirmPassword} name="confirmPassword" />
                </Form>
                
            </div>
        );
    }
}

export default UpdateDetails;
