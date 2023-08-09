import React, { useState } from 'react';

import classes from './search-input.module.css';
import MagnifyingGLassIconBlack from 'images/magnifying-glass-icon-black.svg';


const SearchInput = ({
    //onSearch
    text,
}) => {
    const [ value, setValue ] = useState('');

    return (
        <div className={classes.wrapper}>
            <img className={classes.icon} src={MagnifyingGLassIconBlack} />
            <input
                className={classes.input}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={text}
            />
        </div>
    );
};

export default SearchInput;