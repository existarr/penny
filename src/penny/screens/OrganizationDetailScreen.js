import { useState, useEffect } from "react";
import Button from "@mui/material/Button";

import { MapMarker, Map } from "react-kakao-maps-sdk";

//import user data
import user from "../data/users";
import organizations from "../data/organizations";

var accountInfo = [];
user.map((u) => {
  u.account.map((acc, index) => (accountInfo[index] = acc));
});

export default function App() {
  const initialOrgInfo = {
    name: "",
    location: "",
    description: [""],
    overview: "",
  };
  const [orgInfo, setOrgInfo] = useState([initialOrgInfo]);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const organizationInfo = organizations.map((o) => ({
      name: o.name,
      location: o.location,
      description: o.description,
      overview: o.donationOverview,
    }));
    //이전 페이지에서 props로 받아오면 됨
    console.log(organizationInfo);
    setOrgInfo(organizationInfo);
  }, []);

  return (
    <>
      <div style={{ height: screenHeight }}>
        {orgInfo && (
          <>
            <span>기관명: {orgInfo[0].name}</span>
            <br />
            <span>위치: {orgInfo[0].location}</span>
            <br />
            <span>소개글</span>
            <br />
            {orgInfo[0].description.map((d) => (
              <span>
                {d}
                <br />
              </span>
            ))}
            <br />
            <span>기부 한 줄 요약: {orgInfo[0].overview}</span>
          </>
        )}
        <div>
          <Button
            variant="contained"
            fullWidth
            style={{
              backgroundColor: "#F7E676",
              borderRadius: "0px",
              color: "black",
              width: "100%",
              height: screenHeight * 0.08,
              position: "fixed",
              bottom: 0,
            }}
          >
            선택하기
          </Button>
        </div>
      </div>
    </>
  );
}
