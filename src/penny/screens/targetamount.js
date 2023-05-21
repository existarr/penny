import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import {
  Grid,
  Button,
  IconButton,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import Iconify from "../../components/iconify";
import { useNavigate } from "react-router-dom";

export default function KeypadPage() {
  const [inputValue, setInputValue] = useState(0);
  const [savedTargetAmount, setSavedTargetAmount] = useState(0);
  const navigate = useNavigate();
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = (buttonValue) => {
    let value = inputValue.toString() + buttonValue.toString();
    setInputValue(parseInt(value));
  };

  const handleSetButton = (val) => {
    let added = inputValue + parseInt(val);
    setInputValue(added);
  };

  const handleNextClick = () => {
    if (inputValue != 0) {
      localStorage.setItem("target", inputValue);
      navigate("/penny/checktarget");
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Keypad Page</title>
      </Helmet>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>목표 금액 설정 필요</DialogTitle>
        <DialogContent>
          <p>목표 금액을 입력해 주세요.</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
      <Container
        style={{
          background: "#F7E676",
          height: "200px",
          paddingTop: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "150px",
          }}
        >
          <IconButton onClick={() => navigate(-1)} style={{ padding: "6px" }}>
            <Iconify
              icon="eva:arrow-ios-forward-fill"
              style={{
                color: "black",
                transform: "scaleX(-1)",
                fontSize: "12pt",
              }}
            />
          </IconButton>
          <span style={{ fontSize: "12pt" }}>금액 입력</span>
          <IconButton style={{ padding: "6px" }}>
            <Iconify
              icon="eva:settings-2-fill"
              style={{ color: "black", fontSize: "12pt", visibility: "hidden" }}
            />
          </IconButton>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ marginBottom: "35px", fontSize: "18pt" }}>
            {(inputValue - 0).toLocaleString()}원
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              padding: "8px",
            }}
          >
            <Button
              onClick={() => handleSetButton(1000)}
              variant="contained"
              style={{
                flexGrow: 1,
                margin: "0 4px",
                fontSize: "10pt",
                padding: "4px",
                background: "#F7F7F7",
                color: "#555555",
                boxShadow: "none",
              }}
            >
              1,000원
            </Button>
            <Button
              onClick={() => handleSetButton(5000)}
              variant="contained"
              style={{
                flexGrow: 1,
                margin: "0 4px",
                fontSize: "10pt",
                padding: "4px",
                background: "#F7F7F7",
                color: "#555555",
                boxShadow: "none",
              }}
            >
              5,000원
            </Button>
            <Button
              onClick={() => handleSetButton(10000)}
              variant="contained"
              style={{
                flexGrow: 1,
                margin: "0 4px",
                fontSize: "10pt",
                padding: "4px",
                background: "#F7F7F7",
                color: "#555555",
                boxShadow: "none",
              }}
            >
              10,000원
            </Button>
          </div>
        </div>
      </Container>

      <Container
        style={{
          background: "white",
          height: "440px",
          overflow: "auto",
          paddingTop: "20px",
        }}
      >
        <div style={{ padding: "0 16px 16px 16px" }}>
          <Grid container spacing={0}>
            <Grid item xs={4} style={{ border: "1px solid #E0E0E0" }}>
              <Button
                variant="contained"
                onClick={() => handleButtonClick(1)}
                fullWidth
                style={{
                  padding: "20px",
                  borderRadius: 0,
                  color: "#555555",
                  background: "white",
                  boxShadow: "none",
                }}
              >
                1
              </Button>
            </Grid>
            <Grid item xs={4} style={{ border: "1px solid #E0E0E0" }}>
              <Button
                variant="contained"
                onClick={() => handleButtonClick(2)}
                fullWidth
                style={{
                  padding: "20px",
                  borderRadius: 0,
                  color: "#555555",
                  background: "white",
                  boxShadow: "none",
                }}
              >
                2
              </Button>
            </Grid>
            <Grid item xs={4} style={{ border: "1px solid #E0E0E0" }}>
              <Button
                variant="contained"
                onClick={() => handleButtonClick(3)}
                fullWidth
                style={{
                  padding: "20px",
                  borderRadius: 0,
                  color: "#555555",
                  background: "white",
                  boxShadow: "none",
                }}
              >
                3
              </Button>
            </Grid>
            <Grid item xs={4} style={{ border: "1px solid #E0E0E0" }}>
              <Button
                variant="contained"
                onClick={() => handleButtonClick(4)}
                fullWidth
                style={{
                  padding: "20px",
                  borderRadius: 0,
                  color: "#555555",
                  background: "white",
                  boxShadow: "none",
                }}
              >
                4
              </Button>
            </Grid>
            <Grid item xs={4} style={{ border: "1px solid #E0E0E0" }}>
              <Button
                variant="contained"
                onClick={() => handleButtonClick(5)}
                fullWidth
                style={{
                  padding: "20px",
                  borderRadius: 0,
                  color: "#555555",
                  background: "white",
                  boxShadow: "none",
                }}
              >
                5
              </Button>
            </Grid>
            <Grid item xs={4} style={{ border: "1px solid #E0E0E0" }}>
              <Button
                variant="contained"
                onClick={() => handleButtonClick(6)}
                fullWidth
                style={{
                  padding: "20px",
                  borderRadius: 0,
                  color: "#555555",
                  background: "white",
                  boxShadow: "none",
                }}
              >
                6
              </Button>
            </Grid>
            <Grid item xs={4} style={{ border: "1px solid #E0E0E0" }}>
              <Button
                variant="contained"
                onClick={() => handleButtonClick()}
                fullWidth
                style={{
                  padding: "20px",
                  borderRadius: 0,
                  color: "#555555",
                  background: "white",
                  boxShadow: "none",
                }}
              >
                7
              </Button>
            </Grid>
            <Grid item xs={4} style={{ border: "1px solid #E0E0E0" }}>
              <Button
                variant="contained"
                onClick={() => handleButtonClick(8)}
                fullWidth
                style={{
                  padding: "20px",
                  borderRadius: 0,
                  color: "#555555",
                  background: "white",
                  boxShadow: "none",
                }}
              >
                8
              </Button>
            </Grid>
            <Grid item xs={4} style={{ border: "1px solid #E0E0E0" }}>
              <Button
                variant="contained"
                onClick={() => handleButtonClick(9)}
                fullWidth
                style={{
                  padding: "20px",
                  borderRadius: 0,
                  color: "#555555",
                  background: "white",
                  boxShadow: "none",
                }}
              >
                9
              </Button>
            </Grid>
            <Grid item xs={4} style={{ border: "1px solid #E0E0E0" }}>
              <Button
                variant="contained"
                onClick={() => setInputValue(0)}
                fullWidth
                style={{
                  padding: "20px",
                  borderRadius: 0,
                  color: "#555555",
                  background: "white",
                  boxShadow: "none",
                }}
              >
                C
              </Button>
            </Grid>
            <Grid item xs={4} style={{ border: "1px solid #E0E0E0" }}>
              <Button
                variant="contained"
                onClick={() => handleButtonClick(0)}
                fullWidth
                style={{
                  padding: "20px",
                  borderRadius: 0,
                  color: "#555555",
                  background: "white",
                  boxShadow: "none",
                }}
              >
                0
              </Button>
            </Grid>
            <Grid item xs={4} style={{ border: "1px solid #E0E0E0" }}>
              <Button
                variant="contained"
                onClick={() =>
                  setInputValue(inputValue.toString().slice(0, -1))
                }
                fullWidth
                style={{
                  padding: "20px",
                  borderRadius: 0,
                  color: "#555555",
                  background: "white",
                  boxShadow: "none",
                }}
              >
                ←
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>

      <Container
        style={{
          background: "#F7E676",
          height: screenHeight * 0.08,
          display: "flex",
          alignItems: "center",
          position: "fixed",
          bottom: "0",
          justifyContent: "center",
          flexDirection: "row",
          padding: "0",
          marginTop: "0px",
        }}
      >
        <Button
          variant="contained"
          onClick={handleNextClick}
          style={{
            width: "50%",
            background: "#F7F7F7",
            color: "#555555",
            boxShadow: "none",
          }}
        >
          다음
        </Button>
      </Container>
    </>
  );
}
