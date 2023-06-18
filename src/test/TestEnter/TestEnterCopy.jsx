import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Test from '.././TestXMLtoJSON/Test'

function Enter() {
  
  let [latitude, setLatitude] = useState(-1);
  let [longitude, setLongitude] =useState(-1);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(pos) {
      setLatitude(pos.coords.latitude);
      setLongitude(pos.coords.longitude);
      const url = process.env.REACT_APP_KAKAO_LOGIN_URL;
      console.log(url)
  });
  }, [])

  let [dummyUser, setDummyUser] = useState({
    email : "kims1",
    name : "김숙자",
    password : "1234",
    nickname : "수잔",
    age : 20,
  })
  
  return (
    <>
    <Test></Test>
    <p>위도 : {latitude}, 경도 : {longitude}</p>
    <p>{JSON.stringify(dummyUser)}</p>
      <button onClick={() => {
        enter()
      }}>회원가입</button>
      <button on onClick={() => {
        login()
      }}>
        로그인
      </button>
      <button onClick={() => {
        check()
      }}>
        중복검사
      </button>
      <button onClick={() => {
        changePassword()
      }}>
        비밀번호 변경
      </button>
      <button onClick={() => {
        kakaoLogin()
      }}>
        카카오 로그인
      </button>
    </>
  )
  function kakaoLogin() {
    window.location.href = process.env.REACT_APP_KAKAO_LOGIN_URL
  }

  function enter() {
    // const url = "http://localhost:8080/api/user"
    const url = "/api/user/enter"
    const data = {
      email : dummyUser.email,
      name : dummyUser.name,
      password : dummyUser.password,
      nickname : dummyUser.nickname,
      age : dummyUser.age,
    }
    const config = {"Content-Type": 'application/json'};
    axios.post(url, data, config)
    .then((result) => {
      if (result.data) {
        alert("가입")
      } else {
        alert("중복된 아이디")
      }
    })
    .catch(() => {
      alert("실패")
    })
  }

  function login() {
    const url = "/api/user/login"
    const data = { email: dummyUser.email, password: dummyUser.password}
    // const data = { email: "@#4", password: dummyUser.password }
    // const data = { email: dummyUser.email, password: "ASD" }
    const config = {"Content-Type": 'application/json'};
    axios.post(url, data, config)
    .then((result) => {
      console.log(result.data)
    })
    .catch(() => {
      alert("실패")
    })
  }

  function check() {
    const url = "/api/user/check"
    const data = {email : "asda"}
    // const data = dummyUser.email;
    // const data = {email : dummyUser.email};
    console.log(data)
    const config = {"Content-Type": 'application/json'};
    axios.post(url, data, config)
    .then((result) => {
      console.log(result.data)
      if (result.data) {
        alert("사용가능")
      } else {
        alert("중복")
      }
    })
  }

  function changePassword() {
    const url = "/api/user/password"
    const data = "asda" 
    const config = {"Content-Type": 'application/json'};
    axios.post(url, data, config)
  }
}

export default Enter;