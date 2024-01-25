type RectStart = {
  e: React.MouseEvent<HTMLCanvasElement>;
  context: CanvasRenderingContext2D | null;
  color: string;
  setStartX: React.Dispatch<React.SetStateAction<number>>;
  setStartY: React.Dispatch<React.SetStateAction<number>>;
  setImageURL: React.Dispatch<React.SetStateAction<string | null>>;
};

export const rectangleStart = ({
  e,
  context,
  color,
  setStartX,
  setStartY,
  setImageURL,
}: RectStart) => {
  setStartX(e.nativeEvent.offsetX);
  setStartY(e.nativeEvent.offsetY);
  const imageURL = context?.canvas?.toDataURL() || null;
  setImageURL(imageURL);
  context!.fillStyle = color;
};

type RectDraw = {
  context: CanvasRenderingContext2D | null;
  e: React.MouseEvent<HTMLCanvasElement>;
  startX: number;
  startY: number;
  imageURL: string;
};

export const rectangleDraw = ({
  e,
  context,
  startX,
  startY,
  imageURL,
}: RectDraw) => {
  const endX = e.nativeEvent.offsetX;
  const endY = e.nativeEvent.offsetY;
  const img = new Image();
  img.src = imageURL;
  img.onload = () => {
    context!.clearRect(0, 0, context!.canvas.width, context!.canvas.height);
    context!.drawImage(
      img,
      0,
      0,
      context!.canvas.width,
      context!.canvas.height
    );
    context!.beginPath();
    context!.fillRect(startX, startY, endX - startX, endY - startY);
  };
};

type RectEnd = {
  context: CanvasRenderingContext2D | null;
  setImageURL: React.Dispatch<React.SetStateAction<string | null>>;
};

export const rectangleEnd = ({ context, setImageURL }: RectEnd) => {
  const imageURL = context?.canvas?.toDataURL() || null;
  setImageURL(imageURL);
};
