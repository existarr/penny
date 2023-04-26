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
          가은
          <Chip label="내 계좌" />
        </Grid>
        <Grid item>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </Grid>
      </Grid>
      
      
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
    
      
      <Grid container spacing={3} style={{ backgroundColor:'skyblue'}}>
        <Grid item xs={1}>
          <Avatar>B</Avatar>
        </Grid>
        <Grid item xs={8}>
          Penny
        </Grid>
        <Grid item xs={1}>
          <Button><SettingsIcon/></Button>
        </Grid>

        <Grid item xs={1}>
          
        </Grid>
        <Grid item xs={11}>
          5,430원
        </Grid>

        <Grid item xs={8}>
          
        </Grid>
        <Grid item xs={4}>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            개인모금
          </Button>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            함께모금
          </Button>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            내역
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={8}>
          수동모금
        </Grid>
        <Grid item xs={4}>
          
        </Grid>
        <Grid item xs={8}>
          단위
        </Grid>
        <Grid item xs={4}>
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
      </Grid>

      
    </div>
  );
}
