import moment from "moment";
import i18n from "i18next"; 

export default function standardizeAndFormatDate(date: Date) {
    const { resolvedLanguage } = i18n;

    const momentDate = moment(date).locale(resolvedLanguage as string);
    const day = momentDate.format('dddd D MMMM');;
    const time = momentDate.format('LT');

    return {
        date: day,
        time
    }
} 