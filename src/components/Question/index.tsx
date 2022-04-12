/* Libs */
import React from "react";
import styled from "styled-components";
import { Card, CardContent } from '@mui/material';
/* Types */
type QuestionType = {
    id: string;
    createdAt: string;
    updatedAt: string;
    description: string;
    questionCategoryId: string;
  };

type Props = {
    index: number;
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

const Question = ({ index, question, withAnswer, answers }: Props) => {


    return (
        <Card sx={{maxWidth: '100%', marginBottom: '5px'}}>
            <CardContent>
                <h5>Question {index + 1}</h5>
                <h3>{question.description}</h3>
            </CardContent>
        </Card>
    )
}

export default Question;