import { kMaxLength } from "buffer";

const config = {
    "validation": {
        "password": {
            "minLength": 8,
            "maxLength": 32
        },
        "name": {
            "minLength": 1,
            "maxLength": 32,
            "regexp": "^[A-Za-z ]+$"
        },
        "surname": {
            "minLength": 1,
            "maxLength": 32,
            "regexp": "^[A-Za-z]+$"
        },
        "companyName": {
            "minLength": 1,
            "maxLength": 32,
            "regexp": "^[A-Za-z ]+$"
        },
        "address": {
            "country": {
                "minLength": 2,
                "maxLength": 32
            },
            "city": {
                "minLength": 1,
                "maxLength": 128
            },
            "street": {
                "maxLength": 32
            },
            "buildingNumber": {
                "minLength": 1,
                "maxLength": 5
            },
            "unitNumber": {
                "maxLength": 5
            },
            "postalCode": {
                "minLength": 3,
                "maxLength": 7
            }
        },
        "company": {
            "name": {
                "minLength": 1,
                "maxLength": 32,
                "regexp": "^[A-Za-z ]+$"
            },
            "taxIdNumber": {
                "maxLength": 13
            }
        },
        project: {
            title: {
                minLength: 1,
                maxLength: 64,
                regexp: "^[A-Za-z0-9 ]+$"
            },
            description: {
                minLength: 0,
                maxLength: 512,
            },
            participantsCount: {
                min: 1,
                max: 9999,
            },
            reserveParticipantsCount: {
                min: 0,
                max: 99999,
            },
            participantsPaymentValue: {
                min: 0,
            },
            otherRequirements: {
                max: 512,
            },
        },
        contactRequest: {
            min: 32,
            max: 512,
        }
    }
};

export default config;