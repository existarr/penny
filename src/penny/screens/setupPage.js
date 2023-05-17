import { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { MapMarker, Map } from "react-kakao-maps-sdk";

import { useNavigate, useLocation, Link } from "react-router-dom";

import { firestore } from "./firebase-config";

//import user data
import user from "../data/users";

var accountInfo = [];
user.map((u) => {
  u.account.map((acc, index) => (accountInfo[index] = acc));
});

const geolocation = navigator.geolocation;

export default function App() {
  const { kakao } = window;
  const location = useLocation();
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [accountData, setAccountData] = useState([]);
  const [position, setPosition] = useState({
    latitude: null,
    longitude: null,
  });
  const [address, setAddress] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const userId = localStorage.getItem('userId');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const handleCloseScreen = () => {
    navigate("/penny/home");
  };

  useEffect(() => {
    const callData = async () => {
      // console.log(firestore);
      const userRef = firestore.collection("user").doc(userId);
      const userSnapshot = await userRef.get();
      setUserData(userSnapshot.data());
      setUserData((prevUserData) => ({
        ...prevUserData,
        donationAccount: null,
        isAuto: false,
        autoDonationAmount: null,
        currentDonationType: null,
        address: null,
      }));
      const accountRef = firestore
        .collection("user")
        .doc(userId)
        .collection("account");
      const accountDoc = [];
      accountRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { bank, number, balance } = doc.data();
          accountDoc.push({
            bank: bank,
            number: number,
            balance: balance,
          });
        });
        setAccountData(accountDoc);
      });
    };

    callData();
  }, [userId]);

  const handleSelect = (e) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    console.log(userData);
    let hasNull = Object.values(userData).includes(null);
    // console.log(hasNull);
    if (hasNull) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [userData]);

  useEffect(() => {
    if (userData.isAuto === true) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        autoDonationAmount: null,
      }));
    } else if (userData.isAuto === false) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        autoDonationAmount: 0,
      }));
    }
  }, [userData.isAuto]);

  const getAddress = (lat, lng) => {
    const geocoder = new kakao.maps.services.Geocoder(); // 좌표 -> 주소로 변환해주는 객체
    const coord = new kakao.maps.LatLng(lat, lng); // 주소로 변환할 좌표 입력
    const callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setAddress(result[0].address);
        setUserData((prevUserData) => ({
          ...prevUserData,
          address: result[0].address.address_name,
        }));
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  };

  const getPosition = () => {
    geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        getAddress(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        console.error(err);
      }
    );
  };

  const initialSetup = async () => {
    localStorage.setItem('temporaryUserData', userData);
    navigate("/penny/organization-list", {
      state: {
        id: userId,
        userData: userData,
      },
    });
  };

  return (
    <div style={{ height: screenHeight * 0.92 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
          padding: "0px 5px",
          marginBottom: "10px",
        }}
      >
        <Button disabled={true} />
        <p style={{ textAlign: "center", fontSize: "11pt" }}>Penny 기본 설정</p>
        <Button
          style={{ color: "black", width: "40px", height: "40px" }}
          onClick={handleCloseScreen}
        >
          닫기
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: screenHeight * 0.42,
        }}
      >
        <span
          style={{
            marginLeft: "33px",
            fontSize: "10pt",
            letterSpacing: 1,
            fontWeight: "bold",
          }}
        >
          연동 계좌
        </span>
        <Select
          required
          style={{
            margin: "0px 30px",
            height: "35px",
            color: "black",
            fontSize: "11pt",
          }}
          defaultValue="placeholder1"
          name="donationAccount"
          onChange={handleSelect}
        >
          <MenuItem value="placeholder1" disabled style={{ display: "none" }}>
            연동할 계좌를 선택해 주세요.
          </MenuItem>
          {accountData.map((acc) => (
            <MenuItem value={acc.number}>
              {acc.bank} {acc.number}
            </MenuItem>
          ))}
        </Select>
        <span
          style={{
            marginLeft: "33px",
            color: "red",
            fontSize: "6pt",
            height: "12px",
            visibility: userData.donationAccount ? "hidden" : "visible",
          }}
        >
          *계좌를 선택해 주세요.
        </span>
        <span
          style={{
            marginTop: "5px",
            marginLeft: "33px",
            fontSize: "10pt",
            letterSpacing: 1,
            fontWeight: "bold",
          }}
        >
          모금 방식
        </span>
        <Select
          style={{ margin: "0px 30px", height: "35px", fontSize: "11pt" }}
          defaultValue="placeholder2"
          name="isAuto"
          onChange={handleSelect}
        >
          <MenuItem value="placeholder2" disabled style={{ display: "none" }}>
            모금 방식을 선택해 주세요.
          </MenuItem>
          <MenuItem value={true}>자동 (자동으로 모금)</MenuItem>
          <MenuItem value={false}>수동</MenuItem>
        </Select>
        <span
          style={{
            marginLeft: "33px",
            color: "red",
            height: "12px",
            fontSize: "6pt",
            visibility: userData.isAuto !== null ? "hidden" : "visible",
          }}
        >
          *모금 방식을 선택해 주세요.
        </span>
        <span
          style={{
            marginTop: "5px",
            marginLeft: "33px",
            fontSize: "10pt",
            letterSpacing: 1,
            fontWeight: "bold",
          }}
        >
          모금 단위
        </span>
        {userData.isAuto ? (
          <>
            <Select
              style={{ margin: "0px 30px", height: "35px", fontSize: "11pt" }}
              defaultValue="placeholder3"
              name="autoDonationAmount"
              onChange={handleSelect}
            >
              <MenuItem
                value="placeholder3"
                disabled
                style={{ display: "none" }}
              >
                자동 모금 단위를 선택해 주세요.
              </MenuItem>
              <MenuItem value={1}>1원 단위</MenuItem>
              <MenuItem value={10}>10원 단위</MenuItem>
              <MenuItem value={100}>100원 단위</MenuItem>
            </Select>
            <span
              style={{
                marginLeft: "33px",
                color: "red",
                fontSize: "6pt",
                height: "12px",
                visibility:
                  userData.autoDonationAmount !== null ? "hidden" : "visible",
              }}
            >
              *모금 단위를 선택해 주세요.
            </span>
          </>
        ) : (
          <>
            <Select
              style={{ margin: "0px 30px", height: "35px", fontSize: "11pt" }}
              defaultValue="placeholder3"
              name="autoDonationAmount"
              onChange={handleSelect}
              disabled
            >
              <MenuItem
                value="placeholder3"
                disabled
                style={{ display: "none" }}
              >
                자동 모금 단위를 선택해 주세요.
              </MenuItem>
              <MenuItem value={1}>1원 단위</MenuItem>
              <MenuItem value={10}>10원 단위</MenuItem>
              <MenuItem value={100}>100원 단위</MenuItem>
            </Select>
            <span
              style={{ visibility: "hidden", fontSize: "6pt", height: "12px" }}
            >
              *모금 단위를 선택해 주세요.
            </span>
          </>
        )}
        <span
          style={{
            marginTop: "5px",
            marginLeft: "33px",
            fontSize: "10pt",
            letterSpacing: 1,
          }}
        >
          <span style={{ fontWeight: "bold" }}>기부 방식</span>
          <span style={{ fontSize: "8pt" }}> (기부 마감 후 변경 가능)</span>
        </span>
        <Select
          style={{ margin: "0px 30px", height: "35px", fontSize: "11pt" }}
          defaultValue="placeholder4"
          name="currentDonationType"
          onChange={handleSelect}
        >
          <MenuItem value="placeholder4" disabled style={{ display: "none" }}>
            기부 방식을 선택해 주세요.
          </MenuItem>
          <MenuItem value="single">개인 기부</MenuItem>
          <MenuItem value="group">함께 기부</MenuItem>
        </Select>
        <span
          style={{
            marginLeft: "33px",
            color: "red",
            fontSize: "6pt",
            height: "12px",
            visibility: userData.currentDonationType ? "hidden" : "visible",
          }}
        >
          *기부 방식을 선택해 주세요.
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "3px",
        }}
      >
        <Button
          style={{ width: "100%", fontSize: "10pt", textAlign: 'center' }}
          onClick={handleClickOpen}
        >
          {!position.latitude ? (
            "나의 위치 찾기"
          ) : address ? (
            <span style={{ letterSpacing: 1 }}>
              현재 주소: {address.address_name}
            </span>
          ) : null}
        </Button>
        <span
          style={{
            color: "red",
            fontSize: "6pt",
            height: "12px",
            textAlign: 'center',
            marginTop: '-8px',
            visibility:
              userData.address !== null ? "hidden" : "visible",
          }}
        >
          *위치 사용을 허용해 주세요.
        </span>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ fontSize: "12pt" }}>
          {position.latitude === null
            ? "Penny이(가) 사용자의 위치를 사용하도록 허용하시겠습니까?"
            : "위치를 다시 검색하시겠습니까?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ fontSize: "11pt" }}
          >
            {position.latitude === null
              ? "현재 위치를 기반으로 주변 기관을 검색합니다. 허용하지 않을 경우 앱 사용이 제한될 수 있습니다."
              : "현재 위치를 기반으로 주변 기관을 검색합니다."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              paddingRight: "5px",
              paddingBottom: "5px",
            }}
          >
            {position.latitude === null ? (
              <Button
                onClick={() => {
                  getPosition();
                  handleClose();
                }}
              >
                한 번 허용
              </Button>
            ) : null}
            <Button
              onClick={() => {
                getPosition();
                handleClose();
              }}
            >
              {position.latitude === null ? "앱을 사용하는 동안 허용" : "예"}
            </Button>
            <Button onClick={handleClose} style={{ color: "black" }}>
              {position.latitude === null ? "허용 안 함" : "아니오"}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      {/* {position.latitude !== 0 && position.longitude !== 0 && (
          <div>
            <p>위도: {position.latitude}</p>
          <p>경도: {position.longitude}</p>
            {address && <p>주소: {address.address_name}</p>}
          </div>
        )} */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "5px 30px",
          marginBottom: "5px",
        }}
      >
        <Map
          center={
            position.latitude
              ? { lat: position.latitude, lng: position.longitude }
              : { lat: 33.450701, lng: 126.570667 }
          }
          style={{
            width: "100%",
            height: "220px",
            border: "1px solid lightgray",
          }}
        >
          <MapMarker
            position={{ lat: position.latitude, lng: position.longitude }}
          >
            {/* <div style={{ color: "#000" }}>현재 위치</div> */}
          </MapMarker>
        </Map>
      </div>
      {isValid ? (
        <Button
          variant="contained"
          fullWidth
          style={{
            backgroundColor: "#F7E676",
            borderRadius: "0px",
            color: "black",
            width: "100%",
            height: screenHeight * 0.08,
            position: "fixed",
            bottom: 0,
          }}
          onClick={() => initialSetup()}
        >
          Penny 신청하기
        </Button>
      ) : (
        <Button
          variant="contained"
          fullWidth
          style={{
            borderRadius: "0px",
            width: "100%",
            height: screenHeight * 0.08,
            position: "fixed",
            bottom: 0,
          }}
          disabled
        >
          Penny 신청하기
        </Button>
      )}
    </div>
  );
}
