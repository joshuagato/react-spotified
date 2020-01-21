import React from 'react';

const FormControls = React.forwardRef((props, ref) => {
    const { id, name, title, plcHolder, changed } = props;

    return (
        <div>
            <label htmlFor={id}>{title.charAt(0).toUpperCase() + title.slice(1)}</label>
            <input ref={ref} id={id} type={name} placeholder={plcHolder} onChange={changed} required />
        </div>
    );
});

export default FormControls;
