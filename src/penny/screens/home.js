import React, { useState, useEffect } from "react";
import { firestore } from "./firebase-config";

import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";

import Chip from "@mui/material/Chip";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import user from "../data/users";
import { Card, Button, Typography } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import Iconify from "../../components/iconify";

import pennyGo from "../assets/penny_go.png";

var accountInfo = [];
user.map((u) => {
  u.account.map((acc, index) => (accountInfo[index] = acc));
});

const Home = () => {
  const location = useLocation();
  console.log(location);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [userData, setUserData] = useState({});
  const userId = localStorage.getItem("userId");
  const [accountData, setAccountData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentBalance, setCurrentBalance] = useState(0);

  const handleDonate = async (amount) => {
    const userRef = firestore.collection("user").doc(userId);
    // const userSnapshot = await userRef.get();
    // setUserData(userSnapshot.data());
    await userRef.update({
      currentDonationAmount: amount,
    });
    const accountRef = firestore
      .collection("user")
      .doc(userId)
      .collection("account");
    const query = accountRef.where("number", "==", userData.donationAccount);
    const snapshot = await query.get();

    if (!snapshot.empty) {
      snapshot.forEach((doc) => {
        const accountDocRef = accountRef.doc(doc.id);
        const userData = doc.data();
        const updatedBalance = userData.balance - amount;
        accountDocRef
          .update({ balance: updatedBalance }, { merge: true })
          .then(() => {
            setCurrentBalance(updatedBalance);
          });
      });
    }
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
          console.log(orgData);
          const updatedCurrentAmount = orgData.currentAmount + amount;
          orgRef
            .doc(doc.id)
            .update({ currentAmount: updatedCurrentAmount })
            .then(() => {
              localStorage.setItem("orgCurrentAmount", updatedCurrentAmount);
            });
        });
      }
    }
  };

  useEffect(() => {
    const callData = async () => {
      setLoading(true);
      console.log(firestore);
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
          if (userData.donationAccount == number) {
            setCurrentBalance(balance);
          }
        });
        setAccountData(accountDoc);
        setLoading(false);
      });
    };

    if (userData.currentDonationType != null)
      localStorage.setItem("donationType", userData.currentDonationType);

    callData();
  }, [currentBalance]);
  return (
    <>
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
        <div
          style={{
            backgroundColor: "#23242d",
            minHeight: screenHeight,
            display: "flex",
            flexDirection: "column",
            paddingTop: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                marginLeft: "15px",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" style={{ color: "white" }}>
                {userData.name}
              </Typography>
              <Chip
                label="내 계좌"
                style={{
                  fontSize: "8pt",
                  height: "100%",
                  padding: "5px 0px",
                  color: "lightgrey",
                  fontWeight: "bold",
                  marginLeft: "5px",
                }}
              />
            </div>
            <Avatar
              style={{ marginRight: "15px", height: "40px", width: "40px" }}
              alt=""
              src={userData.imageUrl}
            />
          </div>
          <div style={{ marginLeft: "10px", marginRight: "10px" }}>
            {userData.isPenny == null ? (
              <>
                <Link
                  to={"/penny/startDonation"}
                  state={{ userId: userId }}
                  s
                  tyle={{ textDecoration: "none" }}
                >
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      textAlign: "left",
                      height: "56px",
                      border: "none",
                      borderRadius: "15px",
                      marginBottom: "8px",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        textAlign: "left",
                        width: "100%",
                        fontSize: "12pt",
                      }}
                    >
                      우리 같이 Penny 하지 않을래?
                    </span>
                    <span
                      style={{
                        transform: "rotate(-40deg)",
                        marginRight: "-8px",
                        marginBottom: "10px",
                        zIndex: "10",
                        fontSize: "9pt",
                      }}
                    >
                      Go!
                    </span>
                    <img
                      alt=""
                      src={pennyGo}
                      style={{
                        width: "50px",
                        height: "50px",
                        marginBottom: "3px",
                        marginRight: "-5px",
                      }}
                    ></img>
                    {/* <Iconify
              icon="eva:arrow-ios-forward-fill"
              style={{ color: "black", width: '25px', height: '25px', color: 'grey'}}
            /> */}
                  </Button>
                </Link>
              </>
            ) : null}
            {accountData.map((acc, index) => (
              <>
                <Card
                  style={{
                    backgroundColor: "#EBC5C8",
                    marginBottom: "8px",
                  }}
                >
                  <div style={{ padding: "20px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: "11pt", fontWeight: "bold" }}>
                          {acc.bank}
                        </span>
                        <span style={{ fontWeight: "bolder" }}>
                          {acc.balance.toLocaleString()}원
                        </span>
                      </div>
                      <MoreHorizIcon
                        style={{ color: "grey", width: "30px", height: "20px" }}
                      />
                    </div>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      <div
                        variant="contained"
                        style={{
                          height: "100%",
                          minWidth: "50px",
                          padding: "5px",
                          marginLeft: "5px",
                          border: "none",
                          borderRadius: "20px",
                          fontSize: "9pt",
                          backgroundColor: "#c88a8a",
                          color: "black",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        <span>카드</span>
                      </div>
                      <div
                        variant="contained"
                        style={{
                          height: "100%",
                          minWidth: "50px",
                          padding: "5px",
                          marginLeft: "5px",
                          border: "none",
                          borderRadius: "20px",
                          fontSize: "9pt",
                          backgroundColor: "#c88a8a",
                          color: "black",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        <span>이체</span>
                      </div>
                      {userData.donationAccount == acc.number ? (
                        <div
                          variant="contained"
                          style={{
                            height: "100%",
                            minWidth: "50px",
                            padding: "5px",
                            marginLeft: "5px",
                            border: "none",
                            borderRadius: "20px",
                            fontSize: "9pt",
                            backgroundColor: "#c88a8a",
                            color: "black",
                            textAlign: "center",
                            fontWeight: "bold",
                          }}
                        >
                          <span>{userData.isAuto ? "자동" : "수동"}</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Card>
                {userData.donationAccount == acc.number ? (
                  <>
                    <Card
                      style={{
                        backgroundColor: "#cddbea",
                        marginBottom: "8px",
                      }}
                    >
                      <div style={{ padding: "20px" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{ fontSize: "11pt", fontWeight: "bold" }}
                            >
                              Penny
                            </span>
                            <span style={{ fontWeight: "bolder" }}>
                              {userData.currentDonationAmount.toLocaleString()}
                              원
                            </span>
                          </div>
                          <MoreHorizIcon
                            style={{
                              color: "grey",
                              width: "30px",
                              height: "20px",
                            }}
                          />
                        </div>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                          <Link to={"/penny/singleDonation"}>
                            <Button
                              variant="contained"
                              style={{
                                height: "100%",
                                minWidth: "60px",
                                padding: "5px",
                                marginLeft: "5px",
                                border: "none",
                                borderRadius: "20px",
                                fontSize: "9pt",
                              }}
                              disabled={
                                userData.currentDonationType != "single"
                              }
                              sx={{
                                backgroundColor: "#b8c5d2",
                                color: "black",
                                boxShadow: "none", // remove shadow
                              }}
                            >
                              개인 모금
                            </Button>
                          </Link>
                          <Link to={"/penny/groupDonation"}>
                            <Button
                              variant="contained"
                              style={{
                                height: "100%",
                                minWidth: "60px",
                                padding: "5px",
                                marginLeft: "5px",
                                border: "none",
                                borderRadius: "20px",
                                fontSize: "9pt",
                              }}
                              disabled={userData.currentDonationType != "group"}
                              sx={{
                                backgroundColor: "#b8c5d2",
                                color: "black",
                                boxShadow: "none", // remove shadow
                              }}
                            >
                              함께 모금
                            </Button>
                          </Link>
                          <Link to={"/penny/donationHistory"}>
                            <Button
                              variant="contained"
                              style={{
                                height: "100%",
                                minWidth: "50px",
                                padding: "5px",
                                marginLeft: "5px",
                                border: "none",
                                borderRadius: "20px",
                                fontSize: "9pt",
                              }}
                              sx={{
                                backgroundColor: "#b8c5d2",
                                color: "black",
                                boxShadow: "none", // remove shadow
                              }}
                            >
                              내역
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                    {userData.isAuto ? null : acc.balance % 1000 == 0 &&
                      acc.balance % 100 == 0 &&
                      acc.balance % 10 == 0 ? (
                      <Button
                        variant="contained"
                        style={{
                          height: "100%",
                          minWidth: "100%",
                          padding: "5px",
                          marginBottom: "10px",
                          border: "none",
                          borderRadius: "10px",
                          fontSize: "10pt",
                        }}
                        onClick={() => handleDonate(acc.balance % 1000)}
                        sx={{
                          background: "transparent",
                          color: "white",
                          boxShadow: "none", // remove shadow
                        }}
                      >
                        모금 가능한 penny가 없습니다.
                      </Button>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          marginBottom: "10px",
                        }}
                      >
                        <Button
                          variant="contained"
                          style={{
                            height: "100%",
                            minWidth: "110px",
                            padding: "5px",
                            marginLeft: "5px",
                            border: "none",
                            borderRadius: "15px",
                            fontSize: "12pt",
                          }}
                          onClick={() => handleDonate(acc.balance % 1000)}
                          sx={{
                            backgroundColor: "#cddbea",
                            color: "black",
                            boxShadow: "none", // remove shadow
                          }}
                        >
                          {acc.balance % 1000} 원
                        </Button>
                        <Button
                          variant="contained"
                          style={{
                            height: "100%",
                            minWidth: "110px",
                            padding: "5px",
                            marginLeft: "5px",
                            border: "none",
                            borderRadius: "15px",
                            fontSize: "12pt",
                          }}
                          onClick={() => handleDonate(acc.balance % 100)}
                          sx={{
                            backgroundColor: "#cddbea",
                            color: "black",
                            boxShadow: "none", // remove shadow
                          }}
                        >
                          {acc.balance % 100} 원
                        </Button>
                        <Button
                          variant="contained"
                          style={{
                            height: "100%",
                            minWidth: "110px",
                            padding: "5px",
                            marginLeft: "5px",
                            border: "none",
                            borderRadius: "15px",
                            fontSize: "12pt",
                          }}
                          onClick={() => handleDonate(acc.balance % 10)}
                          sx={{
                            backgroundColor: "#cddbea",
                            color: "black",
                            boxShadow: "none", // remove shadow
                          }}
                        >
                          {acc.balance % 10} 원
                        </Button>
                      </div>
                    )}
                  </>
                ) : null}
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
