import { useState, useEffect } from "react";
import { Button, IconButton } from "@mui/material";
import Iconify from "../../components/iconify";

import { MapMarker, Map } from "react-kakao-maps-sdk";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

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
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(location.state.userData);
  const [orgInfo, setOrgInfo] = useState(location.state.organization);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const donationType = localStorage.getItem("donationType");

  useEffect(() => {
    const callData = async () => {
      setLoading(true);
      // console.log(firestore);
      const userRef = firestore.collection("user").doc(userId);
      const userSnapshot = await userRef.get();
      if (userData == null) setUserData(userSnapshot.data());
      setLoading(false);
      // console.log(userData.currentDonationOrganization);
      // console.log(location.state.userData);
    };
    callData();
  }, []);

  const selectOrg = async () => {
    const userRef = firestore.collection("user").doc(userId);

    const currhisRef = userRef.collection("currentHistory");
    const currHisSnapshot = await currhisRef.get();
    if (!currHisSnapshot.empty) {
      const deletePromises = currHisSnapshot.docs.map((doc) =>
        doc.ref.delete()
      );
      await Promise.all(deletePromises);
    }

    if (userData.currentDonationType == "single") {
      await userRef.set(
        {
          ...location.state.userData,
          currentDonationOrganization: orgInfo.name,
          cuttentDonationStartDate: serverTimestamp(),
          currentDonationAmount: 0,
          isPenny: true,
        },
        { merge: true }
      );
      navigate("/penny/targetAmount");
    } else {
      await userRef.set(
        {
          ...location.state.userData,
          currentDonationOrganization: orgInfo.name,
          cuttentDonationStartDate: serverTimestamp(),
          currentDonationAmount: 0,
          targetDonationAmount: orgInfo.targetAmount,
          isPenny: true,
        },
        { merge: true }
      );
      localStorage.setItem("pennyAccount", userData.donationAccount);
      navigate("/penny/home");
    }
  };

  return (
    <>
      <div style={{ height: screenHeight }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
            padding: "0px 5px",
            marginBottom: "10px",
          }}
        >
          <IconButton onClick={() => navigate(-1)}>
            <Iconify
              icon="eva:arrow-ios-forward-fill"
              style={{ color: "black", transform: "scaleX(-1)" }}
            />
          </IconButton>
          <p style={{ fontSize: "11pt" }}>기관 소개</p>
          <IconButton onClick={() => navigate("/penny/home")}>
            <Iconify icon="eva:close-fill" style={{ color: "black" }} />
          </IconButton>
        </div>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
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
                <br />
                <span>
                  목표 금액: {orgInfo.targetAmount.toLocaleString()}원
                </span>
              </>
            )}
            {userData.currentDonationOrganization == "undefined" ? (
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
            ) : null}
          </div>
        )}
      </div>
    </>
  );
}
