import * as React from 'react';
import './style.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export default function App() {
  return (
    <div>
        <Grid container spacing={1}>
            <Grid item>
                Penny
            </Grid>
            <Grid item>
                <Button>닫기</Button>
            </Grid>
        </Grid>
      
      
      <h2 style={{textAlign: "center"}}>티끌 모아 태산!</h2>
      <h1 style={{textAlign: "center"}}>Penny 와 함께 기부하자</h1>
      <p> 티끌모아 태산! PENNY</p>
      <p>계좌 속 작은 단위 잔돈을 모아 수동/자동으로 모금하여 기부합니다. 일정 금액이 모금되면 기부 단체에 기부금이 전달 됩니다.</p>
      <p>소액으로 모금하여 부담이 적은 기부 시스템입니다. 사용자 위치 서비스를 이룔하여 가깝고 친숙한 이웃 단체에 기부를 할 수 있습니다.</p>
      <p> 기부 이후 실제 기부를 진행한 활동 사진을 볼 수 있어 투명성이 보장됩니다.</p>
      <Button variant="contained" fullWidth style={{backgroundColor: 'yellow', color: 'black'}}>Penny 신청하기</Button>


    </div>
  );
}
