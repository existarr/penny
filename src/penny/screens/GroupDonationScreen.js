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

export default function GroupDonation() {
  const [donationData, setDonationData] = useState({});
  const [currentDonationHistory, setCurrentDonationHistory] = useState([]);
  const [userData, setUserData] = useState({});
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

      const orgRef = firestore.collection("organization");
      const orgQuery = orgRef.where(
        "name",
        "==",
        userSnapshot.data().currentDonationOrganization
      );
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
        const dateA = new Date(a.date + " " + a.time);
        const dateB = new Date(b.date + " " + b.time);
        return dateB - dateA;
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
              height: screenHeight * 0.355,
              paddingTop: "20px",
            }}
          >
            {/*진행 중인 모금 없을 시 organization-list로 이동하는 버튼 || 닫기*/}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
            >
              <IconButton onClick={handleCloseScreen}>
                <Iconify
                  icon="eva:arrow-ios-forward-fill"
                  style={{ color: "black", transform: "scaleX(-1)" }}
                />
              </IconButton>
              <span style={{ fontSize: "14pt", fontWeight: "bolder" }}>
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
                  marginBottom: "10px",
                  marginTop: "-6px",
                  fontSize: "10pt",
                }}
              >
                모금 단체 - {donationData.donateOrganization}
              </span>
              <span>
                현재까지 다함께{" "}
                <span
                  style={{
                    fontSize: "16pt",
                    fontWeight: "bold",
                    color: "#0062ff",
                  }}
                >
                  {(donationData.groupAmount - 0).toLocaleString()}원
                </span>{" "}
                모금했어요
              </span>
              <span>
                내가 모금한 금액:{" "}
                <span
                  style={{
                    fontSize: "16pt",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  {(donationData.donateAmount - 0).toLocaleString()}원
                </span>
              </span>
              <span>
                목표 금액까지{" "}
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
                </span>{" "}
                남았어요
              </span>
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
          </Container>
          <Container
            style={{
              background: "white",
              height: screenHeight * 0.637,
              overflow: "auto",
              padding: "0px",
            }}
          >
            <div style={{ width: "100%" }}>
              {currentDonationHistory.map((h) => {
                return (
                  <>
                    <div
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
                        <span style={{ fontSize: "10pt", letterSpacing: 0.2 }}>
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
                        <span style={{ color: "grey" }}>{h.accumulate} 원</span>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </Container>
        </>
      )}
    </>
  );
}
