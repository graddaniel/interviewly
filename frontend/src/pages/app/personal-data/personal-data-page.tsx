import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccountTypes, ProfileTypes } from 'shared';
import { Form, useActionData, useLoaderData, useSubmit } from 'react-router-dom';

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
import useAuth from '../../../hooks/useAuth';
import NumericalInput from '../../../components/numerical-input/numerical-input';


const NATIONALITIES = [...Object.values(ProfileTypes.Nationality)] as ProfileTypes.Nationality[];
const MARTIAL_STATUSES = [...Object.values(ProfileTypes.MartialStatus)];
const GENDERS = [...Object.values(ProfileTypes.Gender)];

const PersonalDataPage = () => {
    const { t } = useTranslation();
    const auth = useAuth();
    const profileData = useLoaderData() as any;
    const actionData = useActionData() as any;
    const submit = useSubmit();
    const [ newsletter, setNewsletter ] = useState(profileData.newsletter);
    const cvFormRef = useRef(null);

    useSuccessFeedback(actionData, {
        passwordChange: t('personalData.passwordChangeSuccessMessage'),
        personalData: t('generic.saved'),
    })

    const errors = actionData?.errors ?? {};

    const {
        avatarUrl,
        name,
        surname,
        email,
        companyName,
        phoneNumber,
        sector,
        bankAccountNumber,
        birthYear,
        province,
        city,
        zipCode,
        street,
        profession,
        specialization,
        childrenCount,
    } = profileData;
    
    const [ nationality, setNationality ] = useState(ProfileTypes.Nationality.British);
    const [ martialStatus, setMartialStatus ] = useState(profileData.martialStatus);
    const [ gender, setGender ] = useState(profileData.gender);
    const [ hasChildren, setHasChildren ] = useState(profileData.hasChildren);

    return (
        <section className={classes.personalDataPage}>
            <h4 className={classes.title}>{t('personalData.title')}</h4>
            <Form method="post">
                <div className={classes.personalSection}>
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
                            placeholder={t('personalData.name')}
                            defaultValue={name}
                            error={errors?.name}
                        />
                        <TextInput
                            className={classes.input}
                            name="surname"
                            placeholder={t('personalData.surname')}
                            defaultValue={surname}
                            error={errors?.surname}
                        />
                        <TextInput
                            className={classes.input}
                            name="email"
                            placeholder={t('personalData.email')}
                            disabled={true}
                            defaultValue={email}
                        />
                        <TextInput
                            className={classes.input}
                            name="phoneNumber"
                            placeholder={t('personalData.phoneNumber')}
                            defaultValue={phoneNumber}
                            error={errors?.phoneNumber}
                        />
                        {auth.type === AccountTypes.Type.RECRUITER && (<>
                            <TextInput
                                className={classes.input}
                                name="companyName"
                                placeholder={t('personalData.companyName')}
                                defaultValue={companyName}
                                disabled={true}
                            />
                            <TextInput
                                className={classes.input}
                                name="sector"
                                placeholder={t('personalData.sector')}
                                defaultValue={sector}
                                error={errors?.sector}
                            />
                            <div className={classes.inputPlaceholder}></div>
                        </>)}
                        {auth.type === AccountTypes.Type.RESPONDENT && (<>
                            <TextInput
                                className={classes.input}
                                inputProps={{
                                    wrapper: {
                                        className: classes.bankInputWrapper,
                                    }
                                }}
                                name="bankAccountNumber"
                                placeholder={t('personalData.bankAccountNumber')}
                                defaultValue={bankAccountNumber}
                            />
                            <NumericalInput
                                className={classes.input}
                                name="birthYear"
                                label={t('personalData.birthYear')}
                                defaultValue={birthYear || 0}
                                error={errors?.birthYear}
                            />
                            <TextInput
                                className={classes.input}
                                name="province"
                                placeholder={t('personalData.province')}
                                defaultValue={province}
                                error={errors?.province}
                            />
                            <TextInput
                                className={classes.input}
                                name="city"
                                placeholder={t('personalData.city')}
                                defaultValue={city}
                                error={errors?.city}
                            />
                            <TextInput
                                className={classes.input}
                                name="zipCode"
                                placeholder={t('personalData.zipCode')}
                                defaultValue={zipCode}
                                error={errors?.zipCode}
                            />
                            <TextInput
                                className={classes.input}
                                name="street"
                                placeholder={t('personalData.street')}
                                defaultValue={street}
                                error={errors?.street}
                            />
                            <TextInput
                                className={classes.input}
                                name="profession"
                                placeholder={t('personalData.profession')}
                                defaultValue={profession}
                                error={errors?.profession}
                            />
                            <TextInput
                                className={classes.input}
                                name="specialization"
                                placeholder={t('personalData.specialization')}
                                defaultValue={specialization}
                                error={errors?.specialization}
                            />
                            <div className={classes.childrenWrapper}>
                                <Checkbox
                                    className={classes.checkbox}
                                    name="hasChildren"
                                    label={t('personalData.hasChildren')}
                                    defaultValue={!!hasChildren}
                                    onChange={() => setHasChildren(state => !state)}
                                />
                                {hasChildren ? (
                                    <NumericalInput
                                        className={classes.input}
                                        name="childrenCount"
                                        label={t('personalData.childrenCount')}
                                        defaultValue={childrenCount || 0}
                                        error={errors?.childrenCount}
                                    />
                                ) : (
                                    <div className={classes.inputPlaceholder}></div>
                                )}
                            </div>
                            <DropdownList
                                className={classes.dropdown}
                                listClassName={classes.dropdownList}
                                name={t('personalData.martialStatus')}
                                elementsList={MARTIAL_STATUSES.map(s => t(`martialStatuses.${s}`))}
                                onChange={(i) => setMartialStatus(MARTIAL_STATUSES[i])}
                                defaultIndex={profileData.martialStatus
                                    ? MARTIAL_STATUSES.indexOf(profileData.martialStatus)
                                    : 0
                                }
                            />
                            {martialStatus && (
                                <input type="hidden" name="martialStatus" value={martialStatus} />
                            )}
                        </>)}
                        <DropdownList
                            className={classes.dropdown}
                            listClassName={classes.dropdownList}
                            name={t('personalData.selectGender')}
                            elementsList={GENDERS.map(s => t(`genders.${s}`))}
                            onChange={(i) => setGender(GENDERS[i])}
                            defaultIndex={profileData.gender
                                ? GENDERS.indexOf(profileData.gender)
                                : 0
                            }
                            allowDeselect={false}
                        />
                        <input type="hidden" name="gender" value={gender} />
                    </div>
                </div>
                <SubmitButton
                    className={classes.submitButton}
                    text={t('personalData.save')}
                />
                <input type="hidden" name="newsletter" value={newsletter}/>
                <input type="hidden" name="type" value="personalData"/>
            </Form>
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
                        onChange={() => setNewsletter(state => !state)}
                    />
                    <span className={classes.text}>
                        {t('join.page3.inputs.newsletterDetails')}
                    </span>
                </Form>
                <div className={classes.subformsWrapper}>
                    {auth.type === AccountTypes.Type.RESPONDENT && (
                        <Form
                            ref={cvFormRef}
                            method="post"
                            className={classes.cvUploader}
                        >
                            <h6 className={classes.subtitle}>
                                Manage your CV
                            </h6>
                            {profileData.cvUrl && (
                                <a
                                    className={classes.cvLink}
                                    href={profileData.cvUrl}
                                >
                                    Download current
                                </a>
                            )}
                            or upload new
                            <input 
                                id="cvFile"
                                type="file"
                                name="cvFile"
                                accept=".pdf"
                                onChange={() => submit(cvFormRef.current)}
                            />
                            <input type="hidden" name="type" value="cvUpload" />
                        </Form>
                    )}
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
            </div>
        </section>
    );
};

export default PersonalDataPage;