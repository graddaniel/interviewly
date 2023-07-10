import React, { useState } from 'react';

import classes from './dropdown-list.module.css';
import ArrowDownIconBlack from '~/images/arrow-down-icon-black.svg';


const DropdownList = ({
    elementsList,
    onChange,
}) => {
    const [ selectedIndex, setSelectedIndex ] = useState(-1);
    const [ isOpen, setIsOpen ] = useState(false);

    return (
        <div
            className={classes.dropdownList}
            onClick={() => setIsOpen(state => !state)}
        >
            <div
                className={classes.controls}
            >
                <span>{selectedIndex >= 0 ? elementsList[selectedIndex] : 'Status'}</span>
                <img
                    className={classes.icon}
                    src={ArrowDownIconBlack}
                />
            </div>
            {isOpen && (
                <ul className={classes.dropdown}>
                    {elementsList.map((e, i) => (
                        <li
                            className={classes.listElement}
                            key={e}
                            onClick={() => {
                                setSelectedIndex(currentIndex => i === currentIndex ? -1 : i);
                                onChange(i);
                            }}
                        >
                            {e}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownList;