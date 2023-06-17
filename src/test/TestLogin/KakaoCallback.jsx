import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function GetAuthCodeAndSendToSpring() {

  const navigate = useNavigate();

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get('code')
    kakaoLogin(code)
  }, [])

  async function kakaoLogin(code2) {
    const url = "http://localhost:8080/api/kakao/code";
    const data = { 
      code: code2,
      redirect: "http://localhost:3000/kakao/callback", 
    }
    const config = {"Content-Type": 'application/json'};
    // console.log(code2)
    await axios.post(url, data, config)
    .then((result) => {
      const loginUser = JSON.stringify(result.data)
      localStorage.setItem("loginUser", loginUser);
      navigate("/home");
    })
  }

  return(
    <>
    안녕카카오
    </>
  )
}

export default GetAuthCodeAndSendToSpring;