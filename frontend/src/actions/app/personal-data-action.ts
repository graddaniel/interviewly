import { AccountTypes } from "shared";
import { getAuth } from "../../hooks/useAuth";
import AuthService from "../../services/auth-service";
import ProfileService from "../../services/profile-service";
import PersonalDataValidator from "../../validators/personal-data-validator";


export default async function PersonalDataAction({
    request,
}) {
    const formData = Object.fromEntries(await request.formData());

    const { type } = formData;

    switch (type) {
        case 'changePassword':
            return changePassword(formData);
        case 'personalData':
            return updatePersonalData(formData);
        case 'cvUpload':
            return uploadCV();
        case 'otherFilesUpload':
            return uploadOtherFiles();
        default:
            console.error('Unrecognized action type.');
    }

    return {
        success: true,
    };
}

async function changePassword(formData: any) {
    const {
        currentPassword,
        newPassword,
    } = formData;

    try {
        await PersonalDataValidator.validatePasswordChange(formData);
    } catch (errors) {
        return {
            success: false,
            errors,
        };
    }

    try {
        await AuthService.changePassword(currentPassword, newPassword);
    } catch (error) {
        return {
            success: false,
            error,
        };
    }

    return {
        success: true,
        path: 'passwordChange'
    }
}

async function updatePersonalData(formData: any) {
    const auth = getAuth();
    console.log(formData)
    const {
        name,
        surname,
        phoneNumber,
        gender,
        sector,
        newsletter,
        bankAccountNumber,
        birthYear,
        province,
        city,
        zipCode,
        street,
        profession,
        specialization,
        martialStatus,
        hasChildren,
        childrenCount,
    } = formData;

    const personalData: any = {
        name,
        surname,
        gender,
        phoneNumber,
        // this checkbox comes from react state
        newsletter: newsletter === "false" ? false : true,
    };

    if (auth.currentUser?.type === AccountTypes.Type.RECRUITER) {
        personalData.sector = sector;
    } else {
        personalData.bankAccountNumber = bankAccountNumber;
        const birthYearNumber = parseInt(birthYear, 10);
        if (birthYearNumber) {
            personalData.birthYear = birthYearNumber;
        }
        personalData.province = province;
        personalData.city = city;
        personalData.zipCode = zipCode;
        personalData.street = street;
        personalData.profession = profession;
        personalData.specialization = specialization;
        if (martialStatus) {
            personalData.martialStatus = martialStatus;
        }
        // this checkbox comes directly from checkbox without react state
        personalData.hasChildren = hasChildren ? true : false;
        if (personalData.hasChildren) {
            personalData.childrenCount = parseInt(childrenCount, 10);
        } else {
            personalData.childrenCount = 0;
        }
    }

    try {
        auth.currentUser?.type === AccountTypes.Type.RECRUITER
        ? await PersonalDataValidator.validateRecruiterPersonalDataUpdate(personalData)
        : await PersonalDataValidator.validateRespondentPersonalDataUpdate(personalData);
    } catch (errors) {
        return {
            success: false,
            errors,
        };
    }

    try {
        await ProfileService.updateProfile(personalData);
    } catch (error) {
        return {
            success: false,
            error,
        };
    }

    return {
        success: true,
        path: 'personalData'
    }
}

async function uploadCV() {
    try {
        const uploadUrl = await ProfileService.getCVUploadUrl();

        const cvFiles = (document.getElementById("cvFile") as HTMLInputElement).files;
        if (!cvFiles || cvFiles.length < 1) {
            console.error('CV file not found')
            return {
                success: false,
            }
        }

        await ProfileService.uploadCV(uploadUrl, cvFiles[0]);

    } catch (error) {
        return {
            success: false,
            error,
        }
    }    

    return {
        success: true,
        path: 'cvUpload'
    };
}

async function uploadOtherFiles() {
    try {
        const uploadUrl = await ProfileService.getOtherFilesUploadUrl();

        const otherFiles = (document.getElementById("otherFiles") as HTMLInputElement).files;
        if (!otherFiles || otherFiles.length < 1) {
            console.error('Other files not found')
            return {
                success: false,
            }
        }

        await ProfileService.uploadOtherFiles(uploadUrl, otherFiles[0]);

    } catch (error) {
        return {
            success: false,
            error,
        }
    }    

    return {
        success: true,
        path: 'otherFilesUpload'
    };
}