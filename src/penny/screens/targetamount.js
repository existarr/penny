import { Helmet } from "react-helmet-async";
import { useState } from "react";
import {
  Grid,
  Button,
  IconButton,
  Container,
//   Stack,
//   Typography,
} from "@mui/material";
import Iconify from "../../components/iconify";

export default function KeypadPage() {
  const [inputValue, setInputValue] = useState(0);

  const handleButtonClick = (buttonValue) => {
    setInputValue((prevValue) => prevValue + buttonValue);
  };

  const handleNextClick = () => {
    // do something when next button is clicked, e.g. navigate to a new page
  };

  return (
    <>
      <Helmet>
        <title>Keypad Page</title>
      </Helmet>

      <Container
  style={{ background: "#BFDDFB", height: "200px", paddingTop: "10px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "150px"
    }}
  >
    <IconButton>
      <Iconify
        icon="eva:arrow-ios-forward-fill"
        style={{ color: "black", transform: "scaleX(-1)" }}
      />
    </IconButton>
    <span style={{ fontSize: "14pt" }}>금액 입력</span>
    <IconButton>
      <Iconify icon="eva:settings-2-fill" style={{ color: "black" }} />
    </IconButton>
  </div>
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      margin: "none",
      padding: "none",
    }}
  >
    <div style={{ marginBottom: "35px" }}>
      {(inputValue - 0).toLocaleString()}원
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "12px 8px" }}>
      <Button onClick={() => handleButtonClick(1000)} variant="contained" style={{flexGrow: 1, margin: "0 4px"}}>
        1,000원
      </Button>
      <Button onClick={() => handleButtonClick(5000)} variant="contained" style={{flexGrow: 1, margin: "0 4px"}}>
        5,000원
      </Button>
      <Button onClick={() => handleButtonClick(10000)} variant="contained" style={{flexGrow: 1, margin: "0 4px"}}>
        10,000원
      </Button>
    </div>
  </div>
</Container>

<Container style={{ background: "white", height: "440px", overflow: "auto", paddingTop: "20px" }}>
  <div style={{ padding: "0 16px 16px 16px" }}>
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <Button variant="contained" onClick={() => handleButtonClick(1)} fullWidth style={{padding: "20px"}}>
          1
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" onClick={() => handleButtonClick(2)} fullWidth style={{padding: "20px"}}>
          2
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" onClick={() => handleButtonClick(3)} fullWidth style={{padding: "20px"}}>
          3
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" onClick={() => handleButtonClick(4)} fullWidth style={{padding: "20px"}}>
          4
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" onClick={() => handleButtonClick(5)} fullWidth style={{padding: "20px"}}>
          5
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" onClick={() => handleButtonClick(6)} fullWidth style={{padding: "20px"}}>
          6
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" onClick={() => handleButtonClick(7)} fullWidth style={{padding: "20px"}}>
          7
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" onClick={() => handleButtonClick(8)} fullWidth style={{padding: "20px"}}>
          8
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" onClick={() => handleButtonClick(9)} fullWidth style={{padding: "20px"}}>
          9
        </Button>
      </Grid>
            <Grid item xs={4}>
        <Button
            variant="contained"
            onClick={() => setInputValue(0)}
            fullWidth
            style={{padding: "20px"}}
        >
            C
        </Button>
        </Grid>
        <Grid item xs={4}>
        <Button variant="contained" onClick={() => handleButtonClick(0)} fullWidth style={{padding: "20px"}}>
            0
        </Button>
        </Grid>
      <Grid item xs={4}>
        <Button variant="contained" onClick={() => setInputValue(inputValue.toString().slice(0, -1))} fullWidth style={{padding: "20px"}}>
          ←
        </Button>
      </Grid>
    </Grid>
  </div>
</Container>

<Container style={{ background: "lightblue", height: "50px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row",padding: "0" }}>
  <Button variant="contained" onClick={handleNextClick} style={{ width: "50%" }}>
    다음
  </Button>
</Container>

</>
);
}