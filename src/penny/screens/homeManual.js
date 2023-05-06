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

      <Card>
        <div>
          <p>
            10만명 X 100원 = "3억"
          </p>
          <p>티끌의 힘!</p>
        </div>
      </Card>
      

      <Card><Grid container spacing={3} style={{ backgroundColor:'pink'}}>
          <Grid item xs={2}>
            <Avatar>B</Avatar>
          </Grid>
          <Grid item xs={8}>
            잔액
          </Grid>
          <Grid item xs={2}>
            <Button><MoreHorizIcon/></Button>
          </Grid>
          
        
        
          
            <Grid item >
              
              
              {accountInfo.length > 0 && accountInfo[0].balance}원
              
              
            </Grid>
         
        
          
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
       </Card>
    
      
      <Card> <Grid container spacing={3} style={{ backgroundColor:'lightblue'}}>
          <Grid item xs={2}>
            <Avatar>P</Avatar>
          </Grid>
          <Grid item xs={8}>
            Penny
          </Grid>
          <Grid item xs={2}>
            <Button><SettingsIcon/></Button>
          </Grid>
          
        
        
          
            <Grid item >
            {user.map((u) => (
            <Typography>
              {u.currentDonationAmount}원
            </Typography>
          ))}
            </Grid>
          
        
          
          <Grid item>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              개인모금
            </Button>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              자동모금
            </Button>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              내역
            </Button>
          </Grid>
        </Grid>
</Card>
       
      <Card><Grid container spacing={2} style={{ backgroundColor:'yellow'}}>
          
          <Grid item xs={12}>
            수동모금
          </Grid>
         
          <Grid item xs={2}>
              단위
          </Grid>
          
    
          <Grid item xs={10}>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              1원
            </Button>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              10원
            </Button>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              100원
            </Button>
          </Grid>
        </Grid></Card>
        
      
    </div>
  );
}
