import * as React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {
  Typography,
  Card,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import user from "../data/users";

const FundraisingConfirmation = () => {
  const accountInfo = user[0]?.account || {};
  const [targetAmount, setTargetAmount] = React.useState(accountInfo.targetAmount || 0);
  const [fundraisingType, setFundraisingType] = React.useState("personal");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (type) => {
    setFundraisingType(type);
    handleClose();
  };

  React.useEffect(() => {
    const loadTargetAmount = localStorage.getItem("targetAmount");
    if (loadTargetAmount) {
      setTargetAmount(parseInt(loadTargetAmount, 10));
    }
  }, []);

  const handleConfirm = () => {
    alert(`목표금액: ${targetAmount.toLocaleString()}원`);
    // 필요한 API 호출 등의 작업 수행
  };

  return (
    <React.Fragment>
      <div style={{ paddingTop: "10px" }}>
        <Grid container spacing={1}>
          <Grid item xs={5} style={{ marginTop: "10px" }}>
            <Button style={{ color: "black" }}>
              <ArrowBackIosIcon />
            </Button>
          </Grid>
          <Grid item xs={5} style={{ marginTop: "17px", marginBottom: "0px" }}>
            <Typography variant="h5" gutterBottom style={{ marginBottom: "0px" }}>
              {user[0].name}
            </Typography>
          </Grid>
          <Grid item xs={2} style={{ marginTop: "10px" }}>
            <Button style={{ color: "black", paddingRight: "15px" }}>취소</Button>
          </Grid>
        </Grid>
      </div>
      <Typography
        variant="body2"
        align="center"
        style={{ fontSize: "13px", color: "gray" }}
      >
        {accountInfo.bank} {accountInfo.number}
      </Typography>
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 70}}>
        <Typography variant="h5" align="center">
          목표금액으로 아래의 금액을 설정하시겠습니까?
        </Typography>
        <br />
        <Typography variant="h3" align="center" style={{ fontSize: "4.5rem" }}>
          {targetAmount.toLocaleString()}원
        </Typography>
        <br />

        <Card
          style={{
            width: "300px",
            height: "50px",
            borderRadius: "5px",
            margin: "auto",
            display: "flex",
            alignItems: "center",
            paddingLeft: "10px",
            marginBottom: "50px"
          }}
        >
          <IconButton
            edge="start"
            color="primary"
            aria-label="toggle-fundraising-type"
            onClick={handleClick}
          >
            <ExpandMoreIcon />
          </IconButton>
          <Typography>{fundraisingType === "personal" ? "개인 모금" : "단체 모금"}</Typography>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleSelect("personal")}>개인 모금</MenuItem>
            <MenuItem onClick={() => handleSelect("group")}>단체 모금</MenuItem>
          </Menu>
        </Card>
      </div>
      <div
        style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      >
        <Button
          variant="contained"
          style={{
            backgroundColor: "#F7E676",
            color: "black",
            height: "46px",
            width: "350px",
            borderRadius: "5px",
            margin: "auto",
            display: "block"
          }}
          onClick={handleConfirm}
        >
          확인
        </Button>
      </div>
    </React.Fragment>
  );
};

export default FundraisingConfirmation;
