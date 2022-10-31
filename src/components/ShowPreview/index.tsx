import React, { useCallback, useState } from "react";
import { Layout } from "antd";
import { cloneDeep } from "lodash";
import styles from "./showPreview.module.scss";
import ToolBtn from "../base/ToolBtn";
import Pageination from "../Pagination";
import ShowScreen from "./components/ShowScreen";
import { useSelector, useDispatch } from "react-redux";
import { State, changeScreen } from "@/store/reducer/screenSlice";
import LayoutScreen from "./components/LayoutScreen";
import HiddenBtn from "../base/HiddenBtn";

import qpBtn from "@/assets/images/btn/tools/qp.png";
import qpAcBtn from "@/assets/images/btn/tools/qp_ac.png";
import gbBtn from "@/assets/images/btn/tools/gb.png";
import gbAcBtn from "@/assets/images/btn/tools/gb_ac.png";
import fpBtn from "@/assets/images/btn/tools/fp.png";
import fpAcBtn from "@/assets/images/btn/tools/fp_ac.png";

const { Content } = Layout;

const ShowPreview = () => {
  const {
    page,
    full,
    count,
    chnListByRegion,
    currentScreen,
    hiddenLeftBar,
    hiddenPreviewList,
  } = useSelector((state: State) => state.screen);
  const dispatch = useDispatch();
  const [showScreen, setShowScreen] = useState<boolean>(false);

  const onChange = useCallback(
    (page: number) => {
      dispatch(changeScreen({ ...screen, page, full: false }));
    },
    [screen]
  );

  const onShowScreen = () => {
    dispatch(changeScreen({ ...screen, full: false }));
    setShowScreen(!showScreen);
  };

  const handlerFull = () => {
    dispatch(changeScreen({ ...screen, full: !full }));
  };

  const handlerClose = () => {
    let arr = cloneDeep(chnListByRegion);
    arr.splice(currentScreen + (page - 1) * count, 1, undefined);
    dispatch(changeScreen({ ...screen, chnListByRegion: arr }));
  };

  return (
    <Layout className={styles.showPreview}>
      <div className={styles.btn}>
        <HiddenBtn
          onChange={() =>
            dispatch(changeScreen({ hiddenLeftBar: !hiddenLeftBar }))
          }
          width="15px"
          height="100px"
          arrow={hiddenLeftBar ? "right" : "left"}
        />
      </div>
      <Content className={styles.content}>
        <LayoutScreen />
      </Content>
      <div className={styles.tools}>
        <div className={styles.left}>
          <ToolBtn src={qpBtn} acSrc={qpAcBtn} onClick={handlerFull} />
          <ToolBtn src={gbBtn} acSrc={gbAcBtn} onClick={handlerClose} />
        </div>
        <div className={styles.right}>
          <Pageination
            page={page}
            total={chnListByRegion.length}
            onChange={onChange}
          />
          <div className={styles.screenWrop}>
            <ToolBtn src={fpBtn} acSrc={fpAcBtn} onClick={onShowScreen} />
            {showScreen && <ShowScreen />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default React.memo(ShowPreview);
