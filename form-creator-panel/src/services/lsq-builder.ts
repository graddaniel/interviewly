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
        const l10nsParams: { [key: string]: string } = {};
        L10NS_FIELDS.forEach(
            field => l10nsParams[field] = questionsInputParams[field] || ''
        );

        return l10nsParams;
    };

    private _initLSQFile = () => {
        this.root = xmlbuilder.create('document');
        this.root.e('LimeSurveyDocType', {}, 'Question');
        this.root.e('DBVersion', {}, '606');
        this.root.e('languages').e('language', {}, 'en');
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
        allL10NSParams: { [key: string]: string }
    ) => {
        const questionL10NS = this.root.e('question_l10ns');

        const ql10nsFields = questionL10NS.e('fields');
        Object.keys(allL10NSParams).forEach(
            param => ql10nsFields.e('fieldname', {}, param)
        );

        const ql10nsRow = questionL10NS.e('rows').e('row');
        Object.entries(allL10NSParams).forEach(
            ([param, value]) => ql10nsRow.e(param).dat(value || '')
        );
    };

    private _generateChekboxes = (
        allQuestionsParams: {
            [k: string]: string,
        }, allSubquestionsParams: {
            [k: string]: string,
        }, extraParams: {
            checkboxes: string[],
        }) => {
        const { checkboxes } = extraParams;
        const subquestions = this.root.e('subquestions');
        const subquestionsFields = subquestions.e('fields');
        Object.keys(allQuestionsParams).forEach(
            param => subquestionsFields.e('fieldname', {}, param)
        );
        SUBQUESTIONS_EXTRA_FIELDS.forEach(field => subquestionsFields.e('fieldname', {}, field));

        const subquestionsRows = subquestions.e('rows');
        checkboxes.forEach((checkbox, i) => {
            const row = subquestionsRows.e('row');

            Object.entries(allSubquestionsParams).forEach(([param, value]) => {
                let actualValue = value;
                if (param === 'title' || param === 'qid') {
                    actualValue = ''+i;
                } else if (param === 'question') {
                    actualValue = checkbox;
                } else if (param === 'language') {
                    actualValue = 'en';
                }
                row.e(param).dat(actualValue || '')
            });
        });
    };

    private _generateDropdownAnswerProperties = (i, qid, optionValue ) => {
        return {
            aid: i,
            qid,
            code: optionValue,
            sortorder: i,
            assessment_value: 0,
            scale_id: 0,
        };
    }

    private _generateDropdownAnswerL10NSProperties = (i, optionName, language = 'en') => {
        return {
            id: i,
            aid: i,
            answer: optionName,
            language,
        };
    }

    private _generateDropdown = (
        allQuestionsParams: {
            [k: string]: string,
        }, allSubquestionsParams: {
            [k: string]: string,
        }, extraParams: {
            checkboxes: string[],
            dropdownOptions: [string, string][],
        }) => {
            const { dropdownOptions } = extraParams;

            const answersElement = this.root.e('answers');
            const answersFieldElement = answersElement.e('fields');
            ANSWERS_FIELDS.forEach(field => answersFieldElement.e('fieldname', {}, field));

            const answersRowsElement = answersElement.e('rows');
            dropdownOptions.forEach(([, value], i) => {
                const rowElement = answersRowsElement.e('row');
                const dropdownOptionProperties = this._generateDropdownAnswerProperties(i, allQuestionsParams.qid, value);

                ANSWERS_FIELDS.forEach(field => rowElement.e(field).dat(dropdownOptionProperties[field]));
            });

            const answerL10NS = this.root.e('answer_l10ns');
            const answerL10NSFieldElement = answerL10NS.e('fields');
            ANSWER_L10NS_FIELDS.forEach(field => answerL10NSFieldElement.e('fieldname', {}, field));
            const answerL10NSRowsElement = answerL10NS.e('rows');
            dropdownOptions.forEach(([name,], i) => {
                const rowElement = answerL10NSRowsElement.e('row');
                const dropdownOptionProperties = this._generateDropdownAnswerL10NSProperties(i, name);

                ANSWER_L10NS_FIELDS.forEach(field => rowElement.e(field).dat(dropdownOptionProperties[field]));
            });
    }

    buildLSQ = (
        questionsInputParams: {
            [k: string]: string,
        }, subquestionsParams: {
            [k: string]: string,
        }, extraParams: {
            checkboxes: string[],
            dropdownOptions: [string, string][],
        }) => {
            const allQuestionsParams = this._getAllQuestionsParams(
                questionsInputParams
            );
            const allSubquestionsParams = this._getAllSubquestionsParams(
                subquestionsParams
            );
            const allL10NSParams = this._getAllL10NSParams(questionsInputParams);

            this._initLSQFile();   
            this._generateQuestionsSection(allQuestionsParams);        
    
            if (questionsInputParams.type === 'M') {
                this._generateChekboxes(
                    allQuestionsParams,
                    allSubquestionsParams,
                    extraParams,
                );
            }
    
            this._generateQuestionL10NSSection(allL10NSParams);

            if (questionsInputParams.type === '!') {
                this._generateDropdown(
                    allQuestionsParams,
                    allSubquestionsParams,
                    extraParams,
                );
            }
    
            return this.root.end({ pretty: true });
        }
}