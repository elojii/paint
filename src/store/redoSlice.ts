import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";

type RedoType = {
  redo: (string | null)[][];
};

const initialState: RedoType = {
  redo: [],
};

export type RedoPayloadType = {
  chosenIndex: number;
  redoURL: string;
};

const redoSlice = createSlice({
  name: "redo",
  initialState,
  reducers: {
    addRedoDrawing: (state) => {
      state.redo = [...state.redo, []];
    },
    removeRedoDrawing: (state) => {
      state.redo.pop();
    },
    addToTheRedoURLs: (state, action: PayloadAction<RedoPayloadType>) => {
      state.redo[action.payload.chosenIndex].push(action.payload.redoURL);
    },
    removeFromTheRedoURLs: (
      state,
      action: PayloadAction<Omit<RedoPayloadType, "redoURL">>
    ) => {
      state.redo[action.payload.chosenIndex] = state.redo[
        action.payload.chosenIndex
      ].slice(0, -1);
    },
  },
});

export const redoReducer = redoSlice.reducer;
export const {
  addToTheRedoURLs,
  removeFromTheRedoURLs,
  addRedoDrawing,
  removeRedoDrawing,
} = redoSlice.actions;
