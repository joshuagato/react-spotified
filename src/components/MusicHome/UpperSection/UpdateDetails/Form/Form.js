import React from 'react';
import './Form.scss';

const Form = (props) => (
    <section className="update-details">
        <h1>{props.type}</h1>

        {props.children}
        
        <button>{props.btnName}</button>
    </section>
);

export default Form;
