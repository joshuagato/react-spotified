import React from 'react';
import './Input.scss';

const Input = (props) => (<input className="update-input" type={props.type} placeholder={props.pholder} onChange={props.changed} />);

export default Input;
