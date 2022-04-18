/* Libs */
import React from "react";
import { Card, CardContent, Button, FormGroup } from "@mui/material";
/* Components */
/* Styled */
import { FlexBox } from '../../styles';
/* Types */
type Props = {
    index: number;
  question: any;
  answer: any;
};

const AnswerCard: React.FC<Props> = ({ index, question, answer }) => {
  return (
    <Card sx={{ maxWidth: "100%", marginBottom: "5px" }}>
      <CardContent>
        <h5>Question {index + 1}</h5>
        <h3>{question.description}</h3>
        <FlexBox column={false} justify="flex-start" align="center">
            <h6>Your answer:</h6>
            <p>{answer.description}</p>
        </FlexBox>
      </CardContent>
    </Card>
  );
};

export default AnswerCard;
