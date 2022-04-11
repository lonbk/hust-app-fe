/* Libs */
import React from "react";
import styled from "styled-components";
import { Card, CardContent, CardHeader, FormControl, InputLabel, Input } from "@mui/material";
/* Types */
type QuestionType = {
  id: String;
  content: String;
};

type Props = {
  index: number;
  question: QuestionType;
  withAnswer: boolean;
  answers?: string[];
};
/* Styled */

const QuestionForm = ({ index, question, withAnswer, answers }: Props) => {
  return (
    <Card sx={{ maxWidth: "100%", marginBottom: "5px" }}>
      <CardHeader title={`Question ${index + 1}`} />
      <CardContent>
        <form>
          <FormControl fullWidth>
            <InputLabel htmlFor="my-input">Insert question</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" defaultValue={question.content} />
          </FormControl>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuestionForm;
