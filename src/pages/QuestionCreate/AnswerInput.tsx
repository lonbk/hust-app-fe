/* Libs */
import React, { useState } from "react";
import {
  Grid,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  IconButton,
  styled as muiStyled,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
/* Types */
type Props = {
  index: number;
  answer: {
    description: string;
    isTrue: boolean;
  };
  onAddAnswer: () => void;
  onRemoveAnswer: (index: number) => void;
  onInputChange: (key: string, value: any, answerKey?: any, answerIndex?: number) => void;
};
/* Styled */
const StyledButton = muiStyled(IconButton)`
    display: block; 
    margin: auto;
`;

const AnswerInput: React.FC<Props> = ({
  index,
  answer,
  onAddAnswer,
  onRemoveAnswer,
  onInputChange,
}) => {

    const [isChecked, setIsChecked] = useState<boolean>(answer.isTrue)

  return (
    <Grid container spacing={1}>
      <Grid item xs={6} sm={6} md={8} lg={9}>
        <FormControl fullWidth sx={{ marginBottom: "20px" }}></FormControl>
        <FormControl fullWidth sx={{ marginBottom: "20px" }}>
          <InputLabel htmlFor="my-input">Insert answer {index + 1}</InputLabel>
          <Input
            id="description"
            name="answers"
            aria-describedby="my-helper-text"
            defaultValue={answer.description}
            onChange={(e) => {
                onInputChange(e.target.name, e.target.value, e.target.id, index)
            }}
          />
        </FormControl>
      </Grid>
      <Grid
        item
        xs={6}
        sm={6}
        md={4}
        lg={3}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <FormControlLabel
          control={
            <Checkbox
              id="isTrue"
              name="answers"
              checked={isChecked}
              onChange={(e) => {
                  setIsChecked(prev => !prev);
                  onInputChange(e.target.name, !isChecked, e.target.id, index);
                }}
            />
          }
          label="Correct answer"
        />
        <StyledButton color="primary" onClick={() => onAddAnswer()}>
          <AddIcon />
        </StyledButton>
        <StyledButton color="primary" onClick={() => onRemoveAnswer(index)}>
          <RemoveIcon />
        </StyledButton>
      </Grid>
    </Grid>
  );
};

export default AnswerInput;
