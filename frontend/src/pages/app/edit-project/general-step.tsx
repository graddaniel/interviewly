import React from 'react';

import TextInput from '../../../components/text-input/text-input';

import classes from './general-step.module.css';
import ParagraphIconBlack from 'images/paragraph-icon-black.svg';
import PictureIconBlack from 'images/picture-icon-black.svg';
import StepTitle from './step-title';
import { useActionData } from 'react-router-dom';


const GeneralStep = ({
    project,
}) => {
    const actionData = useActionData() as any;

    const errors = actionData?.errors || {};

    return (
        <section className={classes.step}>
            <section className={classes.section}>
                <StepTitle
                    title="Please provide the project name"
                    icon={ParagraphIconBlack}
                />
                <TextInput
                    className={classes.titleInput}
                    inputProps={{
                        input: {
                            className: classes.titleInputElement,
                        },
                        wrapper: {
                            className: classes.titleInputWrapper,
                        },
                    }}
                    name="title"
                    placeholder="Project name"
                    error={errors.title}
                    defaultValue={project.title}
                />
                <TextInput
                    inputProps={{
                        input: {
                            className: classes.descriptionInputElement,
                        },
                    }}
                    name="description"
                    placeholder="Description (optional)"
                    multiline={true}
                    error={errors.description}
                    defaultValue={project.description}
                />
            </section>
            <section className={classes.section}>
                <StepTitle
                    title="Upload the Avatar"
                    icon={PictureIconBlack}
                />
                <input type="file" name="avatarFile" id="avatarFile" />
            </section>
        </section>
    );
};

export default GeneralStep;