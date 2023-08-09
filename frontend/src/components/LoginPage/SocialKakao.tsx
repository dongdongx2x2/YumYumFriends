import React from "react";
import KakaoLogin from "react-kakao-login";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { setUserInfo } from "../../store/userSlice";
import axios from "axios";

interface SocialKakaoProps {
  onSuccess: () => void;
}

const SocialKakao: React.FC<SocialKakaoProps> = ({ onSuccess }) => {
  const kakaoClientId = "b7122629a0a31ceda48e9b68c1655d8d";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const kakaoOnSuccess = (data: any) => {
    console.log("Kakao login success:", data); // 사용자 정보 출력

    // 프로필 정보가 있을 경우에만 사용자 ID, 이메일, 닉네임 정보를 가져옵니다.
    if (data.profile) {
      const { id, kakao_account } = data.profile; // 사용자 ID, 이메일, 닉네임 정보 가져오기
      const nickname = kakao_account.profile.nickname;
      console.log("user nickname: ", data.profile.properties.nickname);

      // API 요청을 보낼 URL을 생성합니다.
      const apiUrl = `https://yumyumfriends.site/api/v1/kakao/login?id=${id}&email=${kakao_account.email}&nickname=${kakao_account.profile.nickname}`;

      axios.get(apiUrl)
      .then((response) => {
        if (response.status === 200) {
          // console.log("Token and user info sent successfully to the server");
          onSuccess();
          navigate("/main");
          const currentYum = response.data.currentYum
          localStorage.setItem("id", JSON.stringify(id));
          localStorage.setItem("nickname", JSON.stringify(nickname));
          localStorage.setItem("currentYum", JSON.stringify(currentYum));
          // console.log("대표냠: " ,response.data.currentYum);
          dispatch(setUserInfo({ id, nickname, currentYum }));
        } else {
          console.error("Failed to send token and user info to the server");
          throw new Error("API 요청에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("Error sending token and user info to the server", error);
      });

      // Render the NavBar component and pass the nickname as a prop
      return <NavBar nickname={nickname} />;
    }
  };

  const kakaoOnFailure = (error: any) => {
    console.log("Kakao login failed:", error); // 에러 정보 출력
  };

  return (
    <>
      <KakaoLogin
        token={kakaoClientId}
        onSuccess={kakaoOnSuccess}
        onFail={kakaoOnFailure}
      />
    </>
  );
};

export default SocialKakao;
