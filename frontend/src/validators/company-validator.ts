import {
    object,
} from 'yup';
import { ValidationSchemas } from 'shared';

import validateParams from './validate-params';


export default class CompanyValidator {
    static validateData = async (companyData) => {
        const schemas = ValidationSchemas.instance();

        const companyValidator = object({
            taxIdNumber: schemas.company.taxIdNumber,
            country: schemas.address.country,
            city: schemas.address.city,
            street: schemas.address.street,
            buildingNumber: schemas.address.buildingNumber,
            unitNumber: schemas.address.unitNumber,
            postalCode: schemas.address.postalCode,
        });

        const errors: any = await validateParams(
            companyValidator,
            companyData,
        );

        if (Object.keys(errors).length > 0) {
            throw errors;
        }          
    }
}