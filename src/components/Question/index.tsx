/* Libs */
import React from "react";
import styled from "styled-components";
import { Card, CardContent } from '@mui/material';
/* Types */
type QuestionType = {
    id: String;
    content: String;
}

type Props = {
    question: QuestionType;
    withAnswer: boolean;
    answers?: string[]; 
}
/* Styled */
const QuestionContainer = styled.div`
    width: 100%;
    heigh: 100%;
    border: 
`

const Question = ({ question, withAnswer, answers }: Props) => {


    return (
        <Card sx={{maxWidth: '100%', marginBottom: '5px'}}>
            <CardContent>
                <h5>Question {question.id}</h5>
                <h3>{question.content}</h3>
            </CardContent>
        </Card>
    )
}

export default Question;