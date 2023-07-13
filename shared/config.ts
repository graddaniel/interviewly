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
        research: {
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
        },
    }
};

export default config;