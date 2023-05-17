import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// @mui
import { styled, alpha } from "@mui/material/styles";

import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
// mock
import account from "../../_mock/account";
// hooks
import useResponsive from "../../hooks/useResponsive";
// components
import Logo from "../../components/logo";
import Scrollbar from "../../components/scrollbar";
import NavSection from "../../components/nav-section";
//
import footerNavConfig from "./config";

import { firestore } from "../screens/firebase-config";

//import data
import user from "../data/users";
// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

FooterNav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function FooterNav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isDesktop = useResponsive("up", "lg");

  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");
  const imageUrl = localStorage.getItem("imageUrl");
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [userData, setUserData] = useState({});
  const [accountData, setAccountData] = useState([]);
  const [organizationData, setOrganizationData] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [isOverOpen, setIsOverOpen] = useState(false);
  const [counter, setCounter] = useState(0);
  const [active, setActive] = useState("");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
      setActive(pathname);
    }
  }, [pathname]);

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

  useEffect(() => {
    const callData = async () => {
      setLoading(true);
      // console.log(firestore);
      const userRef = firestore.collection("user").doc(userId);
      const userSnapshot = await userRef.get();
      setUserData(userSnapshot.data());
      if(userSnapshot.data().isPenny == false){
        setLoading(false);
        return;
      }
      if (userSnapshot.data().currentDonationType != null)
        localStorage.setItem("donationType", userData.currentDonationType);
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

    callData();
  }, [counter, pathname]);

  const renderContent = loading ? (
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
                navigate("/penny/organization-list");
                setIsOverOpen(false);
              }
            }}
          >
            예
          </Button>
          <Button
            onClick={() => {
              setIsOverOpen(false);
              setCounter((prevCounter) => prevCounter + 1);
            }}
          >
            아니오
          </Button>
        </DialogActions>
      </Dialog>
      <Scrollbar
        style={{ background: "#F7F7F7" }}
        sx={{
          height: 1,
          "& .simplebar-content": {
            height: 1,
            display: "flex",
            flexDirection: "column",
            background: "#F7F7F7",
          },
        }}
      >
        <Box sx={{ mb: 5, mx: 2.5 }}>
          <Link underline="none">
            <StyledAccount
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                background: "#CDDBEA",
                boxShadow: "1px 1px 4px grey",
                width: "320px",
                borderRadius: "none",
                padding: "35px 20px 15px 25px",
                marginLeft: "-30px",
              }}
            >
              <Avatar
                style={{ width: "40px", height: "40px", marginTop: "5px" }}
                src={imageUrl}
                alt="photoURL"
              />
              <span style={{ color: "black" }}>
                <span
                  style={{
                    fontSize: "16pt",
                    fontWeight: "bolder",
                    marginRight: "3px",
                    marginLeft: "10px",
                  }}
                >
                  {userName}
                </span>
                님
              </span>
            </StyledAccount>
          </Link>
        </Box>

        {/* <NavSection data={footerNavConfig} /> */}
        {userData && userData.isPenny ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <span
              style={{
                fontSize: "14pt",
                paddingBottom: "5px",
                paddingTop: "5px",
                paddingLeft: "20px",
                width: "100%",
                backgroundColor: active == "/penny/home" ? "#CDDBEA" : "none",
              }}
              onClick={() => navigate("/penny/home")}
            >
              홈
            </span>
            <span
              style={{
                fontSize: "14pt",
                paddingBottom: "5px",
                paddingTop: "5px",
                paddingLeft: "20px",
                width: "100%",
                backgroundColor:
                  active == "/penny/singleDonation" ||
                  active == "/penny/groupDonation"
                    ? "#CDDBEA"
                    : "none",
              }}
              onClick={() => linkToCurrentHistory()}
            >
              진행 중인 모금
            </span>
            <span
              style={{
                fontSize: "14pt",
                paddingBottom: "5px",
                paddingTop: "5px",
                paddingLeft: "20px",
                width: "100%",
                backgroundColor:
                  active == "/penny/donationHistory" ? "#CDDBEA" : "none",
              }}
              onClick={() => navigate("/penny/donationHistory")}
            >
              기부 내역
            </span>
            <span
              style={{
                fontSize: "14pt",
                paddingBottom: "5px",
                paddingTop: "5px",
                paddingLeft: "20px",
                width: "100%",
                backgroundColor:
                  active == "/penny/userRanking" ? "#CDDBEA" : "none",
              }}
              onClick={() => navigate("/penny/userRanking")}
            >
              기부 랭킹
            </span>
            <span
              style={{
                fontSize: "14pt",
                paddingBottom: "5px",
                paddingTop: "5px",
                paddingLeft: "20px",
                width: "100%",
                backgroundColor:
                  active == "/penny/organization-list" ? "#CDDBEA" : "none",
              }}
              onClick={() => navigate("/penny/organization-list")}
            >
              후원 단체 목록
            </span>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <span
              style={{
                paddingLeft: "20px",
                width: "100%",
                paddingBottom: "5px",
                paddingTop: "5px",
                backgroundColor: "#CDDBEA",
              }}
              onClick={() => navigate("/penny/home")}
            >
              홈
            </span>
          </div>
        )}

        <Box sx={{ flexGrow: 1 }} />
      </Scrollbar>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
