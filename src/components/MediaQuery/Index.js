import React, {PropTypes} from 'react'
import './styles.css';

const MediaQuery = (props) => {
    const {size, children} = props;
    return (
        <div className={`MediaQuery-${size}`}> {children} </div>
    );
};

export default MediaQuery;
