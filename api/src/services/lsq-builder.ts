import xmlbuilder from 'xmlbuilder';


const QUESTIONS_FIELDS = [
    'qid', 'parent_qid', 'sid', 'gid',
    'type', 'title', 'preg', 'other',
    'mandatory', 'encrypted', 'question_order',
    'scale_id', 'same_default', 'relevance',
    'question_theme_name', 'modulename', 'same_script'
];
const L10NS_FIELDS = ['id', 'qid', 'question', 'help', 'script', 'language'];
const ANSWERS_FIELDS = ['aid', 'qid', 'code', 'sortorder', 'assessment_value', 'scale_id'];
const ANSWER_L10NS_FIELDS = ['id', 'aid', 'answer', 'language'];
const SUBQUESTIONS_EXTRA_FIELDS = ['id', 'question', 'help', 'script', 'language'];

export default class LSQBuilder {
    private root: xmlbuilder.XMLElement;

    buildLSQ = (
        questionsInputParams: {
            [k: string]: string | string[],
        }, subquestionsParams: {
            [k: string]: string,
        }, extraParams: {
            checkboxes: { [k: string]: string }[],
            dropdowns: { [k: string]: string }[],
        }) => {
            const { languages } = questionsInputParams;
            const allQuestionsParams = this._getAllQuestionsParams(
                questionsInputParams
            );
            const allSubquestionsParams = this._getAllSubquestionsParams(
                subquestionsParams
            );
            const allL10NSParams = this._getAllL10NSParams(questionsInputParams);

            this._initLSQFile(languages);   
            this._generateQuestionsSection(allQuestionsParams);        
    
            if (questionsInputParams.type === 'M') {
                this._generateChekboxes(
                    allQuestionsParams,
                    allSubquestionsParams,
                    extraParams.checkboxes,
                );
            }
    
            this._generateQuestionL10NSSection(allL10NSParams);

            if (questionsInputParams.type === '!') {
                this._generateDropdown(
                    allQuestionsParams,
                    extraParams,
                );
            }
    
            return this.root.end({ pretty: true });
        }

    private _getAllQuestionsParams = (questionsParams) => {
        const allQuestionsParams: { [key: string]: string } = {};
        QUESTIONS_FIELDS.forEach(
            field => allQuestionsParams[field] = questionsParams[field] || ''
        );

        return allQuestionsParams;
    };

    private _getAllSubquestionsParams = (subquestionsParams) => {
        const allSubquestionsParams: { [key: string]: string } = {};
        QUESTIONS_FIELDS.forEach(
            field => allSubquestionsParams[field] = subquestionsParams[field] || ''
        );
        SUBQUESTIONS_EXTRA_FIELDS.forEach(
            field => allSubquestionsParams[field] = subquestionsParams[field] || ''
        );
        return allSubquestionsParams;
    };

    private _getAllL10NSParams = (questionsInputParams) => {
        const l10nsParams: { [key: string]: { [key: string]: string } } = {};
        const languages = Object.keys(questionsInputParams.question);

        for (const language of languages) {
            l10nsParams[language] = {};
            L10NS_FIELDS.forEach(field => {
                if (field === 'language') {
                    l10nsParams[language][field] = language;
                } else if (field === 'question') {
                    l10nsParams[language][field] = questionsInputParams.question[language];
                } else {
                    l10nsParams[language][field] = questionsInputParams[field] || ''
                }
            });
        }

        return l10nsParams;
    };

    private _initLSQFile = (languages) => {
        this.root = xmlbuilder.create('document');
        this.root.e('LimeSurveyDocType', {}, 'Question');
        this.root.e('DBVersion', {}, '606');

        const languagesElement = this.root.e('languages');
        for (const language of languages) {
            languagesElement.e('language', {}, language);
        }
    };

    private _generateQuestionsSection = (
        allQuestionsParams: { [key: string]: string }
    ) => {
        const questions = this.root.e('questions');
        const questionsFields = questions.e('fields');
        Object.keys(allQuestionsParams).forEach(
            param => questionsFields.e('fieldname', {}, param)
        );
        const questionsRow = questions.e('rows').e('row');
        Object.entries(allQuestionsParams).forEach(
            ([param, value]) => questionsRow.e(param).dat(value || '')
        );
    };

    private _generateQuestionL10NSSection = (
        allL10NSParams: { [key: string]: { [key: string]: string } }
    ) => {
        const questionL10NS = this.root.e('question_l10ns');

        const ql10nsFields = questionL10NS.e('fields');
        L10NS_FIELDS.forEach(
            field => ql10nsFields.e('fieldname', {}, field)
        );

        const ql10nwRows = questionL10NS.e('rows');
        for (const language of Object.keys(allL10NSParams)) {
            const ql10nsRow = ql10nwRows.e('row');
            Object.entries(allL10NSParams[language]).forEach(
                ([param, value]) => ql10nsRow.e(param).dat(value || '')
            );
        }
    };

    private _generateChekboxes = (
        allQuestionsParams: {
            [k: string]: string,
        },
        allSubquestionsParams: {
            [k: string]: string,
        },
        checkboxes: { [k: string]: string }[],
    ) => {
        const subquestions = this.root.e('subquestions');
        const subquestionsFields = subquestions.e('fields');
        QUESTIONS_FIELDS.forEach(
            param => subquestionsFields.e('fieldname', {}, param)
        );
        SUBQUESTIONS_EXTRA_FIELDS.forEach(field => subquestionsFields.e('fieldname', {}, field));

        const subquestionsRows = subquestions.e('rows');
        checkboxes.forEach((checkbox, i) => {
            Object.keys(checkbox).forEach(language => {
                const row = subquestionsRows.e('row');

                Object.entries(allSubquestionsParams).forEach(([param, value]) => {
                    let actualValue = value;
                    if (param === 'title' || param === 'qid') {
                        actualValue = ''+i;
                    } else if (param === 'question') {
                        actualValue = checkbox[language];
                    } else if (param === 'language') {
                        actualValue = language;
                    }
                    row.e(param).dat(actualValue || '')
                });
            });
        });
    };

    
    private _generateDropdown = (
        allQuestionsParams: {
            [k: string]: string,
        }, extraParams: {
            dropdowns: { [k: string]: string }[],
        }) => {
            const { dropdowns } = extraParams;
            
            const answersElement = this.root.e('answers');
            const answersFieldElement = answersElement.e('fields');
            ANSWERS_FIELDS.forEach(field => answersFieldElement.e('fieldname', {}, field));

            const answersRowsElement = answersElement.e('rows');
            dropdowns.forEach((_, i) => {
                const rowElement = answersRowsElement.e('row');
                const dropdownOptionProperties = this._generateDropdownAnswerProperties(i, allQuestionsParams.qid);
                
                ANSWERS_FIELDS.forEach(field => rowElement.e(field).dat(dropdownOptionProperties[field]));
            });
            
            const answerL10NS = this.root.e('answer_l10ns');
            const answerL10NSFieldElement = answerL10NS.e('fields');
            ANSWER_L10NS_FIELDS.forEach(field => answerL10NSFieldElement.e('fieldname', {}, field));
            const answerL10NSRowsElement = answerL10NS.e('rows');
            dropdowns.forEach((dropdown, i) => {
                Object.keys(dropdown).forEach(language => {
                    const rowElement = answerL10NSRowsElement.e('row');
                    const dropdownOptionProperties = this._generateDropdownAnswerL10NSProperties(i, dropdown[language], language);
                    
                    ANSWER_L10NS_FIELDS.forEach(field => rowElement.e(field).dat(dropdownOptionProperties[field]));
                });
            });
        }
        
        private _generateDropdownAnswerProperties = (i, qid) => {
            return {
                aid: i,
                qid,
                code: i,
                sortorder: i,
                assessment_value: 0,
                scale_id: 0,
            };
        }
    
        private _generateDropdownAnswerL10NSProperties = (i, optionName, language) => {
            return {
                id: i,
                aid: i,
                answer: optionName,
                language,
            };
        }
}