import {
    object,
} from 'yup';
import { ValidationSchemas } from 'shared';

import validate from './validate';


const schemas = ValidationSchemas.instance();

export default class CompaniesValidator {
    static async validateCompanyDetails(companyDetails) {
        const companyDetailsSchema = object({
            taxIdNumber: schemas.company.taxIdNumber,
            country: schemas.address.country,
            city: schemas.address.city,
            street: schemas.address.street,
            buildingNumber: schemas.address.buildingNumber,
            unitNumber: schemas.address.unitNumber,
            postalCode: schemas.address.postalCode,
        });

        await validate(companyDetailsSchema, companyDetails);

        return companyDetailsSchema.cast(companyDetails, { stripUnknown: true });
    }
}