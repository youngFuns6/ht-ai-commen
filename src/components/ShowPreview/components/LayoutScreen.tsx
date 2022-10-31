import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import styles from "../showPreview.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { cloneDeep } from "lodash";
import { State, changeScreen } from "@/store/reducer/screenSlice";
import Player from "@/components/Player";

const LayoutScreen = () => {
  const { count, full, currentScreen, chnListByRegion, page } = useSelector(
    (state: State) => state.screen
  );
  const dispatch = useDispatch();
  const screenRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateRows: "repeat(4, 1fr)",
    gridTemplateAreas: `
            'a a a b'
            'a a a c'
            'a a a d'
            'e f g h'
          `,
  });

  useEffect(() => {
    handlerCount(count);
  }, [count]);

  useLayoutEffect(() => {
    if (full) {
      setStyle({
        gridTemplateColumns: "1fr",
        gridTemplateRows: "1fr",
      });
    } else {
      handlerCount(count);
    }
  }, [full]);

  const handlerCount = (count: number) => {
    switch (count) {
      case 1:
        setStyle({
          gridTemplateColumns: "1fr",
          gridTemplateRows: "1fr",
        });
        break;
      case 4:
        setStyle({
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
        });
        break;
      case 6:
        setStyle({
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          gridTemplateAreas: `
            'a a b'
            'a a c'
            'd e f'
          `,
        });
        break;
      case 8:
        setStyle({
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(4, 1fr)",
          gridTemplateAreas: `
            'a a a b'
            'a a a c'
            'a a a d'
            'e f g h'
          `,
        });
        break;
      case 9:
        setStyle({
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
        });
        break;
      case 16:
        setStyle({
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(4, 1fr)",
        });
        break;
    }
  };

  // 拖拽开始
  const onDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.effectAllowed = "none";
  };

  // 拖拽中
  const onDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
  };

  // 拖拽结束
  const onDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    const dropChannel = e.dataTransfer.getData("channel");
    const chn = JSON.parse(dropChannel);
    let arr = cloneDeep([
      ...chnListByRegion,
      ...Array.from({
        length:
          Math.ceil(chnListByRegion.length / count) * count -
          chnListByRegion.length,
      }),
    ]);
    arr.splice(index + count * (page - 1), 1, chn);
    dispatch(changeScreen({ chnListByRegion: arr }));
  };

  return (
    <div ref={screenRef} style={style} className={styles.layoutScreen}>
      {Array.from({ length: full ? 1 : count }).map((_, index) => (
        <div
          onDragStart={(e) => onDragStart(e, index)}
          onDrop={(e) => onDrop(e, index)}
          onDragOver={(e) => onDragOver(e, index)}
          draggable
          onClick={() => dispatch(changeScreen({ currentScreen: index }))}
          style={{
            gridArea:
              index === 0 && (count === 6 || count === 8) && !full ? "a" : "",
          }}
          key={index}
          className={
            index === (full ? 0 : currentScreen)
              ? `${styles.screen} ${styles.activeBorder}`
              : styles.screen
          }
        >
          {chnListByRegion.length > 0 && (
            <Player
              channelId={
                full
                  ? chnListByRegion[(page - 1) * count + currentScreen]?.id
                  : chnListByRegion.slice((page - 1) * count)[index]?.id
              }
              name={
                full
                  ? chnListByRegion[(page - 1) * count + currentScreen]?.name + '-' + chnListByRegion[(page - 1) * count + currentScreen]?.id
                  : chnListByRegion.slice((page - 1) * count)[index]?.name + '-' + chnListByRegion.slice((page - 1) * count)[index]?.id
              }
            ></Player>
          )}
        </div>
      ))}
    </div>
  );
};

export default React.memo(LayoutScreen);
