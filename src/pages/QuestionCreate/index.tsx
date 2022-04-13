import React, { useState, useEffect } from "react";
import {
  styled as muiStyled,
  Grid,
  Select,
  FormControl,
  InputLabel,
  Input,
  MenuItem,
  Button,
  Paper,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
/* Components */
import AnswerInput from "./AnswerInput";
import StyledAlert from "../../components/StyledAlert";
/*Redux */
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectCategories } from "../../features/categories/categoriesSelector";
import { selectQuestions } from "../../features/questions/questionsSelector";
import { createQuestionByCategory } from '../../features/questions/questionsThunk';
/* Hooks */
import { useAxiosInstance } from '../../utils/axiosInstance';
/* Types */
type Answer = {
  description: string;
  isTrue: boolean;
};
type QuestionToUpload = {
  question: string;
  category: string;
  answers: Answer[];
};
/* Styles */
const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuestionCreate: React.FC = () => {
  /* Dispatch */
  const dispatch = useAppDispatch();
  /* Selector */
  const categories = useAppSelector(selectCategories);
  const { status, error } = useAppSelector(selectQuestions);
  const axiosInstance = useAxiosInstance();
  /* Local state */
  const [category, setCategory] = useState<string>("");
  const [categoriesSelectOptions, setCategoriesSelectOptions] = useState(() => {
    if (categories)
      return [...categories.map((category) => category.title), "Other"];
    return [];
  });
  const [questionToUpload, setQuestionToUpload] = useState<QuestionToUpload>(
    {
      question: "",
      category: "",
      answers: [
        {
          description: "",
          isTrue: false,
        },
      ],
    }
  );
  /* Local methods */
  const handleCategoryChange = (inputCategory: string | any) => {
    setCategory(inputCategory);
  };
  const handleQuestionToUploadChange = (key: string, value: any, answerKey?: any, answerIndex?: number) => {
    switch(key) {
      case "question":
        setQuestionToUpload(prev => ({
          ...prev,
          question: value
        }))
        break;
      case "category":
        setQuestionToUpload(prev => ({
          ...prev,
          category: value
        }))
        break;
      case "answers":
        setQuestionToUpload(prev => ({
          ...prev,
          answers: prev.answers.map((answer, index) => index === answerIndex ? {
            ...answer,
            [answerKey]: value
          } : answer)
        }))
        break;
      default:
        return
    }
  };
  const handleAddAnswer = () => {
    setQuestionToUpload((prev) => ({
      ...prev,
      answers: [...prev.answers, { description: "", isTrue: false }],
    }));
  };
  const handleRemoveAnswer = (deletingIndex: number) => {
    setQuestionToUpload((prev) => {
      if (prev.answers.length > 1) {
        return {
          ...prev,
          answers: prev.answers.filter(
            (answer, index) => index !== deletingIndex
          ),
        };
      }
      return prev;
    });
  };

  const handleAddQuestion = () => {
    dispatch(createQuestionByCategory({
      axiosInstance,
      questionToUpload
    }))
  }

  return (
    <>
      <StyledAlert status={status}>
        {status}
      </StyledAlert>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} md={12}>
            <Paper sx={{ padding: "20px" }}>
              <FlexContainer>
                <FormControl sx={{ marginBottom: "15px", width: "30%" }}>
                  <InputLabel id="categorySelect">Category</InputLabel>
                  <Select
                    autoWidth={true}
                    labelId="categorySelect"
                    id="category"
                    name="category"
                    label="Category"
                    value={category}
                    onChange={(e) => {
                      handleCategoryChange(e.target.value)
                      handleQuestionToUploadChange(e.target.name, e.target.value)
                    }}
                  >
                    {categoriesSelectOptions.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  onClick={handleAddQuestion}
                  endIcon={<AddIcon />}
                  variant="contained"
                  color="primary"
                >
                  Add question
                </Button>
              </FlexContainer>
              <FormControl
                sx={{
                  display: category === "Other" ? "block" : "none",
                  width: "30%",
                }}
              >
                <InputLabel htmlFor="selectCategory">Insert category</InputLabel>
                <Input
                  fullWidth
                  id="selectCategory"
                  name="category"
                  aria-describedby="my-helper-text"
                  defaultValue=""
                  onChange={(e) => {
                    handleQuestionToUploadChange(e.target.name, e.target.value);
                  }}
                />
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={false} sm={false} md={12}>
            <Card sx={{ maxWidth: "100%", marginBottom: "5px", padding: "10px" }}>
              <CardHeader title="Fill in question and answers" />
              <CardContent>
                <FormControl fullWidth sx={{ marginBottom: "20px" }}>
                  <InputLabel htmlFor="my-input">Insert question</InputLabel>
                  <Input
                    name="question"
                    aria-describedby="my-helper-text"
                    defaultValue={questionToUpload.question}
                    onChange={(e) => {
                      handleQuestionToUploadChange(e.target.name, e.target.value);
                    }}
                  />
                </FormControl>
                {questionToUpload.answers.map((answer, index) => (
                  <AnswerInput
                    key={index}
                    index={index}
                    answer={answer}
                    onInputChange={handleQuestionToUploadChange}
                    onAddAnswer={handleAddAnswer}
                    onRemoveAnswer={handleRemoveAnswer}
                  />
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default QuestionCreate;
