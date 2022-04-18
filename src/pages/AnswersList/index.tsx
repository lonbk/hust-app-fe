/* Libs */
import React, { useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  Paper,
  Button,
  MenuItem,
} from "@mui/material";
/* Components */
import Loading from "../../components/Loading";
import LoadingWithChild from "../../components/LoadingWithChild";
import AnswerCard from "./AnswerCard";
/* Redux */
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectGetAnswersState } from "../../features/answers/answersSelector";
import { selectCategories } from "../../features/categories/categoriesSelector";
import { getUserAnswers } from "../../features/answers/answersThunk";
import { StatusType } from "../../features/global";
/* Hooks */
import { useAxiosInstance } from "../../utils/axiosInstance";
/* Styled */
import { StyledLink } from "../../styles";
import { CategoryTwoTone } from "@mui/icons-material";

const AnswersList: React.FC = () => {
  /* Dispatch */
  const dispatch = useAppDispatch();
  /* Selector */
  const { userAnswers, status, error } = useAppSelector(selectGetAnswersState);
  const categories = useAppSelector(selectCategories);
  const axiosInstance = useAxiosInstance();
  /* Local state */
  const [category, setCategory] = useState({
    id: "",
    title: "",
  });
  /* Local methods */
  const handleCategoryChange = (categoryTitle: string) => {
    if (categories) {
      setCategory((prev) => {
        const selectedCategory = categories.find(
          (category) => category.title === categoryTitle
        );
        if (selectedCategory) {
          return {
            id: selectedCategory.id,
            title: selectedCategory.title,
          };
        }
        return prev;
      });
    }
  };
  /* Effects */
  useEffect(() => {
    if (category.id) {
      console.log('bug', category)
      if(axiosInstance) {dispatch(
        getUserAnswers({
          axiosInstance,
          categoryId: category.id,
        })
      ); console.log('bug 2');};
    }
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
                  value={category.title}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem
                      key={category.id}
                      id={category.id}
                      value={category.title}
                    >
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
            <StyledLink to="/questions-list">
              <Button variant="contained" color="primary">
                Edit your answers
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
            autoDisappear={false}
            status={status}
            onError={error}
          >
            {userAnswers
              ? userAnswers.map((userAnswer, index) => (
                  <AnswerCard
                    key={userAnswer.id}
                    index={index}
                    question={userAnswer.question}
                    answer={userAnswer.answer}
                  />
                ))
              : null}
          </LoadingWithChild>
        )}
      </Grid>
    </Grid>
  );
};

export default AnswersList;
