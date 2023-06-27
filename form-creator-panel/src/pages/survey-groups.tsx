import React from 'react';
import {
    Button,
} from '@mui/material';
import {
    Form,
    useActionData,
    useLoaderData,
    useNavigate,
} from 'react-router-dom';

const SurveyGroups = () => {
    const surveyGroups = useLoaderData() as any[];
    const actionData = useActionData();
    const navigate = useNavigate();

    return (
        <section>
            {surveyGroups.length === 0 && (
                <div>No groups found</div>
            )}
            {surveyGroups.length > 0 && (
                <ul>
                    {surveyGroups.map(surveyGroup => (
                        <li key={surveyGroup.id}>
                            {JSON.stringify(surveyGroup)}
                            <Form method="delete">
                                <input type="hidden" name="groupId" value={surveyGroup.id} />
                                <input type="submit" value="Delete group"/>
                            </Form>
                            <Button
                                onClick={() => navigate(
                                    `${surveyGroup.id}`
                                )}
                            >
                                Show questions
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
            <Form
                method="post"
            >
                <input type="text" name="title"/>
                <input type="submit" value="Add group"/>
            </Form>
            <Button
                onClick={() => navigate(-1)}
            >
                Back to surveys
            </Button>
        </section>
    );
}

export default SurveyGroups;