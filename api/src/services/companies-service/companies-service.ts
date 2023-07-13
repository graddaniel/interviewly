import { v4 as generateUuidV4 } from 'uuid';

import CompanyModel from '../../models/company';
import CompanyAlreadyExistsError from './errors/company-already-exists-error';
import AccountModel from '../../models/account';
import RecruiterProfile from '../../models/recruiter-profile';
import CompanyNotFound from './errors/company-not-found-error';


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

        return CompanyMapper.mapDBCompanyAccountsToCompanyAccounts(companyAccounts);
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
    static mapDBCompanyAccountsToCompanyAccounts = (companyAccounts: any[]) => {
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
}