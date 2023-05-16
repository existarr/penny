import React from "react";
import { useNavigate } from "react-router-dom";
import kakaoLoginButton from "../assets/kakao_login_medium_narrow.png";
import KakaoLogin from "react-kakao-login";
import { firestore } from "./firebase-config";

const SignIn = () => {
  const navigate = useNavigate();

  const handleSuccess = async (response) => {
    console.log(response);
    console.log(response.profile.properties.nickname);
    console.log(response.profile.properties.profile_image);
    console.log(response.profile.id);
    const userId = response.profile.id.toString();
    const userName = response.profile.properties.nickname;
    const imageUrl = response.profile.properties.profile_image;
    const userRef = firestore.collection("user").doc(userId);
    const userSnapshot = await userRef.get();
    if (!userSnapshot.exists) {
      await userRef.set({});
      await userRef.set(
        {
          id: response.profile.id,
          name: response.profile.properties.nickname,
          imageUrl: response.profile.properties.profile_image,
          currentDonationType: 'undefined',
          currentDonationOrganization: 'undefined',
        },
        { merge: true }
      );
      await userRef.collection("account").add({
        bank: "카카오뱅크",
        number: "482011-72-928829",
        balance: 1230871,
      });
      await userRef.collection("account").add({
        bank: "하나은행",
        number: "622311-80-958219",
        balance: 381673,
      });
    }
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", userName);
    localStorage.setItem("imageUrl", imageUrl);

    navigate("/penny/home", {
      state: {
        id: userId,
      },
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "300px",
          width: "100%",
        }}
      >
        <KakaoLogin
          token={"a26caa4bd7b9b30d7fe2e19b5a5f6454"}
          onSuccess={handleSuccess}
          onFial={console.error}
          onLogout={console.info}
        >
          <img src={kakaoLoginButton} width="100%" height="100%"></img>
        </KakaoLogin>
      </div>
    </>
  );
};

export default SignIn;
