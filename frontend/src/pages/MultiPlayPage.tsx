import React, { useState, useEffect } from "react";
import M_OpenViduComponent from "../components/MultiVidu/M_OpenViduComponent";
import "./styles/MultiPlayPage.css";
// 여기부터 싱글 import
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setReduxFriendYum } from "../store/friendYumSlice";
// 얌얌이들
import yum1 from "../assets/RunningYums/1.gif";
import yum2 from "../assets/RunningYums/2.gif";
import yum7 from "../assets/RunningYums/7.gif";
import yum10 from "../assets/RunningYums/10.gif";
import yum12 from "../assets/RunningYums/12.gif";
import yum13 from "../assets/RunningYums/13.gif";
//얌얌 파워 달리기
import powerYum1 from "../assets/RunningYumsPower/1.gif";
import powerYum2 from "../assets/RunningYumsPower/2.gif";
import powerYum7 from "../assets/RunningYumsPower/7.gif";
import powerYum10 from "../assets/RunningYumsPower/10.gif";
import powerYum12 from "../assets/RunningYumsPower/12.gif";
import powerYum13 from "../assets/RunningYumsPower/13.gif";
// 악당
import Virus from "../assets/RunningYums/virus.gif";
import Virus2 from "../assets/RunningYums/virus2.gif";

const MultiPlayPage: React.FC = () => {
  const urlSearch = new URLSearchParams(window.location.search);
  const sessionID = urlSearch.get("SessionID");
  const encodedHostInfo = urlSearch.get("HostInfo");
  const hostInfo = decodeURIComponent(encodedHostInfo || "");
  const gameType = urlSearch.get("GameType");
  const myYum = localStorage.getItem("currentYum");
  const [virusImage, setVirusImage] = useState(Virus);
  const yumImages: { [key: number]: string } = {
    1: yum1,
    2: yum2,
    7: yum7,
    10: yum10,
    12: yum12,
    13: yum13,
  };
  const PoweryumImages: { [key: number]: string } = {
    1: powerYum1,
    2: powerYum2,
    7: powerYum7,
    10: powerYum10,
    12: powerYum12,
    13: powerYum13,
  };

  const [friendYum, setFriendYum] = useState(0);

  const commonProps = { sessionID, hostInfo, gameType };

  // 여기부터 싱글 변수 및 함수
  const detection = useSelector((state: RootState) => state.detection.value);
  const reduxFriendYum = useSelector((state: RootState) => state.friendYum);
  const dispatch = useDispatch();
  const [mySession, setMySession] = useState<any>(null);

  // detection 게임만들기
  const [detectionChange, setDetectionChange] = useState(false);
  const [prevDetection, setPrevDetection] = useState(false);
  //

  const handleMySession = (obj: any) => {
    console.log("Received eatValue:", obj.eatValue);
    setMySession(obj);
    obj.on("signal:detectionChange", (event: any) => {
      if (event.from.connectionId !== obj.connection.connectionId) {
        console.log("Received detection from other:", event.data);
        // 공격 메시지 수신 시 애니메이션 변경
        if (event.data) {
          // 공격 애니메이션 시작
        } else {
          // 공격 애니메이션 정지
        }
      }
    });
    obj.on("signal:friendYum", (event: any) => {
      console.log("test");
      if (event.from.connectionId !== obj.connection.connectionId) {
        console.log("FriendYum is :", event.data);
        setFriendYum(parseInt(event.data));
        dispatch(setReduxFriendYum(parseInt(event.data)));
        // 공격 메시지 수신 시 애니메이션 변경
      }
    });
  };

  const sendMessage = (msgdata: boolean, msgtype: string) => {
    if (mySession != null) {
      mySession
        .signal({
          data: msgdata.toString(), // Any string (optional)
          to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
          type: msgtype, // The type of message (optional)
        })
        .then(() => {
          console.log("Message successfully sent");
        })
        .catch((error: any) => {
          console.error(error);
        });
    } else {
      console.log("No session");
    }
  };

  // useEffect(() => {
  //   if (mySession) {
  //     sendMessage(detection, "detection");
  //   }
  // }, [detection]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVirusImage((prevImage) => (prevImage === Virus ? Virus2 : Virus));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!prevDetection && detection) {
      setDetectionChange(true);
      sendMessage(detectionChange, "detectionChange");

      // 5초 후에 다시 false로 돌아가게 합니다.
      setTimeout(() => {
        setDetectionChange(false);
        sendMessage(detectionChange, "detectionChange");
      }, 5000);
    }

    // 이전 detection 상태를 저장해 둡니다.
    setPrevDetection(detection);
  }, [detection]);

  return (
    <div className="Multi-play-page">
      {/* 멀티모드에서 화면 보이게 */}
      <div className="My-play-page">
        <M_OpenViduComponent
          myYum={myYum}
          onObjectCreated={handleMySession}
          {...commonProps}
        />
        <img className="Virus-image" src={virusImage} alt="VirusMan" />
        <img
          className="myYum-image"
          src={
            detectionChange
              ? myYum
                ? PoweryumImages[parseInt(myYum)]
                : powerYum1
              : myYum
              ? yumImages[parseInt(myYum)]
              : yum1
          }
          alt="My YUM"
        />
        {friendYum !== 0 && (
          <img
            className="friendYum-image"
            src={yumImages[friendYum]}
            alt="Friend YUM"
          />
        )}
      </div>
      {/* 멀티모드 애니메이션 */}
    </div>
  );
};

export default MultiPlayPage;
