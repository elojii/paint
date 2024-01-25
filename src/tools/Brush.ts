type BrushStart = {
  e: React.MouseEvent<HTMLCanvasElement>;
  context: CanvasRenderingContext2D | null;
  color: string;
  stroke: number;
};

export const brushStart = ({ e, context, color, stroke }: BrushStart) => {
  context!.beginPath();
  context!.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  context!.strokeStyle = color;
  context!.lineWidth = stroke;
};

type BrushDraw = {
  e: React.MouseEvent<HTMLCanvasElement>;
  context: CanvasRenderingContext2D | null;
};

export const brushDraw = ({ context, e }: BrushDraw) => {
  context!.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  context!.stroke();
};
