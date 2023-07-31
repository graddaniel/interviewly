import { ProfileTypes } from 'shared';

export default async function ProjectRespondentLoader() {
    return {
        name: 'Ewelina',
        surname: 'Izbicka',
        age: 24,
        gender: ProfileTypes.Gender.FEMALE,
        email: 'ewelina123@email.fr',
        nationality: ProfileTypes.Nationality.French,
        avatarUrl: 'https://i.pravatar.cc/99',
    };
}