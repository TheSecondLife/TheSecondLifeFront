import React, { useState , useEffect} from 'react';
import style from "../css/Main.module.css";


export default function Main(){
  return(
    <div className={`${style.page, style.fadein}`}>

      {/* 로고 */}
      <div className={style.logo}>We're your <b style={{color:"#a26ce9"}}>Second Life</b></div>
     
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

      {/* <img src={process.env.PUBLIC_URL + '/mainImg.jpeg'}/> */}
      

      <div><button className={style.btn} style={{marginTop:"5%"}}>로그인</button></div>
      <div><button className={style.btn} style={{marginTop:"5%"}}>회원가입</button></div>

      <div className={style.bottom}></div>
    </div>
  );
}