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
import { useNavigate } from "react-router-dom";

//import data
import user from "../data/users";
import organizations from "../data/organizations";

//import components
import AccountCard from "../components/AccountCard";
import DonationAmountGraph from "../components/DonationAmountGraph";

export default function GroupDonation() {
  const [donationData, setDonationData] = useState({});
  const [currentDonationHistory, setCurrentDonationHistory] = useState([]);
  const [targetAmount, setTargetAmount] = useState();
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/penny/home");
  };
  useEffect(() => {
    setDonationData(
      user.map((u) => ({
        donateOrganization: u.currentDonationOrganization,
        donateAmount: u.currentDonationAmount,
        targetAmount: u.targetDonationAmount,
        donateType: u.currentDonationType,
      }))[0]
    );

    // organizations.map(org => {
    //     if(donationData.donateOrganization == org.name)
    //         setTargetAmount(org.targetDonationAmount);
    // });

    setCurrentDonationHistory(
      user.map((u) => ({
        currentHistoryMapping: u.currentDonationHistory.map((d) => ({
          date: d.donatedDate,
          donated: d.donatedAmount,
          remain: d.balanceRemain,
        })),
      }))[0].currentHistoryMapping
    );
  }, [donationData.donateOrganization]);

  return (
    <>
      <Helmet>
        <title> Single Donation </title>
      </Helmet>

      <Container
        style={{
          background: "lightblue",
          height: screenHeight * 0.31,
          paddingTop: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
            <IconButton onClick={handleButtonClick}>
              <Iconify
                icon="eva:arrow-ios-forward-fill"
                style={{ color: "black", transform: "scaleX(-1)" }}
              />
            </IconButton>
          <span style={{ fontSize: "12pt", fontWeight: "bolder" }}>
            {donationData.donateType ? "함께모금" : "개인모금"}
          </span>
          <IconButton>
            <Iconify icon="eva:settings-2-fill" style={{ color: "black" }} />
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
          <span style={{ marginBottom: "10px", marginTop: "-5px" }}>
            {donationData.donateOrganization}
          </span>
          <span>
            현재까지{" "}
            <span
              style={{ fontSize: "16pt", fontWeight: "bold", color: "#0062ff" }}
            >
              {(donationData.donateAmount - 0).toLocaleString()}원
            </span>{" "}
            모금했어요
          </span>
          <span>
            목표 금액까지{" "}
            <span
              style={{ fontSize: "16pt", fontWeight: "bold", color: "#f29100" }}
            >
              {(
                donationData.targetAmount - donationData.donateAmount
              ).toLocaleString()}
              원
            </span>{" "}
            남았어요
          </span>
          <DonationAmountGraph
            chartData={[
              {
                label: "",
                currentAmount: donationData.donateAmount,
                restAmount:
                  donationData.targetAmount - donationData.donateAmount,
              },
            ]}
            targetAmount={donationData.targetAmount}
          ></DonationAmountGraph>
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
              style={{ fontSize: "8pt", fontWeight: "bold", marginLeft: "3px" }}
            >
              {(donationData.targetAmount - 0).toLocaleString()}원
            </span>
          </span>
        </div>
      </Container>
      <Container
        style={{
          background: "white",
          height: screenHeight * 0.59,
          overflow: "auto",
        }}
      >
        <div>
          {currentDonationHistory.map((h) => (
            <div style={{ paddingTop: "25px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: "5px",
                }}
              >
                <span>{h.date}</span>
                <span>{h.donated} 원</span>
              </div>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <span style={{ color: "grey" }}>{h.remain} 원</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
