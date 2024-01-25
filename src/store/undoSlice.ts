import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";

type UndoType = {
  undo: (string | null)[][];
};

const initialState: UndoType = {
  undo: [],
};

export type UndoPayloadType = {
  chosenIndex: number;
  undoURL: string;
};

const undoSlice = createSlice({
  name: "undo",
  initialState,
  reducers: {
    addUndoDrawing: (state) => {
      state.undo = [...state.undo, []];
    },
    removeUndoDrawing: (state) => {
      state.undo.pop();
    },
    addToTheUndoURLs: (state, action: PayloadAction<UndoPayloadType>) => {
      state.undo[action.payload.chosenIndex].push(action.payload.undoURL);
    },
    removeFromTheUndoURLs: (
      state,
      action: PayloadAction<Omit<UndoPayloadType, "undoURL">>
    ) => {
      state.undo[action.payload.chosenIndex] = state.undo[
        action.payload.chosenIndex
      ].slice(0, -1);
    },
  },
});

export const undoReducer = undoSlice.reducer;
export const {
  addToTheUndoURLs,
  removeFromTheUndoURLs,
  addUndoDrawing,
  removeUndoDrawing,
} = undoSlice.actions;
