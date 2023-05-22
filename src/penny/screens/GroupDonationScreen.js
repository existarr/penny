import { Helmet } from "react-helmet-async";
// @mui
import {
  Grid,
  Button,
  IconButton,
  Container,
  Stack,
  Typography,
} from "@mui/material";
// components
import Iconify from "../../components/iconify";

import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { firestore } from "./firebase-config";
import CircularProgress from "@mui/material/CircularProgress";

//import data
import user from "../data/users";
import organizations from "../data/organizations";

//import components
import AccountCard from "../components/AccountCard";
import DonationAmountGraph from "../components/DonationAmountGraph";
import ryanIcon from "../assets/ryan_icon.png";

export default function GroupDonation() {
  const [donationData, setDonationData] = useState({});
  const [currentDonationHistory, setCurrentDonationHistory] = useState([]);
  const [userData, setUserData] = useState({});
  const [groupUserData, setGroupUserData] = useState([]);
  const [groupUserSize, setGroupUserSize] = useState(0);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const handleCloseScreen = () => {
    navigate("/penny/home");
  };

  const donationCurrentAmount = localStorage.getItem("orgCurrentAmount");

  useEffect(() => {
    const callData = async () => {
      setLoading(true);
      const userRef = firestore.collection("user").doc(userId);
      const userSnapshot = await userRef.get();
      setUserData(userSnapshot.data());
      getCurrentHistory(userSnapshot.data().currentDonationOrganization);
      const orgName = userSnapshot.data().currentDonationOrganization;

      const groupUserRef = firestore.collection("user");
      const groupUserQuery = groupUserRef.where(
        "currentDonationOrganization",
        "==",
        orgName
      );
      const groupUserSnapshot = await groupUserQuery.get();
      const groupUserList = [];
      groupUserSnapshot.forEach((doc) => {
        if (doc.data().id != userId) {
          groupUserList.push({
            id: doc.data().id,
            name: doc.data().name,
            imageUrl: doc.data().imageUrl,
          });
        }
      });
      groupUserList.sort((a, b) => {
        return a.name.localeCompare(b.name, "ko");
      });
      setGroupUserData(groupUserList);
      setGroupUserSize(groupUserSnapshot.size - 1);

      const orgRef = firestore.collection("organization");
      const orgQuery = orgRef.where("name", "==", orgName);
      const orgSnapshot = await orgQuery.get();

      if (!orgSnapshot.empty) {
        orgSnapshot.forEach(async (doc) => {
          const orgDocRef = await orgRef.doc(doc.id).get();
          setDonationData({
            donateOrganization: userSnapshot.data().currentDonationOrganization,
            donateAmount: userSnapshot.data().currentDonationAmount,
            groupAmount: orgDocRef.data().currentAmount,
            targetAmount: orgDocRef.data().targetAmount,
            donateType: userSnapshot.data().curentDonationType,
          });
        });
      }
      setLoading(false);
    };

    callData();
  }, []);

  const getCurrentHistory = async (orgName) => {
    const userRef = firestore.collection("user").doc(userId);
    const currHisRef = userRef.collection("currentHistory");
    const currHisQuery = currHisRef.where("organization", "==", orgName);
    const currHisSnapshot = await currHisQuery.get();
    const historyArray = [];
    if (!currHisSnapshot.empty) {
      const promises = currHisSnapshot.docs.map(async (doc) => {
        const currHisDocRef = await currHisRef.doc(doc.id).get();
        historyArray.push({
          order: currHisDocRef.data().date.toDate(),
          date: currHisDocRef.data().date.toDate().toLocaleDateString(),
          time: currHisDocRef.data().date.toDate().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }),
          amount: currHisDocRef.data().amount.toLocaleString(),
          accumulate: currHisDocRef.data().accumulate.toLocaleString(),
        });
      });
      await Promise.all(promises);
      historyArray.sort((a, b) => {
        return b.order - a.order;
      });
      setCurrentDonationHistory(historyArray);
    }
  };

  // console.log(currentDonationHistory);

  return (
    <>
      <Helmet>
        <title> Group Donation </title>
      </Helmet>
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
        <>
          <Container
            style={{
              background: "lightblue",
              height: screenHeight * 0.42,
              paddingTop: "20px",
            }}
          >
            {/*진행 중인 모금 없을 시 organization-list로 이동하는 버튼 || 닫기*/}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IconButton onClick={handleCloseScreen}>
                <Iconify
                  icon="eva:arrow-ios-forward-fill"
                  style={{ color: "black", transform: "scaleX(-1)" }}
                />
              </IconButton>
              <span
                style={{
                  fontSize: "12pt",
                  fontWeight: "bolder",
                  marginTop: "-5px",
                }}
              >
                함께 모금
              </span>
              <IconButton>
                <Iconify
                  icon="eva:settings-2-fill"
                  style={{ color: "black", visibility: "hidden" }}
                />
              </IconButton>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                margin: "none",
                padding: "none",
              }}
            >
              <span
                style={{
                  marginBottom: "12px",
                  marginTop: "-12px",
                  fontSize: "10pt",
                }}
              >
                모금 단체 - {donationData.donateOrganization}
              </span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginTop: "-3px",
                  fontSize: "12pt",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>다함께 모금한 금액: </span>
                  <span
                    style={{
                      fontSize: "16pt",
                      fontWeight: "bold",
                      color: "#0062ff",
                    }}
                  >
                    {(donationData.groupAmount - 0).toLocaleString()}원
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>내가 모금한 금액:</span>
                  <span
                    style={{
                      fontSize: "16pt",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    {(donationData.donateAmount - 0).toLocaleString()}원
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>남은 금액:</span>
                  <span
                    style={{
                      fontSize: "16pt",
                      fontWeight: "bold",
                      color: "#f29100",
                    }}
                  >
                    {(
                      donationData.targetAmount - donationData.donateAmount
                    ).toLocaleString()}
                    원
                  </span>
                </div>
                {donationData.targetAmount ? (
                  <DonationAmountGraph
                    chartData={[
                      {
                        label: "",
                        currentAmount: donationData.groupAmount,
                        restAmount:
                          donationData.targetAmount - donationData.groupAmount,
                      },
                    ]}
                    targetAmount={donationData.targetAmount}
                  ></DonationAmountGraph>
                ) : null}
              </div>
            </div>
            <div>
              <span
                style={{
                  fontSize: "9pt",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginTop: "-12px",
                  marginRight: "36px",
                }}
              >
                목표 금액:{" "}
                <span
                  style={{
                    fontSize: "8pt",
                    fontWeight: "bold",
                    marginLeft: "3px",
                  }}
                >
                  {(donationData.targetAmount - 0).toLocaleString()}원
                </span>
              </span>
            </div>
            {groupUserSize == 0 ? (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "-10px",
                  }}
                >
                  <img src={ryanIcon} alt="" style={{ width: "50px" }} />
                  <span style={{ fontSize: "10pt" }}>
                    아직은 함께하고 있는 사람이 없어요{" "}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "10px",
                  }}
                >
                  <span>
                    현재{" "}
                    <span
                      style={{
                        fontSize: "14pt",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {groupUserSize}명
                    </span>
                    이 뜻을 함께하고 있어요!
                  </span>
                  <Link
                    to={"/penny/groupUserList"}
                    state={{ groupUserData: groupUserData }}
                    style={{ marginTop: "-6px", color: "#005cae" }}
                  >
                    <span style={{ fontSize: "8pt", fontWeight: "light" }}>
                      어떤 분들과 함께하고 있는지 궁금하신가요?
                    </span>
                  </Link>
                </div>
              </>
            )}
          </Container>
          <Container
            style={{
              background: "white",
              height: screenHeight * 0.562,
              overflow: "auto",
              padding: "0px",
            }}
          >
            {currentDonationHistory.length == 0 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "70%",
                }}
              >
                <img src={ryanIcon} width={90} height={90} />
                <span>모금 내역이 없습니다.</span>
              </div>
            ) : (
              <div style={{ width: "100%" }}>
                {currentDonationHistory.map((h, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                          width: "100%",
                          padding: "12px 20px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            paddingBottom: "5px",
                          }}
                        >
                          <span>{h.date}</span>
                          <span
                            style={{ fontSize: "10pt", letterSpacing: 0.2 }}
                          >
                            {h.time}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "end",
                            justifyContent: "center",
                          }}
                        >
                          <span>{h.amount} 원</span>
                          <span style={{ color: "grey" }}>
                            {h.accumulate} 원
                          </span>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            )}
          </Container>
        </>
      )}
    </>
  );
}
