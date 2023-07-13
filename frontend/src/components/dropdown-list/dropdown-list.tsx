import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import classes from './dropdown-list.module.css';
import ArrowDownIconBlack from '~/images/arrow-down-icon-black.svg';


type DropdownListProps = {
    name: string;
    elementsList: any[];
    onChange: (index: number) => void;
    index?: number;
    className?: string;
    listClassName?: string;
    defaultIndex?: number,
};

// if we pass index, then the dropdown is controlled from the outside
const DropdownList = ({
    name,
    elementsList,
    onChange,
    index: indexInput,
    className,
    listClassName,
    defaultIndex,
}: DropdownListProps) => {
    const [ selectedIndex, setSelectedIndex ] = useState(defaultIndex === undefined ? -1 : defaultIndex);
    const [ isOpen, setIsOpen ] = useState(false);

    const currentSelectionIndex = indexInput ?? selectedIndex;

    useEffect(() => {
        if (elementsList.length > 0) {
            return;
        }

        setIsOpen(false);
    }, [elementsList]);

    return (
        <div
            className={classNames(classes.dropdownList, className)}
            onClick={() => elementsList.length > 0 && setIsOpen(state => !state)}
        >
            <div
                className={classes.controls}
            >
                <span>{currentSelectionIndex >= 0 ? elementsList[currentSelectionIndex] : name}</span>
                <img
                    className={classes.icon}
                    src={ArrowDownIconBlack}
                />
            </div>
            {isOpen && (
                <ul className={classNames(classes.dropdown, listClassName)}>
                    {elementsList.map((e, i) => (
                        <li
                            className={classes.listElement}
                            key={typeof e === 'string' ? e : i}
                            onClick={() => {
                                if (typeof indexInput !== 'number') {
                                    setSelectedIndex(currentIndex => i === currentIndex ? -1 : i);
                                }

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