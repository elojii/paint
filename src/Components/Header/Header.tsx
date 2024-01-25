import s from "./header.module.css";
import brushImage from "../../assets/imgs/brush.png";
import reactangleImage from "../../assets/imgs/rect.png";
import circleImage from "../../assets/imgs/circle.png";
import eraserImage from "../../assets/imgs/eraser.png";
import undoImage from "../../assets/imgs/undo.png";
import redoImage from "../../assets/imgs/redo.png";
import saveImage from "../../assets/imgs/save.png";
import plusImage from "../../assets/imgs/plus.png";
import { AppDispatch } from "../../store";
import {
  setBrush,
  setRectangle,
  setCircle,
  setEraser,
} from "../../store/toolChoiceSlice";
import {
  addToTheUndoURLs,
  addUndoDrawing,
  removeFromTheUndoURLs,
  removeUndoDrawing,
} from "../../store/undoSlice";
import {
  addRedoDrawing,
  addToTheRedoURLs,
  removeFromTheRedoURLs,
  removeRedoDrawing,
} from "../../store/redoSlice";
import { addToSaved, changeSaved } from "../../store/savedSlice";
import {
  addCurrentImageToSaved,
  addNewDrawingToUndoArray,
  redoDrawing,
  undoDrawing,
} from "./headerApi";

type HeaderTypes = {
  context: CanvasRenderingContext2D | undefined;
  undo: (string | null)[][];
  undoIndex: number;
  redo: (string | null)[][];
  dispatch: AppDispatch;
  saved: string[];
  setUndoIndex: React.Dispatch<React.SetStateAction<number>>;
  chosenSavedIndex: number | undefined;
};

export const Header = ({
  context,
  undo,
  undoIndex,
  redo,
  dispatch,
  saved,
  setUndoIndex,
  chosenSavedIndex,
}: HeaderTypes) => {
  return (
    <>
      <header className={s.headerStyles}>
        <img
          src={brushImage}
          alt="brush"
          onClick={() => dispatch(setBrush())}
          style={{ cursor: "pointer", marginLeft: "10px" }}
        />
        <img
          src={reactangleImage}
          alt="brush"
          onClick={() => dispatch(setRectangle())}
          style={{ cursor: "pointer" }}
        />
        <img
          src={circleImage}
          alt="brush"
          onClick={() => dispatch(setCircle())}
          style={{ cursor: "pointer" }}
        />
        <img
          src={eraserImage}
          alt="brush"
          onClick={() => dispatch(setEraser())}
          style={{ cursor: "pointer" }}
        />
        <img
          src={undoImage}
          alt="brush"
          onClick={() => {
            undoDrawing({
              context,
              undo,
              undoIndex,
              redo,
              dispatch,
              addRedoDrawing,
              removeFromTheUndoURLs,
              addToTheRedoURLs,
            });
          }}
          style={{ cursor: "pointer" }}
        />
        <img
          src={redoImage}
          alt="brush"
          onClick={() => {
            redoDrawing({
              context,
              redo,
              undoIndex,
              dispatch,
              removeFromTheRedoURLs,
              addToTheUndoURLs,
            });
          }}
          style={{ cursor: "pointer" }}
        />
        <img
          src={plusImage}
          alt="brush"
          onClick={() =>
            addNewDrawingToUndoArray({
              undo,
              undoIndex,
              saved,
              dispatch,
              removeUndoDrawing,
              removeRedoDrawing,
              addUndoDrawing,
              setUndoIndex,
              context,
            })
          }
          style={{
            cursor: "pointer",
            width: " 35px",
            height: "auto",
          }}
        />
        <img
          src={saveImage}
          alt="create"
          onClick={() => {
            addCurrentImageToSaved({
              context,
              addToSaved,
              chosenSavedIndex,
              dispatch,
              saved,
              changeSaved,
              undo,
              redo,
              addRedoDrawing,
            });
          }}
          style={{
            cursor: "pointer",
            marginLeft: "auto",
            marginRight: "10px",
          }}
        />
      </header>
    </>
  );
};
