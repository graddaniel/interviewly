import React from 'react';
import { useNavigate } from 'react-router-dom';

import { APP_FORMS_ROUTES } from '../../../consts/routes';

import classes from './calendar.module.css';


const LibraryPage = () => {
    const navigate = useNavigate();

    return (
        <section>
            LIBRARY
            <button
                onClick={() => navigate(APP_FORMS_ROUTES.LIBRARY_EDITOR.PATH)}
            >
                Add new survey template
            </button>
        </section>
    );
};

export default LibraryPage;