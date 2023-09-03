import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProfileTypes } from 'shared';
import { Form, useActionData, useLoaderData } from 'react-router-dom';

import SubmitButton from '../../../components/submit-button/submit-button';
import IconButton from '../../../components/icon-button/icon-button';
import DropdownList from '../../../components/dropdown-list/dropdown-list';
import TextInput from '../../../components/text-input/text-input';
import Checkbox from '../../../components/checkbox/checkbox';
import nationalityToFlagIcon from '../../../utils/nationality-to-flag-icon';

import classes from './personal-data-page.module.css';
import PencilIconBlack from 'images/pencil-icon-black.svg';
import Avatar from '../../../components/avatar/avatar';
import useSuccessFeedback from '../../../hooks/use-success-feedback';


const NATIONALITIES = [...Object.values(ProfileTypes.Nationality)] as ProfileTypes.Nationality[];

const PersonalDataPage = () => {
    const { t } = useTranslation();
    const profileData = useLoaderData() as any;
    const actionData = useActionData() as any;
    useSuccessFeedback(actionData, {
        passwordChange: t('personalData.passwordChangeSuccessMessage'),
    })

    const errors = actionData?.errors ?? {};

    const {
        avatarUrl,
        name,
        surname,
        email,
        companyName,
        phoneNumber,
        //termsAndPrivacyPolicyAgreement,
        newsletter,
    } = profileData;
    
    const [ nationality, setNationality ] = useState(ProfileTypes.Nationality.British);

    return (
        <section className={classes.personalDataPage}>
            <h4 className={classes.title}>{t('personalData.title')}</h4>
            <Form className={classes.personalSection}>
                <div className={classes.avatarAndNationality}>
                    <div className={classes.avatarEditor}>
                        <Avatar
                            url={avatarUrl}
                            className={classes.avatar}
                            placeholderIconClassName={classes.avatarPlaceholderIcon}
                        />
                        <IconButton
                            className={classes.editAvatarButton}
                            icon={PencilIconBlack}
                            onClick={() => console.log("Editing the avatar")}
                        />
                    </div>
                    <DropdownList
                        className={classes.nationalityDropdown}
                        name="nationality"
                        onChange={(i) => setNationality(NATIONALITIES[i])}
                        elementsList={NATIONALITIES.map(nationality => (
                            <img
                                key={nationality}
                                src={nationalityToFlagIcon(nationality)}
                            />
                        ))}
                        defaultIndex={NATIONALITIES.indexOf(nationality)}
                        allowDeselect={false}
                    />
                </div>
                <div className={classes.inputs}>
                    <TextInput
                        className={classes.input}
                        name="name"
                        placeholder="Name"
                        defaultValue={name}
                    />
                    <TextInput
                        className={classes.input}
                        name="surname"
                        placeholder="Surname"
                        defaultValue={surname}
                    />
                    <TextInput
                        className={classes.input}
                        name="email"
                        placeholder="E-mail"
                        disabled={true}
                        defaultValue={email}
                    />
                    <TextInput
                        className={classes.input}
                        name="companyName"
                        placeholder="Company name"
                        defaultValue={companyName}
                        disabled={true}
                    />
                    <TextInput
                        className={classes.input}
                        name="phoneNumber"
                        placeholder="Phone number"
                        defaultValue={phoneNumber}
                    />
                </div>
            </Form>
            <SubmitButton
                className={classes.submitButton}
                text={t('personalData.save')}
            />
            <div className={classes.settingsSection}>
                <Form className={classes.consents}>
                    <h6 className={classes.subtitle}>
                        {t('personalData.marketingConsentsSubtitle')}
                    </h6>
                    <Checkbox
                        name="termsAndPrivacyPolicyAgreement"
                        label={t('join.page3.rulesAgreement.text')}
                        defaultValue={true}
                        disabled={true}
                    />
                    <Checkbox
                        name="newsletter"
                        label={t('join.page3.inputs.newsletter')}
                        defaultValue={newsletter}
                    />
                </Form>
                <Form
                    method="post"
                    className={classes.changePassword}
                >
                    <h6 className={classes.subtitle}>
                        {t('personalData.changePasswordSubtitle')}
                    </h6>
                    <div>
                        <TextInput
                            name="currentPassword"
                            type="password"
                            placeholder={t('personalData.currentPassword')}
                            error={errors.currentPassword}
                        />
                        <TextInput
                            name="newPassword"
                            type="password"
                            placeholder={t('personalData.newPassword')}
                            error={errors.newPassword}
                        />
                        <TextInput
                            name="repeatPassword"
                            type="password"
                            placeholder={t('personalData.repeatPassword')}
                            error={errors.repeatPassword}
                        />
                    </div>
                    <input type="hidden" name="type" value="changePassword" />
                    <SubmitButton
                        className={classes.changePasswordButton}
                        text={t('personalData.save')}
                    />
                </Form>
            </div>
        </section>
    );
};

export default PersonalDataPage;