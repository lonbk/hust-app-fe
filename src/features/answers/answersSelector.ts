import type { RootState } from '../../app/store';
// Other code such as selectors can use the imported `RootState` type
export const selectCategories = (state: RootState) => state.categories.value;