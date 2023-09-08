import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import bg from './translations/bg.json';
import cs from './translations/cs.json';
import de from './translations/de.json';
import el from './translations/el.json';
import en from './translations/en.json';
import es from './translations/es.json';
import fr from './translations/fr.json';
import hu from './translations/hu.json';
import it from './translations/it.json';
import nl from './translations/nl.json';
import pl from './translations/pl.json';
import pt from './translations/pt.json';
import ro from './translations/ro.json';
import sk from './translations/sk.json';
import sv from './translations/sv.json';
import uk from './translations/uk.json';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'en',
        resources: {
            bg,
            cs,
            de,
            el,
            en,
            es,
            fr,
            hu,
            it,
            nl,
            pl,
            pt,
            ro,
            sk,
            sv,
            uk
        },
    });

export default i18n;



