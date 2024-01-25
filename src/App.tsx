import s from "./App.module.css";
import { useEffect, useState } from "react";
import { Canvas } from "./Components/Canvas/Canvas";
import { Colors } from "./Components/Colors/Colors";
import { Header } from "./Components/Header/Header";
import { SavedPictures } from "./Components/SavedPictures/SavedPictures";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { changeStroke } from "./store/stroke";
import { TextField } from "@mui/material";

export const App = () => {
  const dispatch = useDispatch();
  const undo = useSelector((state: RootState) => state.undo.undo);
  const redo = useSelector((state: RootState) => state.redo.redo);
  const color = useSelector((state: RootState) => state.color.color);
  const saved = useSelector((state: RootState) => state.saved.saved);

  const [context, setContext] = useState<CanvasRenderingContext2D>();
  const [showSaved, setShowSaved] = useState<boolean>(false);
  const [chosenSavedIndex, setChosenSavedIndex] = useState<
    number | undefined
  >();
  const [undoIndex, setUndoIndex] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<string>("");

  useEffect(() => {
    if (context && saved.length > 0 && chosenSavedIndex === undefined) {
      const img = new Image();
      img.src = currentImage;
      img.onload = () => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.drawImage(
          img,
          0,
          0,
          context.canvas.width,
          context.canvas.height
        );
      };
    }
  }, [context]);

  const openSavedDrawings = () => {
    if (saved.length > 0 && context) {
      setShowSaved((prev) => !prev);
    }
    if (context) {
      setCurrentImage(context.canvas.toDataURL());
    }
  };

  return (
    <>
      <main className={s.container}>
        <Header
          context={context}
          undo={undo}
          undoIndex={undoIndex}
          redo={redo}
          dispatch={dispatch}
          saved={saved}
          setUndoIndex={setUndoIndex}
          chosenSavedIndex={chosenSavedIndex}
        />
        {!showSaved || saved.length === 0 ? (
          <Canvas
            context={context}
            setContext={setContext}
            color={color}
            saved={saved}
            chosenSavedIndex={chosenSavedIndex}
            undoIndex={undoIndex}
            undo={undo}
          />
        ) : (
          <SavedPictures
            setShowSaved={setShowSaved}
            setChosenSavedIndex={setChosenSavedIndex}
            setUndoIndex={setUndoIndex}
          />
        )}
        <footer className={s.footer}>
          <Colors />
          <div
            className={s.currentColor}
            style={{ backgroundColor: color }}
          ></div>
          <TextField
            label="Stroke"
            variant="standard"
            type="number"
            sx={{ marginLeft: "25px", width: "100px" }}
            defaultValue={1}
            inputProps={{ min: 1, max: 50 }}
            onChange={(e) => dispatch(changeStroke(e.target.value))}
          />
          <span
            onClick={() => openSavedDrawings()}
            style={{ cursor: "pointer" }}
          >
            Show saved pictures
          </span>
        </footer>
      </main>
    </>
  );
};
