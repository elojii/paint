import { createSlice } from "@reduxjs/toolkit/react";

type ContextType = {
    context: CanvasRenderingContext2D | null
}

const initialState: ContextType = {
    context: null
}

const contextSlice = createSlice({
    name: "context",
    initialState,
    reducers: {
        createContext: (state, action) => {
            state.context = action.payload
        }
    }
})

export const contextReducer = contextSlice.reducer
export const { createContext } = contextSlice.actions