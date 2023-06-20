import React from 'react';
import { useNavigate } from 'react-router-dom';

import ROUTES from '../../consts/routes';

import classes from './logo.module.css';
import LogoImage from '../../images/logo.svg';

const Logo = () => {
    const navigate = useNavigate();

    return (
        <section
            className={classes.logo}
            onClick={() => navigate(ROUTES.HOME.PATH)}
        >
            <img className={classes.image} src={LogoImage}/>
            <span className={classes.title}>Interviewly</span>
        </section>
    );
};

export default Logo;