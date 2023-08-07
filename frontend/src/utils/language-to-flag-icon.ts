import { ProfileTypes } from 'shared';
import nationalityToFlagIcon from './nationality-to-flag-icon';

const languageToNationalityMap = {
    English: ProfileTypes.Nationality.British,
    French: ProfileTypes.Nationality.French,
    Polish: ProfileTypes.Nationality.Polish,
};

export default function languageToFlagIcon(language: string) {
    const nationality = languageToNationalityMap[language];

    if (!nationality) {
        console.error('Unrecognized language!');
        return null;
    }

    return nationalityToFlagIcon(nationality);
}