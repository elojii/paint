import { createSlice } from "@reduxjs/toolkit/react";

type StrokeType = {
  stroke: number;
};

const initialState: StrokeType = {
  stroke: 1,
};

const strokeSlice = createSlice({
  name: "stroke",
  initialState,
  reducers: {
    changeStroke: (state, action) => {
      state.stroke = action.payload;
    },
  },
});

export const strokeReducer = strokeSlice.reducer;
export const { changeStroke } = strokeSlice.actions;
