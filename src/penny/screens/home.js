import React, { useState, useEffect } from "react";
import { firestore, serverTimestamp } from "./firebase-config";

import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";

import Chip from "@mui/material/Chip";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import user from "../data/users";
import {
  Card,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Iconify from "../../components/iconify";

import pennyGo from "../assets/penny_go.png";

var accountInfo = [];
user.map((u) => {
  u.account.map((acc, index) => (accountInfo[index] = acc));
});

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [userData, setUserData] = useState({});
  const userId = localStorage.getItem("userId");
  const [accountData, setAccountData] = useState([]);
  const [organizationData, setOrganizationData] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [donateValue, setDonateValue] = useState(0);
  const [isOverOpen, setIsOverOpen] = useState(false);
  const [counter, setCounter] = useState(0);

  const openDialog = async (value) => {
    if (userData.currentDonationType == "single") {
      if (userData.currentDonationAmount < userData.targetDonationAmount) {
        setDonateValue(value);
        setIsOpen(true);
      } else {
        const userRef = firestore.collection("user").doc(userId);
        userRef
          .update({
            currentDonationOrganization: "undefined",
            currentDonationAmount: 0,
            targetDonationAmount: 0,
          })
          .then(() => {
            setUserData((prevUserData) => ({
              ...prevUserData,
              currentDonationAmount: 0,
              currentDonationOrganization: "undefined",
              targetDonationAmount: 0,
            }));
            setIsOverOpen(true);
          });
      }
    } else {
      if (organizationData.currentAmount < organizationData.targetAmount) {
        setDonateValue(value);
        setIsOpen(true);
      } else {
        const userRef = firestore.collection("user").doc(userId);
        userRef
          .update({
            currentDonationOrganization: "undefined",
            currentDonationAmount: 0,
            targetDonationAmount: 0,
          })
          .then(() => {
            setUserData((prevUserData) => ({
              ...prevUserData,
              currentDonationAmount: 0,
              currentDonationOrganization: "undefined",
              targetDonationAmount: 0,
            }));
            setIsOverOpen(true);
          });
      }
    }
  };

  const handleDonate = async (amount) => {
    const userRef = firestore.collection("user").doc(userId);
    // const userSnapshot = await userRef.get();
    // setUserData(userSnapshot.data());
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
  };

  const linkToCurrentHistory = async () => {
    const userRef = firestore.collection("user").doc(userId);
    if (userData.currentDonationType == "single") {
      if (userData.currentDonationAmount < userData.targetDonationAmount) {
        navigate("/penny/singleDonation");
      } else {
        userRef
          .update({
            currentDonationOrganization: "undefined",
            currentDonationAmount: 0,
            targetDonationAmount: 0,
          })
          .then(setIsOverOpen(true));
      }
    } else {
      if (organizationData.currentAmount < organizationData.targetAmount) {
        navigate("/penny/groupDonation");
      } else {
        userRef
          .update({
            currentDonationOrganization: "undefined",
            currentDonationAmount: 0,
          })
          .then(setIsOverOpen(true));
      }
    }
  };

  const customDonationAmount = async () => {
    const userRef = firestore.collection("user").doc(userId);
    if (userData.currentDonationType == "single") {
      if (userData.currentDonationAmount < userData.targetDonationAmount) {
        navigate("/penny/donationAmount");
      } else {
        userRef
          .update({
            currentDonationOrganization: "undefined",
            currentDonationAmount: 0,
            targetDonationAmount: 0,
          })
          .then(setIsOverOpen(true));
      }
    } else {
      if (organizationData.currentAmount < organizationData.targetAmount) {
        navigate("/penny/donationAmount");
      } else {
        userRef
          .update({
            currentDonationOrganization: "undefined",
            currentDonationAmount: 0,
          })
          .then(setIsOverOpen(true));
      }
    }
  }

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
  }, [
    counter,
    userData.currentDonationAmount,
    userData.currentDonationOrganization,
  ]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (userData && userData.donationAccount) {
        const randomAmount =
          Math.floor(Math.random() * (20000 - 3000 + 1)) + 3000;
        const updatedBalance = currentBalance - randomAmount;

        const accountRef = firestore
          .collection("user")
          .doc(userId)
          .collection("account");

        const query = accountRef.where(
          "number",
          "==",
          userData.donationAccount
        );
        const snapshot = await query.get();

        if (!snapshot.empty) {
          snapshot.forEach((doc) => {
            const accountDocRef = accountRef.doc(doc.id);
            const userData = doc.data();
            const updatedBalance = userData.balance - randomAmount;
            accountDocRef
              .update({ balance: updatedBalance }, { merge: true })
              .then(() => {
                setCurrentBalance(updatedBalance);
                setAccountData((prevAccData) => {
                  const updatedAccData = prevAccData.map((acc) => {
                    if (acc.number === userData.donationAccount) {
                      return {
                        ...acc,
                        balance: updatedBalance,
                      };
                    }
                    return acc;
                  });
                  return updatedAccData;
                });
              });
          });
        }
        console.log(currentBalance);
        console.log(updatedBalance);
        setCounter((prevCounter) => prevCounter + 1);
      }
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [currentBalance, userId, userData]);

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
        <>
          <Dialog open={isOverOpen} onClose={() => setIsOverOpen(false)}>
            <DialogTitle>목표 달성!</DialogTitle>
            <DialogContent>
              <p>목표 모금액을 달성하여 후원 모금이 종료되었습니다.</p>
              <p>새로운 후원 단체를 검색하시겠습니까?</p>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  {
                    localStorage.setItem("currentDonationType", "single");
                    navigate("/penny/organization-list");
                    setIsOverOpen(false);
                  }
                }}
              >
                개인 모금
              </Button>
              <Button
                onClick={() => {
                  {
                    localStorage.setItem("currentDonationType", "group");
                    navigate("/penny/organization-list");
                    setIsOverOpen(false);
                  }
                }}
              >
                함께 모금
              </Button>
              <Button
                onClick={() => {
                  setIsOverOpen(false);
                  setCounter((prevCounter) => prevCounter + 1);
                }}
              >
                취소
              </Button>
            </DialogActions>
          </Dialog>
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
              {userData.isPenny == false ? (
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
                      borderRadius: "8px",
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
                            {acc.bank}
                          </span>
                          <span style={{ fontWeight: "bolder" }}>
                            {acc.balance.toLocaleString()}원
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
                        <div
                          variant="contained"
                          style={{
                            height: "100%",
                            minWidth: "50px",
                            padding: "5px",
                            marginLeft: "5px",
                            border: "none",
                            borderRadius: "5px",
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
                            borderRadius: "5px",
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
                              borderRadius: "5px",
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
                          backgroundColor: "#b1d7ff",
                          marginBottom: "8px",
                          borderRadius: "8px",
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
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
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
                          <div
                            style={{ display: "flex", justifyContent: "end" }}
                          >
                            <Button
                              variant="contained"
                              style={{
                                height: "100%",
                                minWidth: "60px",
                                padding: "5px",
                                marginLeft: "5px",
                                border: "none",
                                borderRadius: "5px",
                                fontSize: "9pt",
                              }}
                              onClick={() => linkToCurrentHistory()}
                              disabled={
                                userData.currentDonationType != "single"
                              }
                              sx={{
                                backgroundColor: "rgba(113,167,225,0.5)",
                                color: "black",
                                boxShadow: "none", // remove shadow
                              }}
                            >
                              개인 모금
                            </Button>
                            <Button
                              variant="contained"
                              style={{
                                height: "100%",
                                minWidth: "60px",
                                padding: "5px",
                                marginLeft: "5px",
                                border: "none",
                                borderRadius: "5px",
                                fontSize: "9pt",
                              }}
                              onClick={() => linkToCurrentHistory()}
                              disabled={userData.currentDonationType != "group"}
                              sx={{
                                backgroundColor: "rgba(113,167,225,0.5)",
                                color: "black",
                                boxShadow: "none", // remove shadow
                              }}
                            >
                              함께 모금
                            </Button>
                            <Link to={"/penny/donationHistory"}>
                              <Button
                                variant="contained"
                                style={{
                                  height: "100%",
                                  minWidth: "50px",
                                  padding: "5px",
                                  marginLeft: "5px",
                                  border: "none",
                                  borderRadius: "5px",
                                  fontSize: "9pt",
                                }}
                                sx={{
                                  backgroundColor: "rgba(113,167,225,0.5)",
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
                      {userData.isAuto ||
                      userData.currentDonationOrganization ==
                        "undefined" ? null : acc.balance % 1000 == 0 &&
                        acc.balance % 100 == 0 &&
                        acc.balance % 10 == 0 ? (
                        <Button
                          variant="contained"
                          style={{
                            height: "100%",
                            width: "100%",
                            padding: "5px",
                            marginBottom: "10px",
                            border: "none",
                            borderRadius: "10px",
                            fontSize: "10pt",
                          }}
                          sx={{
                            background: "transparent",
                            color: "white",
                            boxShadow: "none", // remove shadow
                          }}
                          onClick={() => customDonationAmount()}
                        >
                          <span style={{ fontWeight: "normal" }}>
                            모금 가능한 penny가 없습니다.{" "}
                            <span
                              style={{ marginLeft: "5px", fontWeight: "bold" }}
                            >
                              직접 입력하기
                            </span>{" "}
                            {">"}
                          </span>
                        </Button>
                      ) : (
                        <>
                          <Dialog
                            open={isOpen}
                            onClose={() => setIsOpen(false)}
                          >
                            <DialogTitle>금액 확인</DialogTitle>
                            <DialogContent>
                              <p>{donateValue}원을 모금하시겠습니까?</p>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={() => {
                                  {
                                    handleDonate(donateValue);
                                    setIsOpen(false);
                                  }
                                }}
                              >
                                예
                              </Button>
                              <Button onClick={() => setIsOpen(false)}>
                                아니오
                              </Button>
                            </DialogActions>
                          </Dialog>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "10px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "10px",
                              }}
                            >
                              {acc.balance % 1000 == acc.balance % 100 ||
                              acc.balance % 1000 == acc.balance % 10 ||
                              acc.balance % 1000 == 0 ? null : (
                                <Button
                                  variant="contained"
                                  style={{
                                    height: "40px",
                                    minWidth: "80px",
                                    padding: "5px",
                                    marginLeft: "5px",
                                    border: "none",
                                    borderRadius: "10px",
                                    fontSize: "12pt",
                                  }}
                                  onClick={() => openDialog(acc.balance % 1000)}
                                  sx={{
                                    backgroundColor: "#6eadf1",
                                    color: "black",
                                    boxShadow: "none", // remove shadow
                                  }}
                                >
                                  {acc.balance % 1000} 원
                                </Button>
                              )}
                              {acc.balance % 100 == acc.balance % 10 ||
                              acc.balance % 100 == 0 ? null : (
                                <Button
                                  variant="contained"
                                  style={{
                                    height: "40px",
                                    minWidth: "80px",
                                    padding: "5px",
                                    marginLeft: "3px",
                                    border: "none",
                                    borderRadius: "10px",
                                    fontSize: "12pt",
                                  }}
                                  onClick={() => openDialog(acc.balance % 100)}
                                  sx={{
                                    backgroundColor: "#6eadf1",
                                    color: "black",
                                    boxShadow: "none", // remove shadow
                                  }}
                                >
                                  {acc.balance % 100} 원
                                </Button>
                              )}
                              {acc.balance % 10 == 0 ? null : (
                                <Button
                                  variant="contained"
                                  style={{
                                    height: "40px",
                                    minWidth: "80px",
                                    padding: "5px",
                                    marginLeft: "3px",
                                    border: "none",
                                    borderRadius: "10px",
                                    fontSize: "12pt",
                                  }}
                                  onClick={() => openDialog(acc.balance % 10)}
                                  sx={{
                                    backgroundColor: "#6eadf1",
                                    color: "black",
                                    boxShadow: "none", // remove shadow
                                  }}
                                >
                                  {acc.balance % 10} 원
                                </Button>
                              )}
                            </div>
                            <Button
                              variant="contained"
                              style={{
                                height: "40px",
                                padding: "5px",
                                minWidth: "80px",
                                marginBottom: "20px",
                                marginRight: "10px",
                                border: "none",
                                borderRadius: "10px",
                                fontSize: "10pt",
                                textAlign: "center",
                              }}
                              sx={{
                                background: "transparent",
                                color: "white",
                                boxShadow: "none", // remove shadow
                              }}
                              onClick={() => customDonationAmount()}
                            >
                              직접 입력 {">"}
                            </Button>
                          </div>
                        </>
                      )}
                    </>
                  ) : null}
                </>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
