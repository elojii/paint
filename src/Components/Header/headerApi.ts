import { PayloadAction, UnknownAction } from "@reduxjs/toolkit/react";
import { AppDispatch } from "../../store";
import { UndoPayloadType } from "../../store/undoSlice";
import { RedoPayloadType } from "../../store/redoSlice";
import { ChangeSavedPayload } from "../../store/savedSlice";

type UndoDrawingType = {
  context: CanvasRenderingContext2D | undefined;
  undo: (string | null)[][];
  undoIndex: number;
  redo: (string | null)[][];
  dispatch: AppDispatch;
  addRedoDrawing: () => UnknownAction;
  removeFromTheUndoURLs: (
    action: Omit<UndoPayloadType, "undoURL">
  ) => UnknownAction;
  addToTheRedoURLs: (action: RedoPayloadType) => UnknownAction;
};
export const undoDrawing = ({
  context,
  undo,
  undoIndex,
  redo,
  dispatch,
  addRedoDrawing,
  removeFromTheUndoURLs,
  addToTheRedoURLs,
}: UndoDrawingType) => {
  if (context && undo[undoIndex].length > 0) {
    const modifiableUndoList = [...undo[undoIndex]];
    const undoElementURL = modifiableUndoList.pop();

    const img = new Image();
    img.src = undoElementURL || "";
    img.onload = () => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.drawImage(img, 0, 0, context.canvas.width, context.canvas.height);
    };
    if (redo[undoIndex] === undefined) {
      console.log("createdRedo");
      dispatch(addRedoDrawing());
    }

    dispatch(removeFromTheUndoURLs({ chosenIndex: undoIndex }));

    dispatch(
      addToTheRedoURLs({
        redoURL: context.canvas.toDataURL(),
        chosenIndex: undoIndex,
      })
    );
  }
};
type RedoDrawingType = {
  context: CanvasRenderingContext2D | undefined;
  redo: (string | null)[][];
  undoIndex: number;
  dispatch: AppDispatch;
  removeFromTheRedoURLs: (
    action: Omit<RedoPayloadType, "redoURL">
  ) => UnknownAction;
  addToTheUndoURLs: (action: UndoPayloadType) => UnknownAction;
};
export const redoDrawing = ({
  context,
  redo,
  undoIndex,
  dispatch,
  removeFromTheRedoURLs,
  addToTheUndoURLs,
}: RedoDrawingType) => {
  if (context && redo[undoIndex] && redo[undoIndex].length > 0) {
    const modifiableRedoList = [...redo[undoIndex]];
    const redoElementURL = modifiableRedoList.pop();
    console.log(undoIndex);
    const img = new Image();
    img.src = redoElementURL || "";
    img.onload = () => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.drawImage(img, 0, 0, context.canvas.width, context.canvas.height);
    };

    dispatch(removeFromTheRedoURLs({ chosenIndex: undoIndex }));

    dispatch(
      addToTheUndoURLs({
        chosenIndex: undoIndex,
        undoURL: context.canvas.toDataURL(),
      })
    );
  }
};
type AddNewDrawingToUndoArrayType = {
  undo: (string | null)[][];
  undoIndex: number;
  saved: string[];
  dispatch: AppDispatch;
  removeUndoDrawing: () => UnknownAction;
  removeRedoDrawing: () => UnknownAction;
  addUndoDrawing: () => UnknownAction;
  setUndoIndex: React.Dispatch<React.SetStateAction<number>>;
  context: CanvasRenderingContext2D | undefined;
  setChosenSavedIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
};
export const addNewDrawingToUndoArray = ({
  undo,
  undoIndex,
  saved,
  dispatch,
  removeUndoDrawing,
  removeRedoDrawing,
  addUndoDrawing,
  setUndoIndex,
  context,
  setChosenSavedIndex,
}: AddNewDrawingToUndoArrayType) => {
  if (undo[undoIndex].length && undo.length !== saved.length) {
    dispatch(removeUndoDrawing());
    dispatch(removeRedoDrawing());
    dispatch(addUndoDrawing());
  } else if (undo[undoIndex].length && undo.length === saved.length) {
    dispatch(addUndoDrawing());
    setUndoIndex((prev) => prev + 1);
  }
  setChosenSavedIndex(undefined)
  context?.clearRect(0, 0, context.canvas.width, context.canvas.height);
};
type AddCurrentImageToSavedType = {
  context: CanvasRenderingContext2D | undefined;
  addToSaved: (action: string) => UnknownAction;
  chosenSavedIndex: number | undefined;
  dispatch: AppDispatch;
  saved: string[];
  changeSaved: (action: ChangeSavedPayload) => UnknownAction;
  undo: (string | null)[][];
  redo: (string | null)[][];
  addRedoDrawing: () => UnknownAction;
  setChosenSavedIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
};
export const addCurrentImageToSaved = ({
  context,
  addToSaved,
  chosenSavedIndex,
  dispatch,
  saved,
  changeSaved,
  undo,
  redo,
  addRedoDrawing,
  setChosenSavedIndex,
}: AddCurrentImageToSavedType) => {
  if (context && chosenSavedIndex === undefined && undo.length > saved.length) {
    const imgUrl = context.canvas.toDataURL();
    dispatch(addToSaved(imgUrl));
    console.log("add");
  } else if (
    context &&
    chosenSavedIndex !== undefined &&
    saved[chosenSavedIndex] && undo.length === saved.length
  ) {
    console.log("update");
    const url = context.canvas.toDataURL();
    // setChosenSavedIndex(undefined)
    dispatch(changeSaved({ url, chosenSavedIndex }));
  }
  if (undo.length !== redo.length) {
    dispatch(addRedoDrawing());
  }
};
