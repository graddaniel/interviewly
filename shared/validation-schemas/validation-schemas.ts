import {
    string,
    number,
} from 'yup';
import i18next from 'i18next';

import { ErrorCodes, ErrorsTranslations } from '../errors';
import { AccountTypes, ProfileTypes } from '../types';
import { Duration, Methodology, PaymentCurrency } from '../types/research';
import config from '../config'; 

import type { Schema } from 'yup'; 


const validationConfig = config.validation;

const { t } = i18next;

export default class ValidationSchemas {
    private static _instance: ValidationSchemas;
    currentLanguage: string;
    email: Schema;
    accountName: Schema;
    accountSurname: Schema;
    accountType: Schema;
    accountPassword: Schema;
    accountRole: Schema;
    accountStatus: Schema;
    gender: Schema;
    companyName: Schema;
    research: {
        title: Schema;
        description: Schema;
        methodology: Schema;
        participantsCount: Schema;
        reserveParticipantsCount: Schema;
        meetingDuration: Schema;
        participantsPaymentValue: Schema;
        participantsPaymentCurrency: Schema;
    };
    contactRequestMessage: Schema;

    static instance = () => {
        if (!ValidationSchemas._instance) {
            ValidationSchemas._instance = new ValidationSchemas();
            ValidationSchemas._instance.init('en');
        }

        return ValidationSchemas._instance;
    }

    init = async (languageCode: string) => {
        await i18next.init({
            lng: languageCode,
            debug: true,
            resources: ErrorsTranslations,
        });

        this.resetSchemas();
    }

    resetSchemas = () => {
        this.email = string()
            .required(`${ErrorCodes.AccountEmailRequired}`)
            .email(`${ErrorCodes.AccountEmailIncorrect}`);

        this.accountName = string()
            .required(`${ErrorCodes.AccountNameRequired}`)
            .min(validationConfig.name.minLength, `${ErrorCodes.AccountNameTooShort}`)
            .max(validationConfig.name.maxLength, `${ErrorCodes.AccountNameTooLong}`);

        this.accountSurname = string()
            .required(`${ErrorCodes.AccountSurnameRequired}`)
            .min(validationConfig.surname.minLength,`${ErrorCodes.AccountSurnameTooShort}`)
            .max(validationConfig.surname.maxLength, `${ErrorCodes.AccountSurnameTooLong}`);

        this.accountType = string()
            .required(`${ErrorCodes.AccountTypeRequired}`)
            .oneOf(Object.values(AccountTypes.Type), `${ErrorCodes.AccountTypeIncorrect}`);

        this.gender = string()
            .required(`${ErrorCodes.AccountGenderRequired}`)
            .oneOf(Object.values(ProfileTypes.Gender), `${ErrorCodes.AccountGenderIncorrect}`);

        this.accountPassword = string()
            .required(`${ErrorCodes.AccountPasswordRequired}`)
            .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, `${ErrorCodes.AccountPasswordIncorrect}`)
            .min(validationConfig.password.minLength, `${ErrorCodes.AccountPasswordTooShort}`)
            .max(validationConfig.password.maxLength, `${ErrorCodes.AccountPasswordTooLong}`);
            //TODO move the regexp to JSON, but make sure it's correctly escaped

        this.accountRole = string()
            .required(`${ErrorCodes.AccountRoleRequired}`)
            .oneOf(Object.values(ProfileTypes.Role), `${ErrorCodes.AccountRoleIncorrect}`);

        this.accountStatus = string()
            .required(`${ErrorCodes.AccountStatusRequired}`)
            .oneOf(Object.values(AccountTypes.Status), `${ErrorCodes.AccountStatusIncorrect}`);

        this.companyName = string()
            .min(validationConfig.companyName.minLength, `${ErrorCodes.AccountCompanyNameTooShort}`)
            .max(validationConfig.companyName.maxLength, `${ErrorCodes.AccountCompanyNameTooLong}`);

        this.research = {
            title: string()
                .required(`${ErrorCodes.ResearchTitleRequired}`)
                .matches(new RegExp(validationConfig.research.title.regexp), `${ErrorCodes.ResearchTitleIncorrect}`)//todo verify
                .min(validationConfig.research.title.minLength, `${ErrorCodes.ResearchTitleTooShort}`)
                .max(validationConfig.research.title.maxLength, `${ErrorCodes.ResearchTitleTooLong}`),
            description: string()
                .min(validationConfig.research.description.minLength, `${ErrorCodes.ResearchDescriptionTooShort}`)
                .max(validationConfig.research.description.maxLength, `${ErrorCodes.ResearchDescriptionTooLong}`),
            methodology: string()
                .required(`${ErrorCodes.ResearchMethodologyRequired}`)
                .oneOf(Object.values(Methodology), `${ErrorCodes.ResearchMethodologyIncorrect}`),
            participantsCount: number()
                .required(`${ErrorCodes.ResearchParticipantsCountRequried}`)
                .min(validationConfig.research.participantsCount.min, `${ErrorCodes.ResearchParticipantsCountTooLow}`)
                .max(validationConfig.research.participantsCount.max, `${ErrorCodes.ResearchParticipantsCountTooHigh}`),
            reserveParticipantsCount: number()
                .required(`${ErrorCodes.ResearchReserveParticipantsCountRequired}`)
                .min(validationConfig.research.reserveParticipantsCount.min, `${ErrorCodes.ResearchReserveParticipantsCountTooLow}`)
                .max(validationConfig.research.reserveParticipantsCount.max, `${ErrorCodes.ResearchReserveParticipantsCountTooHigh}`),
            meetingDuration: string()
                .required(`${ErrorCodes.ResearchMeetingDurationRequried}`)
                .oneOf(Object.values(Duration), `${ErrorCodes.ResearchMeetingDurationIncorrect}`),
            participantsPaymentCurrency: string()
                .required(`${ErrorCodes.ResearchParticipantsPaymentCurrencyRequired}`)
                .oneOf(Object.values(PaymentCurrency), `${ErrorCodes.ResearchParticipantsPaymentCurrencyIncorrect}`),
            participantsPaymentValue: number()
                .required(`${ErrorCodes.ResearchParticipantsPaymentValueRequired}`)
                .min(validationConfig.research.participantsPaymentValue.min, `${ErrorCodes.ResearchParticipantsPaymentValueTooLow}`),
        };

        this.contactRequestMessage = string()
            .required(`${ErrorCodes.ContactRequestMessageRequired}`)
            .min(validationConfig.contactRequest.min, `${ErrorCodes.ContactRequestMessageTooShort}`)
            .max(validationConfig.contactRequest.max, `${ErrorCodes.ContactRequestMessageTooLong}`);
    }

    decodeError = (errorCode: string) => {
        return t(errorCode);
    }

    changeLanguage = async (languageCode: string) => {
        this.currentLanguage = languageCode;

        await i18next.changeLanguage(languageCode);

        this.resetSchemas();
    }
}