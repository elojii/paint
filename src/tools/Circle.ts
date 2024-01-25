type CircleStart = {
  e: React.MouseEvent<HTMLCanvasElement>;
  context: CanvasRenderingContext2D | null;
  color: string;
  setStartX: React.Dispatch<React.SetStateAction<number>>;
  setStartY: React.Dispatch<React.SetStateAction<number>>;
  setImageURL: React.Dispatch<React.SetStateAction<string | null>>;
};

export const circleStart = ({
  e,
  context,
  color,
  setStartX,
  setStartY,
  setImageURL,
}: CircleStart) => {
  setStartX(e.nativeEvent.offsetX);
  setStartY(e.nativeEvent.offsetY);
  const imageURL = context?.canvas?.toDataURL() || "";
  setImageURL(imageURL);
  context!.fillStyle = color
};

type CircleDraw = {
  context: CanvasRenderingContext2D | null;
  e: React.MouseEvent<HTMLCanvasElement>;
  startX: number;
  startY: number;
  imageURL: string;
};

export const circleDraw = ({
  e,
  context,
  startX,
  startY,
  imageURL,
}: CircleDraw) => {
  const mouseX = e.nativeEvent.offsetX;
  const mouseY = e.nativeEvent.offsetY;
  const img = new Image();
  img.src = imageURL;
  const radius = Math.sqrt(
    Math.pow(mouseX - startX, 2) + Math.pow(mouseY - startY, 2)
  );
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
    context!.arc(startX, startY, radius, 0, 2 * Math.PI);
    context!.fill();
  };
};

type CircleEnd = {
  context: CanvasRenderingContext2D | null;
  setImageURL: React.Dispatch<React.SetStateAction<string | null>>;
};

export const circleEnd = ({ context, setImageURL }: CircleEnd) => {
  const imageURL = context?.canvas?.toDataURL() || null;
  setImageURL(imageURL);
};
