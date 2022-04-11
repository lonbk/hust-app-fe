import React, { useState } from "react";
import {
  styled as muiStyled,
  Grid,
  Select,
  Button,
  Paper
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
/* Components */
import QuestionForm from '../../components/QuestionForm';
/* Types */
/* Styles */


const QuestionsCreate: React.FC = () => {
  const [questions, setQuestions] = useState(
    [
      {
        id: Math.random().toString(),
        content: ''
      }
    ]
  )

  return (
    <Grid container spacing={2}>
      <Grid item xs={false} sm={false} md={12}></Grid>
      <Grid item xs={false} sm={false} md={12}>
        {questions.map((question, index) => 
          <QuestionForm key={question.id}index={index} question={question} withAnswer={false} />
        )}
      </Grid>
    </Grid>
  );
};

export default QuestionsCreate;
