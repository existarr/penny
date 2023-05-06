import * as React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

//import user data
import user from "../data/users";

var accountInfo = [];
user.map((u) => {
  u.account.map((acc, index) => (accountInfo[index] = acc));
});

export default function App() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
        
      <p style={{ textAlign: 'center'}}>Penny 기본 설정</p>
      <Button style={{float: 'right'}}>닫기</Button>
      <br/>
        연동할 계좌를 선택해주세요
        <br/>
        <Select
          
        >
          {accountInfo.map((acc) => (
             <MenuItem value={acc.bank + "-" + acc.number}>{acc.bank}-{acc.number}</MenuItem>
          ))}

          
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
        <Select>
          <MenuItem value={10}>1원 단위</MenuItem>
          <MenuItem value={20}>10원 단위</MenuItem>
          <MenuItem value={30}>100원 단위</MenuItem>
        </Select>
        <br/>
        기부 방식(기부 마감 후 변경 가능)
        <br/>
        <Select>
          <MenuItem value={10}>개인 기부</MenuItem>
          <MenuItem value={20}>함께 기부</MenuItem>
        </Select>
        <br/>
        <Button onClick={handleClickOpen}>나의 위치 찾기</Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Penny이(가) 사용자의 위치를 사용하도록 허용하시겠습니까?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              보호자에게 위치정보 제공하기 위해 위치 권한을 사용시 허용으로 설정 하세요
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>한 번 허용</Button>
            <Button onClick={handleClose}>앱을 사용하는 동안 허용</Button>
            <Button onClick={handleClose}>허용 안 함</Button>
          </DialogActions>
        </Dialog>

        <br/>
        <Button variant="contained" fullWidth style={{backgroundColor: '#F7E676', borderColor: '#F7E676', width: '100%', height: '50px'}}>Penny 신청하기</Button>

    </div>
  );
}
