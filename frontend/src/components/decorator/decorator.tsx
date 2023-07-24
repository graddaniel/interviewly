import React from 'react';

import classes from './decorator.module.css';
import DecoratorImage from '~/images/decorator.svg';


const Decorator = () => {
    return (
        <div className={classes.decorator}>
            <img src={DecoratorImage}/>
            <img src={DecoratorImage}/>
        </div>
    );
};

export default Decorator;