import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store"; // RootState를 import 해야합니다.
import { toggleBgm } from "../store/bgmSlice";

import Card from "../components/Common/Card";
import Toggle from "../components/Common/Toggle";
import Stepper from "../components/Common/Stepper";
import styles from "./styles/SettingsPage.module.css";

const SettingsPage: React.FC = () => {
  const dispatch = useDispatch();
  const bgmOn = useSelector((state: RootState) => state.bgm.bgmOn);

  const handleBgm = () => {
    dispatch(toggleBgm());
  };

  const handleSoundEffect = () => {
    console.log("효과음 on/off");
  };

  return (
    <Card>
      <ul className={styles.list}>
        <li>
          <div className={styles["toggle-container"]}>
            <Toggle label="배경음악" toggled={bgmOn} onClick={handleBgm} />
          </div>
        </li>
        <li>
          <div className={styles["toggle-container"]}>
            <Toggle
              label="효과음"
              toggled={false}
              onClick={handleSoundEffect}
            />
          </div>
        </li>
        <li>
          <div>
            {/* <Stepper label="먹는 횟수" unit="회" /> */}
            <Stepper label="먹는 횟수" />
          </div>
        </li>
      </ul>
    </Card>
  );
};

export default SettingsPage;