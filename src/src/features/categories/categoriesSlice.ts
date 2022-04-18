import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCategories } from './categoriesThunk';
// Define a type for the slice state
type Category = {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
  }
interface CategoriesState {
    value: Category[] | undefined;
}

// Define the initial state using that type
const initialState: CategoriesState = {
 value: undefined,
}

export const categoriesSlice = createSlice({
  name: 'categories',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

  },
  // extraReducers: {
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.value = action.payload;
    })
  }, 
  // }
})

// export const { getCategories } = categoriesSlice.actions



export default categoriesSlice.reducer