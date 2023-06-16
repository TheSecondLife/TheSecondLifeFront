import React, { useState , useEffect} from 'react';
import style from "../css/Main.module.css";


export default function Main(){
  return(
    <div className={`${style.page, style.fadein}`}>
      {/* 로고 */}
      <div className={style.logo}>Second Life</div>

      <button type="button" class="btn btn-warning"><b>카카오로 시작하기</b></button>
     
      {/* 메인 이미지  */}
      {/* <div className={`${style.mainImg}`}>
        <img src={process.env.PUBLIC_URL + '/mainImg.jpeg'}/>
      </div> */}

      {/* <div className={`${style.buttonLayout}`}>
        <button type="button" class="btn btn-outline-light">로그인</button>
        <button type="button" class="btn btn-outline-light">회원가입</button>
      </div> */}
      
    </div>
  );
}