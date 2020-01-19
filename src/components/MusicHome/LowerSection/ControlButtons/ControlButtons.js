import React from 'react';

const ControlButtons = (props) => (
    <button style={props.style} className={props.class} title={props.title}>
        <img src={props.src} alt={props.alt} />
    </button>
);

export default ControlButtons;
