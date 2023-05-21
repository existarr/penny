import { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function App() {
  const location = useLocation();
  const userId = localStorage.getItem("usreId");
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  return (
    <div style={{height: screenHeight * 0.92}}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
          padding: "0px 5px",
        }}
      >
        <Button disabled={true} />
        <p style={{ textAlign: "center", fontSize: "11pt" }}>Penny</p>
        <Link to={"/penny/home"}>
          <Button style={{ color: "black", width: "40px", height: "40px" }}>
            닫기
          </Button>
        </Link>
      </div>

      <div
        style={{
          backgroundColor: "#BFDDFB",
          height: "320px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingRight: "10px",
          paddingLeft: "10px",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            marginTop: "40px",
            marginBottom: "0px",
          }}
        >
          티끌 모아 태산!
        </h3>
        <h2 style={{ textAlign: "center", marginTop: "0px" }}>
          Penny 와 함께 <span style={{ color: "blue" }}>기부</span>하자
        </h2>

        <p style={{ textAlign: "center", fontSize: "14px" }}>
          Penny는 “티끌모아 태산”이라는 속담의 의미를 믿습니다.
        </p>
        <p style={{ textAlign: "center", fontSize: "14px" }}>
          약 10만명의 사용자가 “하루 100원씩”만 기부해도 한달이면 “3억”을 기부할
          수 있습니다.
        </p>
        <p style={{ textAlign: "center", fontSize: "14px" }}>
          Penny는 티끌의 힘을 믿습니다. 어려운 이들을 위해 작은 티끌이
          되어주세요
        </p>
      </div>
      <div
        style={{
          marginRight: "15px",
          marginLeft: "15px",
        }}
      >
        <p style={{ fontSize: "13px" }}> 티끌모아 태산! PENNY</p>
        <p style={{ fontSize: "13px" }}>
          계좌 속 작은 단위 잔돈을 모아 수동/자동으로 모금하여 기부합니다. 일정
          금액이 모금되면 기부 단체에 기부금이 전달 됩니다.
        </p>
        <p style={{ fontSize: "13px" }}>
          소액으로 모금하여 부담이 적은 기부 시스템입니다. 사용자 위치 서비스를
          이룔하여 가깝고 친숙한 이웃 단체에 기부를 할 수 있습니다.
        </p>
        <p style={{ fontSize: "13px" }}>
          기부 이후 실제 기부를 진행한 활동 사진을 볼 수 있어 투명성이
          보장됩니다.
        </p>
      </div>

      <Link
        to={"/penny/setup"}
        state={{ userId: userId }}
        s
        tyle={{ textDecoration: "none" }}
      >
        <Button
          variant="contained"
          fullWidth
          style={{
            backgroundColor: "#F7E676",
            color: "black",
            width: "100%",
            height: screenHeight * 0.08,
            borderColor: "#F7E676",
            borderRadius: 0,
            position: "fixed",
            bottom: 0,
          }}
        >
          Penny 신청하기
        </Button>
      </Link>
    </div>
  );
}
