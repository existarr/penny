import * as React from 'react';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {Typography } from "@mui/material";

import user from "../data/users";


var accountInfo = [];
user.map((u) => {
  u.account.map((acc, index) => (accountInfo[index] = acc));
});

export default function App() {
  return (
    <div>
        <Grid container spacing={1}>
            <Grid item xs={5}>
                <Button><ArrowBackIosIcon/></Button>
            </Grid>
            <Grid item xs={5}>
            {user.map((u) => (
            <Typography variant="h5" gutterBottom>
              {u.name}
            </Typography>
          ))}
            </Grid>
            <Grid item xs={2}>
                <Button>취소</Button>
            </Grid>
            
        </Grid>
        <p style={{textAlign: "center"}}>{accountInfo.length > 0 && accountInfo[0].bank} {accountInfo.length > 0 && accountInfo[0].number}</p>
        <br/>
        <h1 style={{textAlign: "center"}}>58원</h1>
        <br/>
        
        <p style={{textAlign: "center"}}>잔액: {accountInfo.length > 0 && accountInfo[0].balance}</p>
        <br/>
        <p style={{textAlign: "center"}}>모금 후 예상 잔액: 732,000원</p>
        <br/>
        <p style={{textAlign: "center"}}>위의 금액을 모금하시겠습니까?</p>
        <br/>
        <Button fullWidth variant="contained" style={{backgroundColor: 'yellow', color: 'black'}}>확인</Button>
        


    </div>
  );
}
