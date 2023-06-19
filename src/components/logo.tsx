import React from 'react';

import classes from './logo.module.css';
import LogoImage from '../images/logo.png';

const Logo = () => {
    return (
        <section>
            <img className={classes.image} src={LogoImage}/>
            <span className={classes.title}>Interviewly</span>
        </section>
    );
};

export default Logo;