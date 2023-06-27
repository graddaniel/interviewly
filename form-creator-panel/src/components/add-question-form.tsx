import React, { useState } from 'react';
import { Form, useParams } from 'react-router-dom';
import { Button, FormGroup } from '@mui/material';

import LSQBuilder from '../services/lsq-builder';


const AddQuestionForm = () => {
    const [ formType, setFormType ] = useState('Y');
    const [ title, setTitle ] = useState('');
    const [ question, setQuestion ] = useState('');
    const [ mandatory, setMandatory ] = useState('N');
    const [ newCheckbox, setNewCheckbox ] = useState('');
    const [ checkboxes, setCheckboxes ] = useState<string[]>([]);
    const [ dropdownName, setDropdownName ] = useState<string>('');
    const [ dropdownValue, setDropdownValue ] = useState<string>('');
    const [ dropdownOptions, setDropdownOptions ] = useState<[string, string][]>([]);
    const { surveyId, groupId } = useParams();

    const questionParams = {
        type: formType,//: 'Y', // MUST
        title,//: 'G01Q05',
        //question_order: '4', //ignored - make sure
        relevance: '1',
        //id: '19',
        question,//: 'Yes/No',
        language: 'en',
        qid: '14',
        parent_qid: '0',
        sid: surveyId || '',
        gid: groupId || '',
        //scale_id: '0',
        //same_default: '0',
        //question_theme_name: 'yesno',
        //encrypted: 'N',
        //same_script: '0',
        //other: 'N',
    };

    const extraParams = {
        type: 'T',
        parent_qid: '14',
        sid: '1',
        gid: '2',
    };

    const buildQuestionsFile = () => {
        const lsqBuilder = new LSQBuilder();

        const lsqFile = lsqBuilder.buildLSQ({
            ...questionParams,
            title,
            type: formType,
            question,
        }, extraParams, {
            checkboxes,
            dropdownOptions,
        });

        return lsqFile;
    }

    return (
        <Form
            method="post"
        >
            <select
                onChange={(event) => setFormType(event.target.value)}
                name="type"
                defaultValue={formType}
            >
                <option value={'Y'}>Yes/No</option>
                <option value={'T'}>Freetext</option>
                <option value={'N'}>Numerical</option>
                <option value={'M'}>Multiple choice</option>
                <option value={'!'}>Dropdown</option>
            </select>
            <input
                type="text"
                onChange={(event) => setTitle(event.target.value)}
                value={title}
                placeholder="title"
            />
            <input
                type="text"
                onChange={(event) => setQuestion(event.target.value)}
                value={question}
                placeholder="question"
            />
            {formType === 'M' && (
                <section>
                    <input
                        type="text"
                        onChange={(event) => setNewCheckbox(event.target.value)}
                        value={newCheckbox}
                        placeholder="new checkbox"
                    />
                    <Button onClick={() => setCheckboxes(checkboxes => ([...checkboxes, newCheckbox]))}>Add checkbox</Button>
                    {checkboxes.map((checkbox, i) => (
                        <div key={checkbox}>
                            {checkbox}
                            <Button onClick={() => setCheckboxes(checkboxes => {
                                const c = [...checkboxes];
                                c.splice(i, 1);
                                return c;
                            })}>Remove</Button>    
                        </div>
                    ))}
                </section>
            )}
            {formType === '!' && (
                <section>
                    <input
                        type="text"
                        onChange={(event) => setDropdownName(event.target.value)}
                        value={dropdownName}
                        placeholder="Dropdown name"
                    />
                    <input
                        type="text"
                        onChange={(event) => setDropdownValue(event.target.value)}
                        value={dropdownValue}
                        placeholder="Dropdown value"
                    />
                    <Button onClick={() => setDropdownOptions(options => ([...options, [dropdownName, dropdownValue]]))}>Add option</Button>
                    {dropdownOptions.map(([name, value], i) => (
                        <div key={name}>
                            {name}:{value}
                            <Button onClick={() => setDropdownOptions(options => {
                                const o = [...options];
                                o.splice(i, 1);
                                return o;
                            })}>Remove</Button>    
                        </div>
                    ))}
                </section>
            )}
            <FormGroup>
                Mandatory:
                <Button onClick={() => setMandatory('Y')} variant={mandatory === 'Y' ? 'outlined' : 'text'}>Yes</Button>
                <Button onClick={() => setMandatory('S')} variant={mandatory === 'S' ? 'outlined' : 'text'}>Soft</Button>
                <Button onClick={() => setMandatory('N')} variant={mandatory === 'N' ? 'outlined' : 'text'}>No</Button>
                <input type="hidden" name="mandatory" value={mandatory}/>
            </FormGroup>
            <input type="hidden" name="lsq" value={buildQuestionsFile()}/>
            <input type="submit" value="Add question"/>
        </Form>
    );
}

export default AddQuestionForm;