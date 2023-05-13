import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";
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

export default function ListOfCenter() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const callData = async () => {
      setLoading(true);
      const orgRef = firestore.collection("organization");
      const organizationData = [];
      const querySnapshot = await orgRef.get();
      querySnapshot.forEach((doc) => {
        const {
          name,
          location,
          description,
          overview,
          targetAmount,
          startDate,
          endDate,
        } = doc.data();
        organizationData.push({
          name: name,
          location: location,
          description: description,
          overview: overview,
          targetAmount: targetAmount,
          startDate: startDate.toDate(),
          endDate: endDate.toDate(),
        });
      });
      setOrganizations(organizationData);
      setLoading(false);
    };

    callData();
  }, []);

  // useEffect(() => {
  //   setOrganizations(organizationsData.organization);
  // }, []);

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
        <Grid container spacing={2}>
          {organizations.map((organization, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <BoxWrapper>
                <div>
                  <Typography variant="h6" gutterBottom>
                    {organization.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {organization.donationOverview}
                  </Typography>
                </div>
                <Link to={"/penny/organization-detail"} state={{organization: organization}}>
                  <DetailsButtonWrapper variant="outlined">
                    자세히
                  </DetailsButtonWrapper>
                </Link>
              </BoxWrapper>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
