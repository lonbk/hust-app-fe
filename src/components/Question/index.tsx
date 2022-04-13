/* Libs */
import React, { useState } from "react";
import styled from "styled-components";
import {
  Card,
  CardContent,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
/* Components */
/* Redux */
import { useAppDispatch } from "../../app/hooks";
import { createAnswers } from "../../features/answers/answersThunk";
/* Hooks */
import { useAxiosInstance } from "../../utils/axiosInstance";
/* Types */
import type { QuestionType } from "../../features/questions/questionsSlice";
import type { AnswerType } from "../../features/answers/answersSlice";
type Props = {
  index: number;
  question: QuestionType;
  withAnswer: boolean;
};
/* Styled */

const Question: React.FC<Props> = ({ index, question, withAnswer }) => {
  /* Dispatch */
  const dispatch = useAppDispatch();
  const axiosInstance = useAxiosInstance();
  /* Local states */
  const [isVisibleAnswer, setIsVisibleAnswer] = useState<boolean>(false);
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  /* Local methods */
  const handleCheckboxChange = (id: string, isTrue: boolean) => {
    setAnswers((prev) => {
      if (isTrue)
        return [
          ...prev,
          {
            questionId: question.id,
            answerId: id,
          },
        ];
      return prev.filter((answer) => answer.answerId !== id);
    });
  };
  const handleSubmit = () => {
      dispatch(createAnswers({
          axiosInstance,
          answers,
          categoryId: question.questionCategoryId
      }))
  }

  console.log(answers);

  return (
    <Card sx={{ maxWidth: "100%", marginBottom: "5px" }}>
      <CardContent>
        <h5>Question {index + 1}</h5>
        <h3>{question.description}</h3>
        <Button
          variant="text"
          endIcon={<QuestionAnswerIcon />}
          onClick={() => setIsVisibleAnswer(!isVisibleAnswer)}
        >
          Answer to this question
        </Button>
        <br />
        {isVisibleAnswer && withAnswer && (
          <>
            <FormGroup>
              {question.answers.map((answer) => (
                <FormControlLabel
                  value={answer.id}
                  control={
                    <Checkbox
                      id={answer.id}
                      onChange={(e) =>
                        handleCheckboxChange(e.target.value, e.target.checked)
                      }
                    />
                  }
                  label={answer.description}
                />
              ))}
            </FormGroup>
            <br />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Question;
