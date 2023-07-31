import { v4 as generateUuidV4 } from 'uuid';

import CompanyModel from '../../models/company';
import CompanyAlreadyExistsError from './errors/company-already-exists-error';
import AccountModel from '../../models/account';
import RecruiterProfile from '../../models/recruiter-profile';
import CompanyNotFound from './errors/company-not-found-error';
import SequelizeConnection from '../sequelize-connection';
import AddressModel from '../../models/address';


export default class CompaniesService {
    constructor () {

    }

    create = async (
        companyName: string,
    ): Promise<CompanyModel> => {
        const company = await CompanyModel.findOne({
            where: {
                name: companyName,
            }
        });

        if (company) {
            throw new CompanyAlreadyExistsError(companyName);
        }

        const newCompany = await CompanyModel.create({
            name: companyName,
            uuid: generateUuidV4(),
            Address: {},
        }, {
            include: [{
                association: CompanyModel.associations.AddressModel,
            }]
        });

        return newCompany;
    }

    getCompany = async (query): Promise<CompanyModel> => {
        const company = await CompanyModel.findOne({
            where: query,
        });

        if (!company) {
            throw new CompanyNotFound();
        }

        return company;
    }

    getCompanyDetails = async (companyUuid: string) => {
        const company = await this.getCompany({ uuid: companyUuid });
        const address = await company.getAddress();
    
        return CompanyMapper.mapCompanyAndAddressToCompanyDetails(company, address)
    }

    editCompanyDetails = SequelizeConnection.transaction(async (
        uuid: string,
        companyDetails,
    ) => {
        const company = await this.getCompany({ uuid });

        const {
            taxIdNumber,
            ...addressDetails
        } = companyDetails;

        await company.update({ taxIdNumber });

        const address = await company.getAddress();

        await address.update({
            country: addressDetails.country,
            city: addressDetails.city,
            street: addressDetails.street,
            buildingNumber: addressDetails.buildingNumber,
            unitNumber: addressDetails.unitNumber,
            postalCode: addressDetails.postalCode,
        });
    })

    getCompanyAccounts = async (
        companyUuid: string,
    ): Promise<CompanyModel[] | null> => {
        const companyAccounts = await CompanyModel.findAll({
            attributes: [],
            where: {
                uuid: companyUuid,
            },
            include: [{
                model: RecruiterProfile,
                attributes: ['name', 'surname', 'role', 'gender'],
                include: [{
                    attributes: ['uuid', 'email', 'status'],
                    model: AccountModel,
                }],
            }],
        });

        return CompanyMapper.flattenDBCompanyAccounts(companyAccounts);
    }

    getCompanyOfAccount = async (
        accountUuid: string
    ): Promise<CompanyModel | null> => {
        return CompanyModel.findOne({
            include: [{
                model: RecruiterProfile,
                include: [{
                    model: AccountModel,
                    where: {
                        uuid: accountUuid,
                    }
                }],
            }],
        });
    }
};

class CompanyMapper {
    static flattenDBCompanyAccounts = (companyAccounts: any[]) => {
        const accounts = companyAccounts.length > 0 ? companyAccounts[0].RecruiterProfiles : [];

        return accounts.map(a => ({
            uuid: a.Account.uuid,
            name: a.name,
            surname: a.surname,
            role: a.role,
            gender: a.gender,
            email: a.Account.email,
            status: a.Account.status,
        }));
    }

    static mapCompanyAndAddressToCompanyDetails = (
        company: CompanyModel,
        address: AddressModel,
    ) => {
        return {
            name: company.name,
            taxIdNumber: company.taxIdNumber,
            country: address.country,
            city: address.city,
            street: address.street,
            buildingNumber: address.buildingNumber,
            unitNumber: address.unitNumber,
            postalCode: address.postalCode,
        };
    }
}