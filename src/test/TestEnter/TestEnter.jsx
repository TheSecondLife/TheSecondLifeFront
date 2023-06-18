import { useEffect, useState } from 'react'
import Test from '.././TestXMLtoJSON/Test'

function Enter() {
  
  let [latitude, setLatitude] = useState(-1);
  let [longitude, setLongitude] =useState(-1);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(pos) {
      setLatitude(pos.coords.latitude);
      setLongitude(pos.coords.longitude);
      const url = process.env.REACT_APP_KAKAO_LOGIN_URL;
      // console.log(url)
  });
  }, [])

  
  return (
    <>
    <Test></Test>
    <p>위도 : {latitude}, 경도 : {longitude}</p>
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

}

export default Enter;