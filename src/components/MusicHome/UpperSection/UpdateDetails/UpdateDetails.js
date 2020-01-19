import React, { Component } from 'react';
import './UpdateDetails.scss';

import Form from './Form/Form';
import Input from './Input/Input';

export class UpdateDetails extends Component {
    render() {
        return (
            <div className="update-details-container">
                
                <Form type="email" pholder="Email address" btnName="save">
                    <Input type="email" pholder="Email address" />
                </Form>

                <Form type="password" pholder="Current Password" btnName="save">
                    <Input type="password" pholder="Current Password" />
                    <Input type="password" pholder="New Password" />
                    <Input type="password" pholder="Confirm New Password" />
                </Form>
                
            </div>
        );
    }
}

export default UpdateDetails;
