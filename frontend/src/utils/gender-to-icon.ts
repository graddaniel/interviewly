import { ProfileTypes } from 'shared';

import MaleIconBlack from 'images/male-icon-black.svg';
import FemaleIconBlack from 'images/female-icon-black.svg';


export default function genderToIcon(gender: ProfileTypes.Gender) {
    switch (gender) {
        case ProfileTypes.Gender.MALE:
            return MaleIconBlack;
        case ProfileTypes.Gender.FEMALE:
            return FemaleIconBlack;
        default:
            console.error('Incorrect gender value');
            return '';
    }
}