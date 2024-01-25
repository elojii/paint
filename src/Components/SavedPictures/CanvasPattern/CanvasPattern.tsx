import { useEffect, useRef } from "react";

type PatternType = {
  url: string;
};

export const CanvasPattern = ({ url }: PatternType) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d")!;
      const img = new Image();
      img.src = url;
      img.onload = () => {
        const newWidth = 800;
        const newHeight = 600;

        canvas.width = newWidth;
        canvas.height = newHeight;

        ctx.clearRect(0, 0, newWidth, newHeight);
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
      };
    }
  }, []);
  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ width: "400px", height: "250px" }}
      />
    </>
  );
};
