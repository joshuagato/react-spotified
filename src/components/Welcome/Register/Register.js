import React from 'react';
import './Register.scss';

const Register = (props) => {
    return (
        <div className="register">
            <h2>Create your your account</h2>
            <form>
                <div>
                    <label htmlFor="fname">First name</label>
                    <input id="fname" type="text" placeholder="e.g Joshua" required />
                </div>
                <div>
                    <label htmlFor="lname">Last name</label>
                    <input id="lname" type="text" placeholder="e.g Gato" required />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" placeholder="e.g joshuagato37@gmail.com" required />
                </div>
                <div>
                    <label htmlFor="email2">Confirm Email</label>
                    <input id="email2" type="email" placeholder="e.g joshuagato37@gmail.com" required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" placeholder="Your password" required />
                </div>
                <div>
                    <label htmlFor="password2">Confirm Password</label>
                    <input id="password2" type="password" placeholder="Your password confirmation" required />
                </div>
                <button type="submit">Register</button>
            </form>
            <p onClick={props.switchForm}>Already have an account? Log in here!!</p>
        </div>
    );
}

export default Register;