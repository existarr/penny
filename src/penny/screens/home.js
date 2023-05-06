import * as React from 'react';

import Avatar from '@mui/material/Avatar';

import Chip from '@mui/material/Chip';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import user from "../data/users";
import { Card, Grid, Button, Typography } from "@mui/material";

var accountInfo = [];
user.map((u) => {
  u.account.map((acc, index) => (accountInfo[index] = acc));
});

export default function App() {
  return (
    <div style={{backgroundColor: 'gray',
    fontFamily: 'lato'}}>
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
      sx={{ mt: 3, mb: 2 }} style={{
        backgroundColor: 'white',
        color: 'black',
        justifyContent: 'center',
        width: '355px',
        textAlign: 'left',
        marginLeft: '2%',
        marginTop: '5px',
        height: '56px'

      }}
      >
        우리 같이 Penny 하지 않을래?
        
        
      </Button>
      <Card style={{backgroundColor: '#EBC5C8',
    marginTop: '10px',
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '5px'
    }}>
        <Grid container spacing={3}>
          
          <Grid item xs={10}>
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

      <Card style={{
        backgroundColor: '#BFDDFB',
        marginTop: '10px',
        marginLeft: '10px',
        marginRight: '10px',
        marginBottom: '5px'
      }}>
        <Grid container spacing={3}>
          
          <Grid item xs={10}>
            {accountInfo.length > 0 && accountInfo[1].bank}
          </Grid>
          <Grid item xs={2}>
            <Button><MoreHorizIcon/></Button>
          </Grid>
            <Grid item >
              {accountInfo.length > 0 && accountInfo[1].balance}원
            </Grid>
          
          <Grid item>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              이체
            </Button>
           
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
