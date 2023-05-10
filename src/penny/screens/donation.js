import * as React from 'react';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {Typography, Card } from "@mui/material";

import user from "../data/users";


var accountInfo = [];
user.map((u) => {
  u.account.map((acc, index) => (accountInfo[index] = acc));
});

export default function App() {
  return (
    <div>
      <div style={{maringTop: '10px'}}>
        <Grid container spacing={1} >
          <Grid item xs={5} style={{marginTop: '10px'}}>
            <Button style={{color: 'black'}}><ArrowBackIosIcon/></Button>
          </Grid>
          <Grid item xs={5} style={{marginTop: '17px', marginBottom: '0px'}}>
            {user.map((u) => (
              <Typography variant="h5" gutterBottom style={{marginBottom: '0px'}}>
                {u.name}
              </Typography>
            ))}
          </Grid>
          <Grid item xs={2} style={{marginTop: '10px'}}>
            <Button style={{color: 'black', paddingRight: '15px'}}>취소</Button>
          </Grid>   
        </Grid>
      </div>
      <p style={{textAlign: "center", marginTop: '0px', fontSize: '13px', color: 'gray'}}>{accountInfo.length > 0 && accountInfo[0].bank} {accountInfo.length > 0 && accountInfo[0].number}</p>
      <br/>
      <h1 style={{textAlign: "center", marginTop: '50px'}}>{accountInfo.length > 0 && accountInfo[0].balance%1000}원</h1>
      <br/>
      <Card style={{
        marginTop: '20px',
        width: '300px',
        height: '50px',
        backgroundColor: '#F5F5F5',
        borderRadius: '5px', // added border radius
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        paddingLeft: '10px'
        }
      }>
        잔액: {accountInfo.length > 0 && accountInfo[0].balance}원
      </Card>
      <Card style={{
        marginTop: '20px',
        width: '300px',
        height: '50px',
        backgroundColor: 'lightGray',
        borderRadius: '5px', // added border radius
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        paddingLeft: '10px',
        marginBottom: '50px'
        }}
      >
        모금 후 예상 잔액: {accountInfo.length > 0 && accountInfo[0].balance-(accountInfo[0].balance%1000)}원
      </Card>
      <p style={{textAlign: "center"}}>위의 금액을 모금하시겠습니까?</p>
      <br/>
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <Button variant="contained" 
          style={{ 
            backgroundColor: '#F7E676', 
            color: 'black' , 
            height: '46px', 
            width: '350px', 
            borderRadius: 0, 
            marginBottom: '100px', 
            marginLeft: '10px', 
            marginRight: '10px',
            boxShadow: 'none',
            borderRadius: '5px',
          }}
        >
          확인
        </Button>
      </div>
    </div>
  );
}
