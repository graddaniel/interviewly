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
import AddQuestionForm from '../components/add-question-form';

const QuestionsList = () => {
    const questionsList = useLoaderData() as any[];
    const navigate = useNavigate();

    return (
        <section>
            {questionsList.length === 0 && (
                <div>No questions found</div>
            )}
            {questionsList.length > 0 && (
                <ul>
                    {questionsList.map(question => (
                        <li key={question.id}>
                            <Form method="delete">
                                <input type="hidden" name="questionId" value={question.id} />
                                <input type="submit" value="Delete" />
                            </Form>
                            {JSON.stringify(question)}
                        </li>
                    ))}
                </ul>
            )}
            <AddQuestionForm />
            <Button
                onClick={() => navigate(-1)}
            >
                Back
            </Button>
        </section>
    );
}

export default QuestionsList;