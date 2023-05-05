import * as React from 'react';

import Button from '@mui/material/Button';


export default function App() {
  return (
    <div>

      <div style={{
        position: 'fixed',
        backgroundColor: 'white',
        width: '100%',
        top: '50px'
      }}>
        <grid>
          
          <p style={{textAlign: 'center'}}>Penny</p>
          <Button style={{float: 'right'}}>닫기</Button>
        </grid>
        
      </div>
        
      
      <br/>
      <div style={{backgroundColor: '#BFDDFB'}}>
        <h2 style={{textAlign: 'center'}}>티끌 모아 태산!</h2>
        <h2 style={{textAlign: 'center'}}>Penny 와 함께 기부하자</h2>
        <p style={{textAlign: 'center'}}>Penny는 “티끌모아 태산”이라는 속담의 의미를 믿습니다.</p>
        <p style={{textAlign: 'center'}}>약 10만명의 사용자가 “하루 100원씩”만 기부해도
  한달이면 “3억”을 기부할 수 있습니다.</p>
        <p style={{textAlign: 'center'}}>Penny는 티끌의 힘을 믿습니다.
  어려운 이들을 위해 작은 티끌이 되어주세요</p>
      </div>
      <div style={{
        marginLeft: '10px',
        maringRight: '10px',
        maringTop: '10px',
        marginBottom: '10px'
      }}>
        <p> 티끌모아 태산! PENNY</p>
        <p>계좌 속 작은 단위 잔돈을 모아 수동/자동으로 모금하여 기부합니다. 일정 금액이 모금되면 기부 단체에 기부금이 전달 됩니다.</p>
        <p>소액으로 모금하여 부담이 적은 기부 시스템입니다. 사용자 위치 서비스를 이룔하여 가깝고 친숙한 이웃 단체에 기부를 할 수 있습니다.</p>
        <p>기부 이후 실제 기부를 진행한 활동 사진을 볼 수 있어 투명성이 보장됩니다.</p>
      </div>
      
      <Button variant="contained" fullWidth style={{
        backgroundColor: '#F7E676', color: 'black', 
        width: '100%',
        height: '46px',
        borderColor: '#F7E676',
        position: 'fixed',
        top: '622px'
      }}>Penny 신청하기</Button>


    </div>
  );
}
