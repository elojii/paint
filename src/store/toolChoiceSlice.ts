import { createSlice } from "@reduxjs/toolkit/react";

type ToolChoiceType = {
  tool: "Brush" | "Rectangle" | "Circle" | "Eraser";
};

const initialState: ToolChoiceType = {
  tool: "Brush",
};

const toolChoiceSlice = createSlice({
  name: "toolChoice",
  initialState,
  reducers: {
    setBrush: (state) => {
      state.tool = "Brush";
    },
    setRectangle: (state) => {
      state.tool = "Rectangle";
    },
    setCircle: (state) => {
      state.tool = "Circle";
    },
    setEraser: (state) => {
      state.tool = "Eraser";
    },
  },
});

export const {setBrush, setRectangle, setCircle, setEraser} = toolChoiceSlice.actions
export const toolChoiceSliceReducer = toolChoiceSlice.reducer