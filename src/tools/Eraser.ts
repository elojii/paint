type EraserTypes = {
  context: CanvasRenderingContext2D | null;
  e: React.MouseEvent<HTMLCanvasElement>;
};

export const eraserStart = ({ context, e }: EraserTypes) => {
  context!.strokeStyle = "white";
  context!.beginPath();
  context!.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
};

export const eraserDraw = ({ context, e }: EraserTypes) => {
  context!.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  context!.stroke();
};
