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

import { React, useState, useEffect, useLayoutEffect } from "react";

//import data
import user from "../data/users";
import organizations from "../data/organizations";

//import components
import AccountCard from "../components/AccountCard";

export default function SingleDonation() {
  const [donationData, setDonationData] = useState({});
  const [donationHistory, setDonationHistory] = useState([]);
  const [targetAmount, setTargetAmount] = useState();
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  useEffect(() => {
    setDonationData(
      user.map((u) => ({
        donateOrganization: u.currentDonationOrganization,
        donateAmount: u.currentDonationAmount,
        donateType: u.currentDonationType,
      }))[0]
    );

    organizations.map(org => {
        if(donationData.donateOrganization == org.name)
            setTargetAmount(org.targetDonationAmount);
    });

    setDonationHistory(
      user.map((u) => ({
        currentHistoryMap: u.currentDonationHistory.map((d) => ({
          date: d.donatedDate,
          donated: d.donatedAmount,
          remain: d.balanceRemain,
        })),
      }))[0].currentHistoryMap
    );
  }, [donationData.donateOrganization]);


  return (
    <>
      <Helmet>
        <title> Single Donation </title>
      </Helmet>

      <Container
        style={{ background: "lightblue", height: screenHeight * 0.3, paddingTop: "20px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton>
            <Iconify
              icon="eva:arrow-ios-forward-fill"
              style={{ color: "black", transform: "scaleX(-1)" }}
            />
          </IconButton>
          <span style={{fontSize: '14pt'}}>{donationData.donateType ? "함께모금" : "개인모금"}</span>
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
          <span style={{marginBottom: '20px',}}>{donationData.donateOrganization}</span>
          <span>현재까지 <span style={{fontSize: '16pt', fontWeight: 'bold'}}>{(donationData.donateAmount-0).toLocaleString()}원</span> 모금했어요</span>
          <span>목표 금액까지 <span style={{fontSize: '16pt', fontWeight: 'bold'}}>{(targetAmount - donationData.donateAmount).toLocaleString()}원</span> 남았어요</span>
        </div>
        <div></div>
      </Container>
      <Container
        style={{ background: "white", height: screenHeight * 0.6, overflow: "auto" }}
      >
        <div>
          {donationHistory.map((h) => (
            <div style={{paddingTop: '25px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', paddingBottom: '5px'}}>
                <span>{h.date}</span>
                <span>{h.donated} 원</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'end'}}>
                <span style={{color: 'grey'}}>{h.remain} 원</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
