/* Libs */
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import CheckIcon from '@mui/icons-material/Check';
/* Components */
import LoadingWithChild from "../LoadingWithChild";
/* Redux */
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createAnswers } from "../../features/answers/answersThunk";
import { selectCreateAnswersState } from "../../features/answers/answersSelector";
import { StatusType } from "../../features/global";
// import { loading } from "../../"
/* Hooks */
import { useAxiosInstance } from "../../utils/axiosInstance";
/* Styled */
import { FlexBox } from '../../styles';
/* Types */
import type { QuestionType } from "../../features/questions/questionsSlice";
import type { AnswerType } from "../../features/answers/answersSlice";
type Props = {
  index: number;
  question: QuestionType;
  withAnswer: boolean;
};

const Question: React.FC<Props> = ({ index, question, withAnswer }) => {
  /* Dispatch */
  const dispatch = useAppDispatch();
  /*  Selector */
  const { status, error } = useAppSelector(selectCreateAnswersState);
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
  const handleClose = () => {
    setAnswers([]);
    setTimeout(() => {
      setIsVisibleAnswer(false)
    }, 1000)
  }

  const handleSubmit = () => {
      dispatch(createAnswers({
          axiosInstance,
          userAnswers: answers,
          categoryId: question.questionCategoryId
      }))
  }
  /* Effects */
  useEffect(() => {
    if(status === StatusType.STATUS_SUCCESS) handleClose();
  }, [status])

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
                  key={answer.id}
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
            <FlexBox column={false} justify="flex-start" align="center">
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Save
              </Button>
              <LoadingWithChild fullScreen={false} status={status} autoDisappear={true} onError={error}>
                <Button variant="text" disabled startIcon={<CheckIcon />}>
                  Your answers have been saved
                </Button>
              </LoadingWithChild>
            </FlexBox>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Question;
