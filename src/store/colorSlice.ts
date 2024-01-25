import { createSlice } from "@reduxjs/toolkit/react";

type ColorType = {
  color: string;
};

const initialState: ColorType = {
  color: "black",
};

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setColor: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const colorSliceReducer = colorSlice.reducer;
export const { setColor } = colorSlice.actions;
