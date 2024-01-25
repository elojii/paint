import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";

type SavedType = {
  saved: string[];
};

const initialState: SavedType = {
  saved: [],
};

export type ChangeSavedPayload = {
  url: string;
  chosenSavedIndex: number;
};

const savedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    addToSaved: (state, action) => {
      state.saved = [...state.saved, action.payload];
    },
    changeSaved: (state, action: PayloadAction<ChangeSavedPayload>) => {
      state.saved[action.payload.chosenSavedIndex] = action.payload.url;
    },
  },
});

export const savedReducer = savedSlice.reducer;
export const { addToSaved, changeSaved } = savedSlice.actions;
