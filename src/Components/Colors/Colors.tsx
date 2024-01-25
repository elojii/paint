import s from "./Colors.module.css";
import { setColor } from "../../store/colorSlice";
import { useDispatch } from "react-redux";
export const Colors = () => {
  const dispatch = useDispatch();
  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "pink",
    "brown",
    "gray",
    "black",
    "white",
    "cyan",
    "magenta",
    "lime",
    "indigo",
    "violet",
    "teal",
    "maroon",
    "olive",
    "navy",
  ];
  return (
    <>
      <div className={s.container}>
        {colors.map((color) => (
          <div
            key={color}
            style={{ backgroundColor: color }}
            className={s.element}
            onClick={() => dispatch(setColor(color))}
          ></div>
        ))}
      </div>
    </>
  );
};
