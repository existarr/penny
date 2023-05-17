import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Box, Button, Grid, Typography, IconButton } from "@mui/material";
import Iconify from "../../components/iconify";
import { styled } from "@mui/material/styles";
import organizationsData from "../data/organization.json";

import { firestore } from "./firebase-config";
import CircularProgress from "@mui/material/CircularProgress";

const BoxWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  height: "100%",
  display: "flex",
  justifyContent: "space-between",
}));

const DetailsButtonWrapper = styled(Button)(({ theme }) => ({
  alignSelf: "flex-center",
  padding: theme.spacing(0.5, 1),
}));

export default function UserRanking() {
  const navigate = useNavigate();
  const location = useLocation();
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState([]);
  const [userData, setUserData] = useState({});
  const [userList, setUserList] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const callData = async () => {
      setLoading(true);
      const userRef = firestore.collection("user");
      const userSnapshot = await userRef.get();
      const userListData = userSnapshot.docs
        .map((doc) => doc.data())
        .filter((user) => user.isPenny);
      userListData.sort(
        (a, b) => b.totalDonationAmount - a.totalDonationAmount
      );
      setUserList(userListData);
      setLoading(false);
    };

    callData();
  }, []);

  return (
    <>
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
        <p style={{ fontSize: "11pt" }}>사용자 랭킹</p>
        <IconButton>
          <Iconify
            icon="eva:settings-2-fill"
            style={{ color: "black", visibility: "hidden" }}
          />
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
        <div>
          {userList.map((user, index) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                width: "100%",
                padding: "12px 20px",
              }}
            >
              <div>
                <span style={{fontWeight: 'bold'}}>{user.totalDonationAmount == 0 ? null : index + 1}</span>
                <span style={{marginLeft: '5px'}}>{user.name}</span>
              </div>
              <span>{user.totalDonationAmount == 0 ? "-" : user.totalDonationAmount + "원"}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
