import * as React from 'react';

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SettingsIcon from '@mui/icons-material/Settings';
import { Typography, Card } from "@mui/material";

import user from "../data/users";

var accountInfo = [];
user.map((u) => {
  u.account.map((acc, index) => (accountInfo[index] = acc));
});

export default function App() {
  return (
    <div style={{
      backgroundColor: 'gray', minHeight: '100%'
    }}>
      <Grid container spacing={1} style={{marginBottom: '20px'}}>
        <Grid item xs={3} style={{marginTop: '20px'}}>
          {user.map((u) => (
            <Typography variant="h5" gutterBottom sx={{ marginLeft: '10px' }}>
              {u.name}
            </Typography>
          ))}
        </Grid>
        <Grid item xs={7} style={{marginTop: '20px'}}>
          <Chip label="내 계좌" />
        </Grid>
        <Grid item xs={2} style={{marginTop: '20px'}}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </Grid>
      </Grid>

      <Card style={{backgroundColor: '#EBC5C8',
        marginTop: '10px',
        marginLeft: '10px',
        marginRight: '10px',
        marginBottom: '5px'
      }}>
      <Grid container spacing={3} style={{padding: '16px'}}>
        <Grid item xs={10}>
          잔액
        </Grid>
        <Grid item xs={2}>
          <Button sx={{ color: '#c88a8a' }} style={{paddingRight: '20px'}}><MoreHorizIcon/></Button>
        </Grid>
        <Grid item>
          {accountInfo.length > 0 && accountInfo[0].balance}원
        </Grid>
        <Grid item justifyContent="flex-start">
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              mr: 1,
              backgroundColor: '#c88a8a', // darker pink color
              color: '#fff', // white text color
              boxShadow: 'none' // remove shadow
            }}
          >
            카드
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              mr: 1,
              backgroundColor: '#c88a8a', // darker pink color
              color: '#fff', // white text color
              boxShadow: 'none' // remove shadow
            }}
          >
            이체
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              marginLeft: 'auto',
              backgroundColor: '#c88a8a', // darker pink color
              color: '#fff', // white text color
              boxShadow: 'none' // remove shadow
            }}
          >
            수동
          </Button>
        </Grid>
      </Grid>
    </Card>
    <Card style={{backgroundColor: '#BFDDFB',
      marginTop: '10px',
      marginLeft: '10px',
      marginRight: '10px',
      marginBottom: '5px'
    }}>
      <Grid container spacing={3} style={{padding: '16px'}}>
        <Grid item xs={10}>
          Penny
        </Grid>
        <Grid item xs={2}>
          <Button sx={{ color: '#7FB4D4' }} style={{paddingRight: '20px'}}><SettingsIcon/></Button>
        </Grid>
        <Grid item>
          {user.map((u) => (
            <Typography>
              {u.currentDonationAmount}원
            </Typography>
          ))}
        </Grid>
        <Grid item sx={{ display: 'flex', justifyContent: 'flex-start' }} xs={12}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              mr: 1,
              marginLeft: 'auto',
              backgroundColor: '#7FB4D4', // darker pink color
              color: '#fff', // white text color
              boxShadow: 'none' // remove shadow
            }}
          >
            개인모금
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              mr: 1,
              marginLeft: '0px',
              backgroundColor: '#7FB4D4', // darker pink color
              color: '#fff', // white text color
              boxShadow: 'none' // remove shadow
            }}
          >
            함꼐모금
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              marginLeft: '0px',
              backgroundColor: '#7FB4D4', // darker pink color
              color: '#fff', // white text color
              boxShadow: 'none' // remove shadow
            }}
          >
            내역
          </Button>
        </Grid>
      </Grid>
    </Card>
  </div>
  );
}
