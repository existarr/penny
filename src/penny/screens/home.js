import * as React from 'react';
import './style.css';

import Avatar from '@mui/material/Avatar';

import Chip from '@mui/material/Chip';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SettingsIcon from '@mui/icons-material/Settings';
import user from "../data/users";
import { Grid, Button, Container, Stack, Typography } from "@mui/material";

var accountInfo = [];
user.map((u) => {
  u.account.map((acc, index) => (accountInfo[index] = acc));
});

export default function App() {
  return (
    <div style={{
      backgroundColor: 'gray'
    }}>
      <Grid container spacing={1}>
        <Grid item xs={2}>
        {user.map((u) => (
            <Typography variant="h5" gutterBottom>
              {u.name}
            </Typography>
          ))}
          
        </Grid>
        <Grid item xs={8}>
          
          <Chip label="내 계좌" />
        </Grid>
        <Grid item xs={2}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </Grid>
      </Grid>
      <Button 
      type="submit" 
      fullWidth 
      variant="contained" 
      sx={{ mt: 3, mb: 2 }}
      style={{ backgroundColor: 'white' , color:'black'}}
      >
        우리 같이 Penny 하지 않을래?
        
      </Button>
      
        <Grid container spacing={3} style={{ backgroundColor:'pink'}}>
          <Grid item xs={2}>
            <Avatar>B</Avatar>
          </Grid>
          <Grid item xs={8}>
            잔액
          </Grid>
          <Grid item xs={2}>
            <Button><MoreHorizIcon/></Button>
          </Grid>
          
        
        
          {/* {accountInfo.map((acc) => ( */}
            <Grid item >
              
              {/* {acc.balance} */}
              {accountInfo.length > 0 && accountInfo[0].balance}원
              
              
            </Grid>
          {/* ))} */}
        
          
          <Grid item>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              카드
            </Button>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              이체
            </Button>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              수동
            </Button>
          </Grid>
        </Grid>

        <div></div>
    
      
      
      
    </div>
  );
}
