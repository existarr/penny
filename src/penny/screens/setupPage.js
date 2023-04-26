import * as React from 'react';
import './style.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export default function App() {

  return (
    <div>
        <Grid container>
            <Grid item xs>
                Penny 기본 설정
            </Grid>
            <Grid item>
                <Button>닫기</Button>
            </Grid>
      </Grid>
        연동할 계좌를 선택해주세요
        <br/>
        <Select
          
        >
          <MenuItem value={10}>카카오 123-456-7890</MenuItem>
          
        </Select>
        <br/>
        모금 방식 선택
        <br/>
        <Select
          
        >
          <MenuItem value={10}>자동 (자동으로 모금)</MenuItem>
          <MenuItem value={20}>수동</MenuItem>
          
        </Select>
        <br/>
        금액 단위 선택
        <br/>
        <Select
          
        >
          <MenuItem value={10}>1원 단위</MenuItem>
          <MenuItem value={20}>10원 단위</MenuItem>
          <MenuItem value={30}>100원 단위</MenuItem>
          
        </Select>
        <br/>
        기부 방식(기부 마감 후 변경 가능)
        <br/>
        <Select
          
        >
          <MenuItem value={10}>개인 기부</MenuItem>
          <MenuItem value={20}>함께 기부</MenuItem>
          
        </Select>
        <br/>
        <Button >나의 위치 찾기</Button>
        <br/>
        <Button variant="contained" fullWidth style={{backgroundColor: 'yellow', color: 'black'}}>Penny 신청하기</Button>

    </div>
  );
}
