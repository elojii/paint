import s from "./SavedPictures.module.css";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useState } from "react";
import { CanvasPattern } from "./CanvasPattern/CanvasPattern";
import { setURL } from "../../store/chosenURLSlice";
import arrowImage from "../../assets/imgs/arrow.png";

type SavedPicturesTypes = {
  setShowSaved: React.Dispatch<React.SetStateAction<boolean>>;
  setChosenSavedIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
  setUndoIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const SavedPictures = ({
  setShowSaved,
  setChosenSavedIndex,
  setUndoIndex,
}: SavedPicturesTypes) => {
  const dispatch = useDispatch<AppDispatch>();
  const saved = useSelector((state: RootState) => state.saved.saved);
  const [page, setPage] = useState<number>(1);

  const allPages = Math.ceil(saved.length - 2 > 0 ? saved.length - 2 : 1);

  const getURL = (url: string, index: number) => {
    dispatch(setURL(url));
    setShowSaved(false);
    setChosenSavedIndex(index);
    setUndoIndex(index)
  };

  const pageBackward = () => {
    if (page === 1) return;
    setPage((prev) => prev - 1);
  };

  const pageForward = () => {
    if (page === allPages) return;
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <div className={s.container}>
        {saved.slice(page - 1, page + 2).map((url, index) => {
          const realIndex = page - 1 + index;
          return (
            <span key={url} onClick={() => getURL(url, realIndex)}>
              <CanvasPattern url={url} />
            </span>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <span>
          <img
            style={{ marginRight: "5px" }}
            src={arrowImage}
            alt="backwardImage"
            className={s.backwardArrow}
            onClick={() => pageBackward()}
          />
          <img
            style={{ marginLeft: "5px" }}
            src={arrowImage}
            alt="forwardImage"
            className={s.forwardArrow}
            onClick={() => pageForward()}
          />
        </span>
      </div>
    </>
  );
};
