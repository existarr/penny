import * as React from 'react';
import './style.css';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SettingsIcon from '@mui/icons-material/Settings';


export default function App() {
  return (
    <div style={{
      backgroundColor: 'gray'
    }}>
      <Grid container>
        <Grid item xs>
          <p style={{ color:'white'}}>가은</p>
          <Chip label="내 계좌" />
        </Grid>
        <Grid item>
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
          <Grid item xs={1}>
            <Avatar>B</Avatar>
          </Grid>
          <Grid item xs={8}>
            잔액
          </Grid>
          <Grid item xs={1}>
            <Button><MoreHorizIcon/></Button>
          </Grid>
          <Grid item xs={1}>
            
          </Grid>
        
          <Grid item xs={11}>
            732,058원
          </Grid>
        
          <Grid item xs={8}>
            
          </Grid>
          <Grid item xs={4}>
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
    
      
      
      
    </div>
  );
}
