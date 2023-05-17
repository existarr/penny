import { Helmet } from "react-helmet-async";
// @mui
import {
  Grid,
  Button,
  IconButton,
  Container,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

// components
import Iconify from "../../components/iconify";

import { React, useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

//import data
import user from "../data/users";
import organizations from "../data/organizations";
import history from "../data/donationHistory";

//import components
import AccountCard from "../components/AccountCard";
import DonationAmountGraph from "../components/DonationAmountGraph";

export default function DonationHistory() {
  const [userName, setUserName] = useState("");
  const [donationHistory, setDonationHistory] = useState([]);
  const [targetAmount, setTargetAmount] = useState();
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [historyCount, setHistoryCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(null);

  const images = {};

  function importAll(r) {
    r.keys().forEach((key) => (images[key] = r(key)));
  }

  importAll(require.context("../assets/", true, /\.png$/));
  // console.log(images);

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/penny/home");
  };

  useEffect(() => {
    const newHistory = history.map((h) => ({
      organizationName: h.organizationName,
      images: h.images,
      texts: h.texts,
      startDate: h.startDate,
      endDate: h.endDate,
      isOnGoing: h.isOnGoing,
      targetDonationAmount: h.targetDonationAmount,
      totalDonationAmount: h.totalDonationAmount,
      userDonationAmount: h.userDonationAmount,
      donationType: h.donationType,
    }));

    const currentUser = user.map((u) => ({
      name: u.name,
    }));

    setUserName(currentUser[0].name);
    setDonationHistory(newHistory);
    setHistoryCount(newHistory.length);
  }, [donationHistory.length]);

  return (
    <>
      <Helmet>
        <title> Single Donation </title>
      </Helmet>

      <Container
        style={{
          background: "lightblue",
          height: screenHeight * 0.25,
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
            기부내역
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
          <span style={{ marginTop: "20px", fontSize: "14pt" }}>
            현재까지 완료한 기부{" "}
            <span
              style={{
                fontSize: "16pt",
                fontWeight: "bold",
                color: "#0062ff",
                textDecoration: "underline",
              }}
            >
              {historyCount}
            </span>{" "}
            건
          </span>
        </div>
      </Container>
      <Container
        style={{
          background: "white",
          height: screenHeight * 0.65,
          overflow: "auto",
        }}
      >
        <div>
          {donationHistory.map((h, i) => (
            <div style={{ paddingTop: "25px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: "5px",
                  paddingTop: "5px",
                }}
              >
                <span style={{ fontSize: "14pt" }}>{h.organizationName}</span>
                <Button
                  style={{ border: "1px solid", fontSize: "8pt" }}
                  onClick={() => setModalOpen(h.organizationName)}
                >
                  사진 보기
                </Button>
                <Dialog
                  open={modalOpen === h.organizationName}
                  onClose={() => setModalOpen(null)}
                  PaperProps={{
                    style: { width: "100%", height: "90%", margin: "10px" },
                  }}
                >
                  <DialogTitle style={{ textAlign: "center", padding: '15px', marginBottom: '12px', borderBottom: "1px solid rgba(0, 0, 0, 0.2)", fontSize: '12pt' }}>
                    {h.organizationName}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      {/* <div style={{margin: '12px 0px'}}>
                        <span
                          style={{
                            fontWeight: "bold",
                            fontSize: '14pt',
                            borderBottom: "1px solid",
                          }}
                        >
                          감사의 글
                        </span>
                      </div> */}
                      <span>
                        <span style={{ fontWeight: "bold" }}>{userName}</span>{" "}
                        님,
                        <br />
                        후원에 진심으로 감사드립니다.
                      </span>
                      <br />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          margin: "12px 0px",
                        }}
                      >
                        {h.images.map((img) => (
                          <img
                            src={images["./" + img]}
                            alt={img}
                            width="170px"
                          />
                        ))}
                      </div>
                      {h.texts.map((t) => (
                        <span>
                          {t}
                          <br />
                          <br />
                        </span>
                      ))}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setModalOpen(null)}>닫기</Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
