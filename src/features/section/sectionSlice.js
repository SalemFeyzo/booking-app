import { createSlice } from "@reduxjs/toolkit";
import { CHOOSE_SERVICE } from "./sectionConstants";

const initialState = {
	section: CHOOSE_SERVICE,
};

export const sectionSlice = createSlice({
	name: "frontend-section",
	initialState,
	reducers: {
		setSection: (state, action) => {
			state.section = action.payload;
		},
	},
});

export const { setSection } = sectionSlice.actions;
export default sectionSlice.reducer;
