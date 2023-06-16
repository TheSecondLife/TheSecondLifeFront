import React, { useState , useEffect} from 'react';
import style from "../css/Main.module.css";


export default function Main(){
  return(
    <div className={`${style.page}`}>
      <div style={{textAlign:'center', height:'70px', lineHeight: '70px'}}>Second Life LOGO</div>
      {/* 메인 이미지  */}
      <div className={`${style.mainImg}`}>
        <img src={process.env.PUBLIC_URL + '/mainImg.jpeg'}/>
      </div>

      <div className={`${style.buttonLayout}`}>
        <button type="button" class="btn btn-outline-primary">로그인</button>
        <button type="button" class="btn btn-outline-primary">회원가입</button>
      </div>
      
    </div>
  );
}