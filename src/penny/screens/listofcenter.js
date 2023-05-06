import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import organizationsData from '../data/organization.json';

const BoxWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between', // 새로 추가
}));

const DetailsButtonWrapper = styled(Button)(({ theme }) => ({
  alignSelf: 'flex-center',
  padding: theme.spacing(0.5, 1),

}));

export default function ListOfCenter() {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    setOrganizations(organizationsData.organization);
  }, []);

  return (
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
            <DetailsButtonWrapper component={Link} to={`/center/${index}`} variant="outlined">
              자세히
            </DetailsButtonWrapper>
          </BoxWrapper>
        </Grid>
      ))}
    </Grid>
  );
}
