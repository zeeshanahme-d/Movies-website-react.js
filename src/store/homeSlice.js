import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        genres: {},
    },
    reducers: {
        setGenres: (state, action) => {
            state.genres = action.payload;
        }
    },
})

export const { setGenres } = homeSlice.actions;

export default homeSlice.reducer;
