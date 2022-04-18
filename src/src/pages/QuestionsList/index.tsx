import React, { useState, useEffect } from "react";
import {
  // styled as muiStyled,
  Grid,
  Select,
  Button,
  Paper,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
/* Components */
import Loading from "../../components/Loading";
import LoadingWithChild from "../../components/LoadingWithChild";
import Question from "../../components/Question";
import { StyledLink } from "../../styles";
/* Redux */
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectCategories } from "../../features/categories/categoriesSelector";
import { selectGetQuestionsState } from "../../features/questions/questionsSelector";
import { getQuestionsByCategory } from "../../features/questions/questionsThunk";
import { StatusType } from "../../features/global";
// import { resetStatus } from "../../features/questions/questionsSlice";
/* Hooks */
import { useAxiosInstance } from "../../utils/axiosInstance";
/* Types */
/* Styles */

const QuestionsList: React.FC = () => {
  /* Dispatch */
  const dispatch = useAppDispatch();
  /* Selector */
  const { questionsList, status, error } = useAppSelector(selectGetQuestionsState);
  const categories = useAppSelector(selectCategories); 
  const axiosInstance = useAxiosInstance();
  /* Local state */
  const [category, setCategory] = useState<string>("");
  /* Local methods */
  const handleCategoryChange = async (inputCategory: string) => {
    setCategory(inputCategory);
  };
  /* Effects */
  useEffect(() => {
    if (category)
      if(axiosInstance )dispatch(
        getQuestionsByCategory({
          axiosInstance,
          category: category,
        })
      );
  }, [category]);

  if (!categories) {
    return <Loading />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container spacing={0}>
          <Grid item xs={6} sm={6} md={2}>
            <Paper>
              <FormControl fullWidth>
                <InputLabel id="categorySelect">Category</InputLabel>
                <Select
                  autoWidth={true}
                  labelId="categorySelect"
                  id="categorySelect"
                  label="Category"
                  value={category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.title}>
                      {category.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={false} sm={false} md={7} />
          <Grid
            item
            xs={3}
            sm={3}
            md={3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <StyledLink to="/questions-create">
              <Button variant="contained" color="primary">
                Create questions
              </Button>
            </StyledLink>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={false} sm={false} md={12}>
        {status === StatusType.STATUS_IDLE ? (
          <p>Select a category</p>
        ) : (
          <LoadingWithChild
            fullScreen={true}
            status={status}
            autoDisappear={false}
            onError={error}
          >
            {questionsList ? questionsList.questions.map((question, index) => (
              <Question
                key={question.id}
                index={index}
                question={question}
                withAnswer={question.answers.length > 0}
              />
            )) : null}
          </LoadingWithChild>
        )}
      </Grid>
    </Grid>
  );
};

export default QuestionsList;
