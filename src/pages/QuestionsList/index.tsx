import React, { useState, useEffect } from "react";
import {
  // styled as muiStyled,
  Grid,
  Select,
  Button,
  // Paper,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
/* Components */
import Loading from "../../components/Loading";
import LoadingWithChild from "../../components/LoadingWithChild";
import Question from '../../components/Question';
import { StyledLink } from "../../styles";
/* Redux */
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectAccessToken } from "../../features/user/userSelector";
import { selectCategories } from "../../features/categories/categoriesSelector";
import { selectQuestions } from "../../features/questions/questionsSelector";
import { resetQuestionsList } from '../../features/questions/questionsSlice';
import { getCategories } from "../../features/categories/categoriesThunk";
import { getQuestionsByCategory } from "../../features/questions/questionsThunk";
/* Types */
/* Styles */

const QuestionsList: React.FC = () => {
  /* Dispatch */
  const dispatch = useAppDispatch();
  /* Selector */
  const accessToken = useAppSelector(selectAccessToken);
  const { questionsList, status, error } = useAppSelector(selectQuestions);
  const categories = useAppSelector(selectCategories);
  /* Local state */
  const [category, setCategory] = useState<string>('');
  /* Local methods */
  const handleCategoryChange = async (inputCategory: string | any) => {
    setCategory(inputCategory);
    dispatch(
      getQuestionsByCategory({
        accessToken,
        category: inputCategory,
      })
    );
  };
  /* Effects */
  useEffect(() => {
    if (accessToken) dispatch(getCategories(accessToken));
    console.log('got here')
  }, [accessToken]);

  useEffect(() => {
    return () =>  {
      dispatch(resetQuestionsList())
    };
  }, [])

  if (!categories) {
    return <Loading />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={false} sm={false} md={2}>
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
      </Grid>
      <Grid item xs={false} sm={false} md={7} />
      <Grid
        item
        xs={false}
        sm={false}
        md={3}
        sx={{ display: "flex", alignItems: "center", justifyContent: 'flex-end' }}
      >
        <StyledLink to="/questions-create">
          <Button variant="contained" color="primary">
            Create questions
          </Button>
        </StyledLink>
      </Grid>
      <Grid item xs={false} sm={false} md={12}>
        <LoadingWithChild status={status} onIdle={"Select a category"} onError={error} >
            {questionsList?.questions.map((question, index) => (
              <Question key={question.id} index={index} question={question} withAnswer={false} />
            ))}
        </LoadingWithChild>
      </Grid>
    </Grid>
  );
};

export default QuestionsList;
