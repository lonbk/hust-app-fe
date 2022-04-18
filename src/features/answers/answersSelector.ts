import type { RootState } from '../../app/store';
// Other code such as selectors can use the imported `RootState` type
export const selectCreateAnswersState = (state: RootState) => state.answers.createAnswersState;
export const selectGetAnswersState = (state: RootState) => state.answers.getAnswersState;