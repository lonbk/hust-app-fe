import type { RootState } from '../../app/store';
// Other code such as selectors can use the imported `RootState` type
export const selectGetQuestionsState = (state: RootState) => state.questions.getQuestionsState;
export const selectCreateQuestionsState = (state: RootState) => state.questions.createQuestionsState;