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

export default function GroupUserListScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [groupUserList, setGroupUserList] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    setGroupUserList(location.state.groupUserData);
    setLoading(false);
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
        <p style={{ fontSize: "11pt" }}>함께 하는 사람들</p>
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
          {groupUserList.map((user, index) => (
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: 'center',
                borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                width: "100%",
                padding: "12px 20px",
              }}
            >
                <img src={user.imageUrl} alt='' style={{width: '40px', height: '40px', border: 'none', borderRadius: '50%'}} />
                <span style={{marginLeft: '10px'}}>{user.name}</span>
              {/* <span>{user.totalDonationAmount == 0 ? "-" : (user.totalDonationAmount).toLocaleString() + "원"}</span> */}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
