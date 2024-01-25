import { configureStore } from "@reduxjs/toolkit";
import { toolChoiceSliceReducer } from "./toolChoiceSlice";
import { undoReducer } from "./undoSlice";
import { contextReducer } from "./contextSlice";
import { redoReducer } from "./redoSlice";
import { colorSliceReducer } from "./colorSlice";
import { strokeReducer } from "./stroke";
import { savedReducer } from "./savedSlice";
import { chosenURLReducer } from "./chosenURLSlice";
export const store = configureStore({
    reducer: {
        toolChoice: toolChoiceSliceReducer,
        context: contextReducer,
        undo: undoReducer,
        redo: redoReducer,
        color: colorSliceReducer,
        stroke: strokeReducer,
        saved: savedReducer,
        chosenURL: chosenURLReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;