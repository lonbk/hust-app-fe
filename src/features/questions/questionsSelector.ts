import type { RootState } from '../../app/store';
// Other code such as selectors can use the imported `RootState` type
export const selectQuestions = (state: RootState) => state.questions;