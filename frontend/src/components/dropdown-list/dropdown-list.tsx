import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import classes from './dropdown-list.module.css';
import ArrowDownIconBlack from 'images/arrow-down-icon-black.svg';


type DropdownListProps = {
    name: string;
    elementsList: any[];
    onChange: (index: number) => void;
    index?: number | number[];
    className?: string;
    listClassName?: string;
    defaultIndex?: number;
    allowDeselect?: boolean;
    ellipsis?: boolean;
    disabled?: boolean;
    multiselect?: boolean;
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
    allowDeselect = true,
    ellipsis = false,
    disabled = false,
    multiselect = false,
}: DropdownListProps) => {
    const [ selectedIndex, setSelectedIndex ] = useState(defaultIndex === undefined ? -1 : defaultIndex);
    // for multiselect only
    const [ selectedIndexes, setSelectedIndexes ] = useState(defaultIndex === undefined ? [] : [defaultIndex]);
    const [ isOpen, setIsOpen ] = useState(false);

    if (multiselect && indexInput && !Array.isArray(indexInput)
        || !multiselect && indexInput && Array.isArray(indexInput)) {
        console.error("Multiselect and array of input indexes must be used together, when the dropdown is uncontrolled");
        return null;
    }

    const currentSelectionIndex = indexInput as number ?? selectedIndex;
    const currentSelectionIndexes = indexInput as number[] ?? selectedIndexes;

    useEffect(() => {
        if (elementsList.length > 0) {
            return;
        }

        setIsOpen(false);
    }, [elementsList]);

    const getDropdownName = () => {
        if (multiselect && currentSelectionIndexes.length > 0) {
            return elementsList.filter((e, i) => currentSelectionIndexes
                                                    .includes(i))
                                                    .join(", ");
        } else if (!multiselect && currentSelectionIndex >= 0) {
            return elementsList[currentSelectionIndex];
        }

        return name;
    }

    return (
        <div
            className={
                classNames(
                    classes.dropdownList,
                    disabled && classes.disabled,
                    className,
            )}
            onClick={() => elementsList.length > 0
                && !disabled
                && setIsOpen(state => !state)}
        >
            <div
                className={classes.controls}
            >
                <span className={ellipsis ? classes.overflowingSelectionText : ''}>
                    {getDropdownName()}
                </span>
                {!disabled && (
                    <img
                        className={classes.icon}
                        src={ArrowDownIconBlack}
                    />
                )}
            </div>
            {isOpen && (
                <ul className={classNames(classes.dropdown, listClassName)}>
                    {elementsList.map((e, i) => (
                        <li
                            className={classNames(
                                classes.listElement,
                                ellipsis ? classes.overflowingListElement : '',
                                multiselect && selectedIndexes.includes(i) && classes.multiselectSelection
                            )}
                            key={typeof e === 'string' ? e : i}
                            onClick={() => {
                                if (multiselect && !Array.isArray(indexInput)) {
                                    setSelectedIndexes(currentIndexes => {
                                        if (currentIndexes.includes(i) && !allowDeselect) {
                                            return currentIndexes;
                                        }

                                        const newCurrentIndexes = [...currentIndexes];
                                        if (currentIndexes.includes(i)) {
                                            newCurrentIndexes.splice(
                                                newCurrentIndexes.indexOf(i),
                                                1
                                            );
                                        } else {
                                            newCurrentIndexes.push(i);
                                        }

                                        return newCurrentIndexes;
                                    });
                                } else if (!multiselect && typeof indexInput !== 'number') {
                                    setSelectedIndex(currentIndex => {
                                        if (i === currentIndex && allowDeselect) {
                                            return -1;
                                        }

                                        return i;
                                    });
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