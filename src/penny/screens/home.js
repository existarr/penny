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
     minHeight: '100vh'}}>
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
      <Button 
      type="submit" 
      fullWidth 
      variant="contained" 
      sx={{ mt: 3, mb: 2 , boxShadow: 'none'}} style={{
        backgroundColor: 'white',
        color: 'black',
        display: 'flex',
        width: '360px',
        alignItems: 'center',
        textAlign: 'left',
        marginLeft: '2%',
        marginTop: '5px',
        height: '56px'

      }}
      >
        <div style={{ textAlign: 'left', width: '100%' }}>
    우리 같이 Penny 하지 않을래?
  </div>
        
        
      </Button>
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

      <Card style={{
  backgroundColor: '#BFDDFB',
  marginTop: '10px',
  marginLeft: '10px',
  marginRight: '10px',
  marginBottom: '5px',
}}>
  <Grid container spacing={3} style={{padding: '16px'}}>
    <Grid item xs={10}>
      {accountInfo.length > 0 && accountInfo[1].bank}
    </Grid>
    <Grid item xs={2}>
      <Button style={{paddingRight: '20px'}}><MoreHorizIcon/></Button>
    </Grid>
    <Grid item>
      {accountInfo.length > 0 && accountInfo[1].balance}원
    </Grid>
    <Grid item xs={12}>
      <Grid container justifyContent="flex-end">
      <Button
  type="submit"
  variant="contained"
  sx={{
    mt: 3,
    mb: 2,
    backgroundColor: '#7FB4D4', // a darker shade of blue than #BFDDFB
    color: '#fff', // white text color
    boxShadow: 'none'
  }}
>
  이체
</Button>

      </Grid>
    </Grid>
  </Grid>
</Card>

    </div>
  );
}
