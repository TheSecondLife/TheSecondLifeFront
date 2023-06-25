import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from "../Loading";

function GetAuthCodeAndSendToSpring() {

  const navigate = useNavigate();

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get('code')
    kakaoLogin(code)
  }, [])

  async function kakaoLogin(code2) {
    const url = "/api/kakao/code";
    const data = { 
      code: code2,
      redirect: process.env.REACT_APP_KAKAO_CALL_BACK, 
    }
    const config = {"Content-Type": 'application/json'};
    // console.log(code2)
    await axios.post(url, data, config)
    .then((result) => {
      const loginUser = JSON.stringify(result.data)
      sessionStorage.setItem("loginUser", loginUser);
      navigate("/home");
    })
  }

  return(
    <>
    <Spinner/>
    </>
  )
}

export default GetAuthCodeAndSendToSpring;