import { useState, useEffect } from "react";
import Button from "@mui/material/Button";

import { MapMarker, Map } from "react-kakao-maps-sdk";
import { Link, useLocation, useNavigate } from "react-router-dom";

//import user data
import user from "../data/users";
import organizations from "../data/organizations";

import { firestore, serverTimestamp } from "./firebase-config";

var accountInfo = [];
user.map((u) => {
  u.account.map((acc, index) => (accountInfo[index] = acc));
});

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [orgInfo, setOrgInfo] = useState(location.state.organization);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  const selectOrg = async () => {
    const userRef = firestore
      .collection("user")
      .doc(localStorage.getItem("userId"));
    if (localStorage.getItem("donationType") == "single") {
      await userRef.set(
        {
          currentDonationOrganization: orgInfo.name,
          cuttentDonationStartDate: serverTimestamp(),
          currentDonationAmount: 0,
        },
        { merge: true }
      );
      navigate("/penny/targetAmount");
    } else {
      await userRef.set(
        {
          currentDonationOrganization: orgInfo.name,
          cuttentDonationStartDate: serverTimestamp(),
          currentDonationAmount: 0,
          targetDonationAmount: orgInfo.targetAmount,
        },
        { merge: true }
      );
      navigate("/penny/home");
    }
  };

  return (
    <>
      <div style={{ height: screenHeight }}>
        {orgInfo && (
          <>
            <span>기관명: {orgInfo.name}</span>
            <br />
            <span>위치: {orgInfo.location}</span>
            <br />
            <span>소개글</span>
            <br />
            <span>{orgInfo.description}</span>
            {/* {orgInfo[0].description.map((d) => (
              <span>
                {d}
                <br />
              </span>
            ))} */}
            <br />
            <span>기부 한 줄 요약: {orgInfo.overview}</span>
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
            onClick={() => selectOrg()}
          >
            선택하기
          </Button>
        </div>
      </div>
    </>
  );
}
