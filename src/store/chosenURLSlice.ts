import { createSlice } from "@reduxjs/toolkit/react";

type ChosenURLType = {
  chosenURL: string;
};

const initialState: ChosenURLType = {
  chosenURL: "",
};

const chosenURLSlice = createSlice({
  name: "chosenURL",
  initialState,
  reducers: {
    setURL: (state, action) => {
      state.chosenURL = action.payload;
    },
  },
});

export const chosenURLReducer = chosenURLSlice.reducer;
export const { setURL } = chosenURLSlice.actions;
