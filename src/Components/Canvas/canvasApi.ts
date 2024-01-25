import { brushDraw, brushStart } from "../../tools/Brush";
import {
  rectangleDraw,
  rectangleEnd,
  rectangleStart,
} from "../../tools/Rectangle";
import { circleDraw, circleEnd, circleStart } from "../../tools/Circle";
import { eraserDraw, eraserStart } from "../../tools/Eraser";
import { addToTheUndoURLs } from "../../store/undoSlice";
import { AppDispatch } from "../../store";

type StartDrawingType = {
  e: React.MouseEvent<HTMLCanvasElement>;
  context: CanvasRenderingContext2D | undefined;
  tool: "Brush" | "Rectangle" | "Circle" | "Eraser";
  color: string;
  stroke: number;
  setStartX: React.Dispatch<React.SetStateAction<number>>;
  setStartY: React.Dispatch<React.SetStateAction<number>>;
  setImageURL: React.Dispatch<React.SetStateAction<string | null>>;
  setDrawing: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: AppDispatch;
  undoIndex: number;
};

export const startDrawing = ({
  e,
  context,
  tool,
  color,
  stroke,
  setStartX,
  setStartY,
  setImageURL,
  setDrawing,
  dispatch,
  undoIndex,
}: StartDrawingType) => {
  if (!context) return;

  switch (tool) {
    case "Brush":
      brushStart({ e, context, color, stroke });
      break;
    case "Rectangle":
      rectangleStart({
        e,
        context,
        color,
        setStartX,
        setStartY,
        setImageURL,
      });
      break;
    case "Circle":
      circleStart({ e, context, color, setStartX, setStartY, setImageURL });
      break;
    case "Eraser":
      eraserStart({ e, context });
      break;
    default:
      brushStart({ e, context, color, stroke });
  }
  setDrawing(true);
  const img = new Image();
  img.src = context.canvas.toDataURL();

  dispatch(
    addToTheUndoURLs({
      chosenIndex: undoIndex,
      undoURL: img.src,
    })
  );
};

type DrawType = {
  e: React.MouseEvent<HTMLCanvasElement>;
  context: CanvasRenderingContext2D | undefined;
  drawing: boolean;
  tool: "Brush" | "Rectangle" | "Circle" | "Eraser";
  startX: number;
  startY: number;
  imageURL: string | null;
};
export const draw = ({
  e,
  context,
  drawing,
  tool,
  startX,
  startY,
  imageURL,
}: DrawType) => {
  if (!context || !drawing) return;

  switch (tool) {
    case "Brush":
      brushDraw({ context, e });
      break;
    case "Rectangle":
      rectangleDraw({ e, context, startX, startY, imageURL: imageURL || "" });
      break;
    case "Circle":
      circleDraw({ e, context, startX, startY, imageURL: imageURL || "" });
      break;
    case "Eraser":
      eraserDraw({ e, context });
      break;
    default:
      brushDraw({ context, e });
  }
};

type EndDrawingType = {
  context: CanvasRenderingContext2D | undefined;
  setImageURL: React.Dispatch<React.SetStateAction<string | null>>;
  setDrawing: React.Dispatch<React.SetStateAction<boolean>>;
};
export const endDrawing = ({
  context,
  setImageURL,
  setDrawing,
}: EndDrawingType) => {
  if (context) {
    context.closePath();
    rectangleEnd({ context, setImageURL });
    circleEnd({ context, setImageURL });
    setDrawing(false);
  }
};

export const outDrawing = ({
  context,
  setImageURL,
  setDrawing,
}: EndDrawingType) => {
  if (context) {
    context.closePath();
    rectangleEnd({ context, setImageURL });
    circleEnd({ context, setImageURL });
    setDrawing(false);
  }
};
