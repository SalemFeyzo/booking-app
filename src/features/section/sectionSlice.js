import { createSlice } from "@reduxjs/toolkit";
import { CHOOSE_SERVICE } from "./sectionConstants";

const initialState = {
	section: CHOOSE_SERVICE,
	backTo: null,
};

export const sectionSlice = createSlice({
	name: "frontend-section",
	initialState,
	reducers: {
		setSection: (state, action) => {
			state.section = action.payload;
		},
		setBackTo: (state, action) => {
			state.backTo = action.payload;
		},
	},
});

export const { setSection, setBackTo } = sectionSlice.actions;
export default sectionSlice.reducer;
