import {
    string,
    number,
} from 'yup';

import { ErrorCodes } from '../errors';
import { AccountTypes, ProfileTypes } from '../types';
import { Duration, Methodology, PaymentCurrency } from '../types/project';
import config from '../config'; 

import type { Schema } from 'yup'; 


const validationConfig = config.validation;


export default class ValidationSchemas {
    private static _instance: ValidationSchemas;
    email: Schema;
    accountName: Schema;
    accountSurname: Schema;
    accountType: Schema;
    accountPassword: Schema;
    accountRole: Schema;
    accountStatus: Schema;
    gender: Schema;
    companyName: Schema;
    address: {
        country: Schema;
        city: Schema;
        street: Schema;
        buildingNumber: Schema;
        unitNumber: Schema;
        postalCode: Schema;
    };
    company: {
        name: Schema;
        taxIdNumber: Schema;
    };
    project: {
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

        this.address = {
            country: string()
                .min(validationConfig.address.country.minLength, `${ErrorCodes.AddressCountryTooShort}`)
                .max(validationConfig.address.country.maxLength, `${ErrorCodes.AddressCountryTooLong}`),
            city: string()
                .min(validationConfig.address.city.minLength, `${ErrorCodes.AddressCityTooShort}`)
                .max(validationConfig.address.city.maxLength, `${ErrorCodes.AddressCityTooLong}`),
            street: string()
                .max(validationConfig.address.street.maxLength, `${ErrorCodes.AddressStreetTooLong}`),
            buildingNumber: string()
                .min(validationConfig.address.buildingNumber.minLength, `${ErrorCodes.AddressBuildingNumberTooShort}`)
                .max(validationConfig.address.buildingNumber.maxLength, `${ErrorCodes.AddressBuildingNumberTooLong}`),
            unitNumber: string()
                .max(validationConfig.address.unitNumber.maxLength, `${ErrorCodes.AddressUnitNumberTooLong}`),
            postalCode: string()
                .min(validationConfig.address.postalCode.minLength, `${ErrorCodes.AddressPostalCodeTooShort}`)
                .max(validationConfig.address.postalCode.maxLength, `${ErrorCodes.AddressCountryTooLong}`),
        };
            
        this.company = {
            name: string()
                .min(validationConfig.companyName.minLength, `${ErrorCodes.CompanyNameTooShort}`)
                .max(validationConfig.companyName.maxLength, `${ErrorCodes.CompanyNameTooLong}`),
                taxIdNumber: string().max(validationConfig.company.taxIdNumber.maxLength, `${ErrorCodes.CompanyTaxIdTooLong}`),
        };

        this.project = {
            title: string()
                .required(`${ErrorCodes.ProjectTitleRequired}`)
                .matches(new RegExp(validationConfig.project.title.regexp), `${ErrorCodes.ProjectTitleIncorrect}`)//todo verify
                .min(validationConfig.project.title.minLength, `${ErrorCodes.ProjectTitleTooShort}`)
                .max(validationConfig.project.title.maxLength, `${ErrorCodes.ProjectTitleTooLong}`),
            description: string()
                .min(validationConfig.project.description.minLength, `${ErrorCodes.ProjectDescriptionTooShort}`)
                .max(validationConfig.project.description.maxLength, `${ErrorCodes.ProjectDescriptionTooLong}`),
            methodology: string()
                .required(`${ErrorCodes.ProjectMethodologyRequired}`)
                .oneOf(Object.values(Methodology), `${ErrorCodes.ProjectMethodologyIncorrect}`),
            participantsCount: number()
                .required(`${ErrorCodes.ProjectParticipantsCountRequried}`)
                .min(validationConfig.project.participantsCount.min, `${ErrorCodes.ProjectParticipantsCountTooLow}`)
                .max(validationConfig.project.participantsCount.max, `${ErrorCodes.ProjectParticipantsCountTooHigh}`),
            reserveParticipantsCount: number()
                .required(`${ErrorCodes.ProjectReserveParticipantsCountRequired}`)
                .min(validationConfig.project.reserveParticipantsCount.min, `${ErrorCodes.ProjectReserveParticipantsCountTooLow}`)
                .max(validationConfig.project.reserveParticipantsCount.max, `${ErrorCodes.ProjectReserveParticipantsCountTooHigh}`),
            meetingDuration: string()
                .required(`${ErrorCodes.ProjectMeetingDurationRequried}`)
                .oneOf(Object.values(Duration), `${ErrorCodes.ProjectMeetingDurationIncorrect}`),
            participantsPaymentCurrency: string()
                .required(`${ErrorCodes.ProjectParticipantsPaymentCurrencyRequired}`)
                .oneOf(Object.values(PaymentCurrency), `${ErrorCodes.ProjectParticipantsPaymentCurrencyIncorrect}`),
            participantsPaymentValue: number()
                .required(`${ErrorCodes.ProjectParticipantsPaymentValueRequired}`)
                .min(validationConfig.project.participantsPaymentValue.min, `${ErrorCodes.ProjectParticipantsPaymentValueTooLow}`),
        };

        this.contactRequestMessage = string()
            .required(`${ErrorCodes.ContactRequestMessageRequired}`)
            .min(validationConfig.contactRequest.min, `${ErrorCodes.ContactRequestMessageTooShort}`)
            .max(validationConfig.contactRequest.max, `${ErrorCodes.ContactRequestMessageTooLong}`);
    }
}