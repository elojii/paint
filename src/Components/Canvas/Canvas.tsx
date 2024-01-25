import s from "./Canvas.module.css";
import { useEffect, useRef, useState } from "react";
import { checkForValidSize } from "../../utils/checkForValidSize";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { addUndoDrawing } from "../../store/undoSlice";
import { TextField } from "@mui/material";
import { draw, endDrawing, outDrawing, startDrawing } from "./canvasApi";

type CanvasPropTypes = {
  context: CanvasRenderingContext2D | undefined;
  setContext: React.Dispatch<
    React.SetStateAction<CanvasRenderingContext2D | undefined>
  >;
  color: string;
  saved: string[];
  chosenSavedIndex: number | undefined;
  undoIndex: number;
  undo: (string | null)[][];
};

export const Canvas = ({
  context,
  setContext,
  color,
  saved,
  chosenSavedIndex,
  undoIndex,
  undo,
}: CanvasPropTypes) => {
  const dispatch = useDispatch<AppDispatch>();
  const tool = useSelector((state: RootState) => state.toolChoice.tool);
  const stroke = useSelector((state: RootState) => state.stroke.stroke);
  const chosenURL = useSelector(
    (state: RootState) => state.chosenURL.chosenURL
  );
  const [drawing, setDrawing] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(600);
  const [width, setWidth] = useState<number>(800);
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [drawingAdded, setDrawingAdded] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (context && !drawingAdded && undo.length === 0) {
      dispatch(addUndoDrawing());
      setDrawingAdded(true);
    }
  }, [context]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      setContext(ctx!);
    }
  }, []);

  useEffect(() => {
    if (context) {
      const img = new Image();
      img.src = imageURL || "";
      img.onload = () => {
        context!.drawImage(
          img,
          0,
          0,
          context.canvas.width,
          context.canvas.height
        );
      };
    }
  }, [width, height]);

  useEffect(() => {
    if (chosenSavedIndex === undefined) return;
    if (context && saved[chosenSavedIndex] !== "") {
      const img = new Image();
      img.src = saved[chosenSavedIndex];
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
  }, [chosenURL, context]);

  // const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
  //   if (!context) return;

  //   switch (tool) {
  //     case "Brush":
  //       brushStart({ e, context, color, stroke });
  //       break;
  //     case "Rectangle":
  //       rectangleStart({
  //         e,
  //         context,
  //         color,
  //         setStartX,
  //         setStartY,
  //         setImageURL,
  //       });
  //       break;
  //     case "Circle":
  //       circleStart({ e, context, color, setStartX, setStartY, setImageURL });
  //       break;
  //     case "Eraser":
  //       eraserStart({ e, context });
  //       break;
  //     default:
  //       brushStart({ e, context, color, stroke });
  //   }
  //   setDrawing(true);
  //   const img = new Image();
  //   img.src = context.canvas.toDataURL();

  //   dispatch(
  //     addToTheUndoURLs({
  //       chosenIndex: undoIndex,
  //       undoURL: img.src,
  //     })
  //   );
  // };

  // const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
  //   if (!context || !drawing) return;

  //   switch (tool) {
  //     case "Brush":
  //       brushDraw({ context, e });
  //       break;
  //     case "Rectangle":
  //       rectangleDraw({ e, context, startX, startY, imageURL: imageURL || "" });
  //       break;
  //     case "Circle":
  //       circleDraw({ e, context, startX, startY, imageURL: imageURL || "" });
  //       break;
  //     case "Eraser":
  //       eraserDraw({ e, context });
  //       break;
  //     default:
  //       brushDraw({ context, e });
  //   }
  // };

  // const endDrawing = () => {
  //   if (context) {
  //     context.closePath();
  //     rectangleEnd({ context, setImageURL });
  //     circleEnd({ context, setImageURL });
  //     setDrawing(false);
  //   }
  // };

  // const outDrawing = () => {
  //   if (context) {
  //     context.closePath();
  //     rectangleEnd({ context, setImageURL });
  //     circleEnd({ context, setImageURL });
  //     setDrawing(false);
  //   }
  // };

  return (
    <>
      <div className={s.sizeInputsOfCanvas}>
        <TextField
          label="Width"
          sx={{ width: "150px" }}
          variant="standard"
          value={width === 0 ? "" : width}
          type="number"
          onChange={(e) => {
            const inputValue = checkForValidSize(parseInt(e.target.value));
            setWidth(inputValue > 1500 ? 1500 : inputValue);
          }}
        />
        <TextField
          label="Height"
          sx={{ width: "150px", marginLeft: "10px" }}
          variant="standard"
          value={height === 0 ? "" : height}
          type="number"
          onChange={(e) => {
            const inputValue = checkForValidSize(parseInt(e.target.value));
            setHeight(inputValue > 700 ? 700 : inputValue);
          }}
        />
      </div>
      <div className={s.canvas}>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onMouseDown={(e) =>
            startDrawing({
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
            })
          }
          onMouseMove={(e) =>
            draw({ e, context, drawing, tool, startX, startY, imageURL })
          }
          onMouseUp={() => endDrawing({ context, setImageURL, setDrawing })}
          onMouseOut={() => outDrawing({ context, setImageURL, setDrawing })}
        />
      </div>
    </>
  );
};
