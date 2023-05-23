import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {
  Typography,
  Card,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import user from "../data/users";
import { useNavigate } from "react-router-dom";
import { firestore, serverTimestamp } from "./firebase-config";

const CheckAmountScreen = () => {
  const navigate = useNavigate();
  const accountInfo = user[0]?.account || {};
  const [fundraisingType, setFundraisingType] = useState("personal");
  const [anchorEl, setAnchorEl] = useState(null);
  const targetAmount = parseInt(localStorage.getItem("target"));
  const userId = localStorage.getItem("userId");
  const donationAmount = localStorage.getItem("donationAmount");
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [userData, setUserData] = useState({});
  const [accountData, setAccountData] = useState([]);
  const [organizationData, setOrganizationData] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isBalanceOpen, setIsBalanceOpen] = useState(false);
  const [donateValue, setDonateValue] = useState(0);
  const [isOverOpen, setIsOverOpen] = useState(false);
  const [counter, setCounter] = useState(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (type) => {
    setFundraisingType(type);
    handleClose();
  };

  useEffect(() => {
    const callData = async () => {
      setLoading(true);
      // console.log(firestore);
      const userRef = firestore.collection("user").doc(userId);
      const userSnapshot = await userRef.get();
      setUserData(userSnapshot.data());
      const accountRef = firestore
        .collection("user")
        .doc(userId)
        .collection("account");
      const accountDoc = [];
      accountRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { bank, number, balance } = doc.data();
          accountDoc.push({
            bank: bank,
            number: number,
            balance: balance,
          });
          if (userSnapshot.data().donationAccount == number) {
            setCurrentBalance(balance);
          }
        });
        setAccountData(accountDoc);
        setLoading(false);
      });
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
          const orgData = orgDocRef.data();
          setOrganizationData(orgData);
          console.log(orgData);
        });
      }
    };

    if (userData.currentDonationType != null)
      localStorage.setItem("donationType", userData.currentDonationType);

    callData();
  }, []);

  const handleNextClick = async (amount) => {
    await handleDonate(amount);
    navigate("/penny/home");
  };

  const handleDonate = async (amount) => {
    const userRef = firestore.collection("user").doc(userId);
    // const userSnapshot = await userRef.get();
    // setUserData(userSnapshot.data());
    const accountRef = firestore
      .collection("user")
      .doc(userId)
      .collection("account");
    const query = accountRef.where("number", "==", userData.donationAccount);
    const snapshot = await query.get();
    var balanceOpen = false;

    if (!snapshot.empty) {
      snapshot.forEach((doc) => {
        const accountDocRef = accountRef.doc(doc.id);
        const userData = doc.data();
        if (userData.balance >= amount) {
          const updatedBalance = userData.balance - amount;
          accountDocRef
            .update({ balance: updatedBalance }, { merge: true })
            .then(() => {
              setCurrentBalance(updatedBalance);
            });
        } else {
          balanceOpen = true;
          setIsBalanceOpen(true);
        }
      });
    }
    if (balanceOpen == false) {
      await userRef.update({
        currentDonationAmount: userData.currentDonationAmount + amount,
        totalDonationAmount: userData.totalDonationAmount + amount,
      });
      console.log(userData.totalDonationAmount);
      setUserData((prevUserData) => ({
        ...prevUserData,
        currentDonationAmount: userData.currentDonationAmount + amount,
        totalDonationAmount: userData.totalDonationAmount + amount,
      }));
      if (userData.currentDonationType == "group") {
        const orgRef = firestore.collection("organization");
        const orgQuery = orgRef.where(
          "name",
          "==",
          userData.currentDonationOrganization
        );
        const orgSnapshot = await orgQuery.get();

        if (!orgSnapshot.empty) {
          orgSnapshot.forEach(async (doc) => {
            const orgDocRef = await orgRef.doc(doc.id).get();
            const orgData = orgDocRef.data();
            // console.log(orgData);
            const updatedCurrentAmount = orgData.currentAmount + amount;
            orgRef
              .doc(doc.id)
              .update({ currentAmount: updatedCurrentAmount })
              .then(() => {
                localStorage.setItem("orgCurrentAmount", updatedCurrentAmount);
              });
            if (updatedCurrentAmount >= orgData.targetAmount) {
              await orgRef.doc(doc.id).set(
                {
                  isOver: true,
                },
                { merge: true }
              );
            }
          });
        }
      }
      const currHisRef = userRef.collection("currentHistory");
      const currHisSnapshot = await currHisRef.get();
      if (!currHisSnapshot.empty) {
        await currHisRef.add({
          amount: amount,
          accumulate: userData.currentDonationAmount + amount,
          date: serverTimestamp(),
          organization: userData.currentDonationOrganization,
        });
      } else {
        await currHisRef.doc().set({
          amount: amount,
          accumulate: userData.currentDonationAmount + amount,
          date: serverTimestamp(),
          organization: userData.currentDonationOrganization,
        });
      }
    }
  };

  return (
    <React.Fragment>
      <Dialog open={isBalanceOpen} onClose={() => setIsBalanceOpen(false)}>
        <DialogTitle>잔액 부족</DialogTitle>
        <DialogContent>
          <p>잔액이 부족합니다.</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              {
                setIsBalanceOpen(false);
              }
            }}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
      <div style={{ paddingTop: "10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button style={{ color: "black" }} onClick={() => navigate(-1)}>
            <ArrowBackIosIcon />
          </Button>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "10pt", fontWeight: "bold" }}>
              {localStorage.getItem("userName")}
            </span>
            <span style={{ fontSize: "8pt" }}>
              계좌: {localStorage.getItem("pennyAccount")}
            </span>
          </div>
          <Button style={{ color: "black", paddingRight: "15px" }}>취소</Button>
        </div>
      </div>
      <Typography
        variant="body2"
        align="center"
        style={{ fontSize: "13px", color: "gray" }}
      >
        {accountInfo.bank} {accountInfo.number}
      </Typography>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: 70,
        }}
      >
        <Typography variant="h5" align="center">
          아래금액을 모금하시겠습니까?
        </Typography>
        <br />
        <Typography variant="h1" align="center">
          {(donationAmount-0).toLocaleString()}원
        </Typography>
        <br />

        {/* <Card
          style={{
            width: "300px",
            height: "50px",
            borderRadius: "5px",
            margin: "auto",
            display: "flex",
            alignItems: "center",
            paddingLeft: "10px",
            marginBottom: "50px"
          }}
        >
          <IconButton
            edge="start"
            color="primary"
            aria-label="toggle-fundraising-type"
            onClick={handleClick}
          >
            <ExpandMoreIcon />
          </IconButton>
          <Typography>{fundraisingType === "personal" ? "개인 모금" : "단체 모금"}</Typography>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleSelect("personal")}>개인 모금</MenuItem>
            <MenuItem onClick={() => handleSelect("group")}>단체 모금</MenuItem>
          </Menu>
        </Card> */}
      </div>
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#F7E676",
            color: "black",
            height: screenHeight * 0.08,
            width: "100%",
            borderRadius: "5px",
            margin: "auto",
            display: "block",
            position: "fixed",
            bottom: "0",
          }}
          onClick={() => handleNextClick(parseInt(donationAmount))}
        >
          확인
        </Button>
      </div>
    </React.Fragment>
  );
};

export default CheckAmountScreen;
