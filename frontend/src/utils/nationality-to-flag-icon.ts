import { ProfileTypes } from 'shared';

import {
    BulgarianFlagIcon,
    CzechFlagIcon,
    DutchFlagIcon,
    BritishFlagIcon,
    FrenchFlagIcon,
    GermanFlagIcon,
    GreekFlagIcon,
    HungarianFlagIcon,
    ItalianFlagIcon,
    PolishFlagIcon,
    PortugueseFlagIcon,
    RomanianFlagIcon,
    RussianFlagIcon,
    SlovakianFlagIcon,
    SpanishFlagIcon,
    SwedishFlagIcon,
    UkrainianFlagIcon,
} from '../../images/flag-icons';

export default function nationalityToFlagIcon (nationality: ProfileTypes.Nationality) {
    switch (nationality) {
        case ProfileTypes.Nationality.Bulgarian:
            return BulgarianFlagIcon;
        case ProfileTypes.Nationality.Czech:
            return CzechFlagIcon;
        case ProfileTypes.Nationality.Dutch:
            return DutchFlagIcon;
        case ProfileTypes.Nationality.British:
            return BritishFlagIcon;
        case ProfileTypes.Nationality.French:
            return FrenchFlagIcon;
        case ProfileTypes.Nationality.German:
            return GermanFlagIcon;
        case ProfileTypes.Nationality.Greek:
            return GreekFlagIcon;
        case ProfileTypes.Nationality.Hungarian:
            return HungarianFlagIcon;
        case ProfileTypes.Nationality.Italian:
            return ItalianFlagIcon;
        case ProfileTypes.Nationality.Polish:
            return PolishFlagIcon;
        case ProfileTypes.Nationality.Portuguese:
            return PortugueseFlagIcon;
        case ProfileTypes.Nationality.Romanian:
            return RomanianFlagIcon;
        case ProfileTypes.Nationality.Russian:
            return RussianFlagIcon;
        case ProfileTypes.Nationality.Slovak:
            return SlovakianFlagIcon;
        case ProfileTypes.Nationality.Spanish:
            return SpanishFlagIcon;
            case ProfileTypes.Nationality.Swedish:
            return SwedishFlagIcon;
        case ProfileTypes.Nationality.Ukrainian:
            return UkrainianFlagIcon;
        default:
            console.error('Incorrect nationality value');
            return '';
    }
}