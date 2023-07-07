import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import ROUTES from '../../consts/routes';

import classes from './logo.module.css';
import LogoImage from '../../../images/logo.svg';

type LogoProps = {
    className?: string;
};

const Logo = ({
    className,
}: LogoProps) => {
    const navigate = useNavigate();

    return (
        <section
            className={classNames(classes.logo, className)}
            onClick={() => navigate(ROUTES.HOME.PATH)}
        >
            <img className={classes.image} src={LogoImage}/>
            <span className={classes.title}>Interviewly</span>
        </section>
    );
};

export default Logo;