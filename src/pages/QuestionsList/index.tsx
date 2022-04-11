import React, { useState, useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import {
  styled as muiStyled,
  Grid,
  Select,
  Button,
  Paper,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
/* Components */
import Question from '../../components/Question';
import { StyledLink } from '../../styles';
/* Types */
/* Styles */

const QuestionsList: React.FC = () => {
  const { isLoading, getAccessTokenSilently } = useAuth0();

  const [category, setCategory] = useState<string>("");
  const [questions, setQuestions] = useState(
    [
      {
        id: '1',
        content: 'What are you doing?'
      },
      {
        id: '2',
        content: 'How are you doing?'
      }
    ]
  );
  const [user, setUser] = useState<any>();

  const handleCategoryChange = (inputCategory: string) => {
      const getQuestionsByCategory = async () => {
        const accessToken = await getAccessTokenSilently();
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
          const { data } = await axios.get(`https://questionare01.herokuapp.com/questions/category${inputCategory}`, config)
          setQuestions(data);
      }
      getQuestionsByCategory();
  }

  useEffect(() => {
    const getCategory = async () => {
        const accessToken = await getAccessTokenSilently();
        console.log(accessToken);
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
        const { data } = await axios.get("https://questionare01.herokuapp.com/questions/categories", config)
        console.log('data', data)
        setCategory(data);
    }
    getCategory();
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={false} sm={false} md={2}>
        <FormControl fullWidth>
          <InputLabel id="categorySelect">Category</InputLabel>
          <Select
            autoWidth={true}
            labelId="categorySelect"
            id="categorySelect"
            value={category}
            label="Category"
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={false} sm={false} md={8} />
      <Grid item xs={false} sm={false} md={2} sx={{display: 'flex', alignItems: 'center'}}>
        <StyledLink to="/questions-create">
          <Button variant="contained" color="primary">
            Create questions
          </Button>
        </StyledLink>
      </Grid>
      <Grid item xs={false} sm={false} md={12}>
        {questions.map((question) => (
          <Question key={question.id} question={question} withAnswer={false} />
        ))}
      </Grid>
    </Grid>
  );
};

export default QuestionsList;
