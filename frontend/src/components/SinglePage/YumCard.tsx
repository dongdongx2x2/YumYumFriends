import React, { useState } from "react";
import "../styles/SinglePage/YumCard.css";
import { Bounce } from "../../pages/styles/transition";

interface Yum {
  name: string | undefined;
  type: string | undefined;
  personality: string | undefined;
}

interface Props {
  yum: Yum;
}

const YumCard: React.FC<Props> = ({ yum }) => {
  const [flip, setFlip] = useState(true);

  return (
    <Bounce>
      <div className={`card ${flip ? "flip" : ""}`}>
        <div className="front" onClick={() => setFlip(!flip)}>
          <img
            className="card-yum-image"
            src={require(`../../assets/StopYums/${yum.name}.png`)}
            alt="yum image"
          />
          <img
            className="shadow"
            src={require(`../../assets/Common/circle-shadow.png`)}
            alt=""
          />
          <div className="description">
            <p className="card-title">{yum.type}</p>
            <p className="card-content">
              <span>{yum.personality}</span> 인 <span>{yum.type}</span>과 친구가
              되었어요!
            </p>
          </div>
        </div>

        <div className="back" onClick={() => setFlip(!flip)}>
          <p>뒷면</p>
          <br />
          <p>패턴이나 게임 로고</p>
        </div>
      </div>
    </Bounce>
  );
};

export default YumCard;