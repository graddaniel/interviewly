import { ProfileTypes } from 'shared';
import nationalityToFlagIcon from './nationality-to-flag-icon';

const languageCodeToNationalityMap = {
    bg: ProfileTypes.Nationality.Bulgarian,
    cs: ProfileTypes.Nationality.Czech,
    nl: ProfileTypes.Nationality.Dutch,
    en: ProfileTypes.Nationality.British,
    fr: ProfileTypes.Nationality.French,
    de: ProfileTypes.Nationality.German,
    el: ProfileTypes.Nationality.Greek,
    hu: ProfileTypes.Nationality.Hungarian,
    it: ProfileTypes.Nationality.Italian,
    pl: ProfileTypes.Nationality.Polish,
    pt: ProfileTypes.Nationality.Portuguese,
    ro: ProfileTypes.Nationality.Romanian,
    ru: ProfileTypes.Nationality.Russian,
    sk: ProfileTypes.Nationality.Slovak,
    es: ProfileTypes.Nationality.Spanish,
    sv: ProfileTypes.Nationality.Swedish,
    uk: ProfileTypes.Nationality.Ukrainian,
};

export default function languageCodeToFlagIcon(code: string) {
    const nationality = languageCodeToNationalityMap[code];

    if (!nationality) {
        console.error('Unrecognized language!', code);
        return null;
    }

    return nationalityToFlagIcon(nationality);
}