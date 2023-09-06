import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProfileTypes } from 'shared';
import { Form, useActionData, useLoaderData } from 'react-router-dom';

import useAuth from '../../../hooks/useAuth';
import TextInput from '../../../components/text-input/text-input';
import SubmitButton from '../../../components/submit-button/submit-button';

import classes from './company-data-page.module.css';
import useErrorHandler from '../../../hooks/use-error-handler';
import useSuccessFeedback from '../../../hooks/use-success-feedback';
import useLoaderDataWithSnackbar from '../../../hooks/use-loader-data-with-snackbar';
import useActionDataWithSnackbar from '../../../hooks/use-action-data-with-snackbar';


type CompanyDataPageProps = {

};

const dataFields = [
    'name',
    'taxIdNumber',
    'country',
    'city',
    'street',
    'buildingNumber',
    'unitNumber',
    'postalCode',
];

const CompanyDataPage = ({

}: CompanyDataPageProps) => {
    const auth = useAuth();
    const { t } = useTranslation();
    const actionErrors = useActionDataWithSnackbar(t('companyData.success'));
    const companyData = useLoaderDataWithSnackbar();

    const isAdmin = auth.currentUserHasRole([ProfileTypes.Role.Admin]);

    if (!companyData) {
        return null;
    } 

    return (
        <Form className={classes.companyDataPage} method="post">
            <h4 className={classes.title}>{t('companyData.title')}</h4>
            <div className={classes.content}>
                {dataFields.map(field => (
                    <TextInput
                        className={classes[field]}
                        key={field}
                        name={field}
                        placeholder={t(`companyData.${field}`)}
                        disabled={!isAdmin || field === 'name'}
                        error={actionErrors?.[field]}
                        defaultValue={companyData[field]}
                    />
                ))}
            </div>
            {isAdmin && (
                <SubmitButton
                    className={classes.submitButton}
                    text={t('companyData.save')}
                />
            )}
        </Form>
    );
};

export default CompanyDataPage;