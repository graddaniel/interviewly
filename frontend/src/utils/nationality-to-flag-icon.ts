import { ProfileTypes } from 'shared';

import {
    BritishFlagIcon,
    FrenchFlagIcon,
    PolishFlagIcon,
} from '../../images/flag-icons';

export default function nationalityToFlagIcon (nationality: ProfileTypes.Nationality) {
    switch (nationality) {
        case ProfileTypes.Nationality.British:
            return BritishFlagIcon;
        case ProfileTypes.Nationality.French:
            return FrenchFlagIcon;
        case ProfileTypes.Nationality.Polish:
            return PolishFlagIcon;
        default:
            console.error('Incorrect nationality value');
            return '';
    }
}