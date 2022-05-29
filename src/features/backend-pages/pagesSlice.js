import { createSlice } from "@reduxjs/toolkit";
import { NEW_ORDERS } from "../../backend/constants/pageNamesConstants";

const initialState = {
	page: NEW_ORDERS,
};

export const pagesSlice = createSlice({
	name: "backend-pages",
	initialState,
	reducers: {
		setPage: (state, action) => {
			state.page = action.payload;
		},
	},
});

export const { setPage } = pagesSlice.actions;
export default pagesSlice.reducer;
