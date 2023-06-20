import React, { useState , useEffect} from 'react';
import style from "../../css/Main.module.css";


export default function Main(){

  // let [latitude, setLatitude] = useState(-1);
  // let [longitude, setLongitude] =useState(-1);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(function(pos) {
  //     setLatitude(pos.coords.latitude);
  //     setLongitude(pos.coords.longitude);
  //     const url = process.env.REACT_APP_KAKAO_LOGIN_URL;
  // });
  // }, [])
  return(
    <div className={`${style.page, style.fadein}`}>
      {/* <p>위도 : {latitude}, 경도 : {longitude}</p> */}

      {/* 로고 */}
      <div className={style.logo}>We're your <b style={{color:"#a26ce9", fontFamily:"Caveat"}}>Second Life</b></div>
     
      {/* auto playing */}
      <div className={style.slider} id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div className={style.slider} class="carousel-item active">
            <img style={{margin:"auto"}} src={process.env.PUBLIC_URL + '/mainImg1_1.png'} class="d-block w-50" alt="..."/>
          </div>
          <div class="carousel-item">
            <img style={{margin:"auto"}} src={process.env.PUBLIC_URL + '/mainImg1_2.png'} class="d-block w-50" alt="..."/>
          </div>
          <div class="carousel-item">
            <img style={{margin:"auto"}} src={process.env.PUBLIC_URL + '/mainImg1_3.png'} class="d-block w-50" alt="..."/>
          </div>
        </div>
      </div>

      
      {/* 카카오 로그인 */}
      <div><button className={style.btn} style={{marginTop:"5%"}} onClick={() => {
        kakaoLogin()}}>로그인</button></div>
      {/* <div><button className={style.btn} style={{marginTop:"5%"}} onClick={() => {
        enter()}}>회원가입</button></div> */}

      <div className={style.bottom}></div>
    </div>
  );

  function kakaoLogin() {
    window.location.href = process.env.REACT_APP_KAKAO_LOGIN_URL
  }
}