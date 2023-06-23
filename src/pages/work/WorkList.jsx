import React, { useState , useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {setJobList} from "../../store/WorkSlice.jsx";

import axios from 'axios';

import style from "../../css/WorkQuestion.module.css";

import HeaderComp from "../HeaderComp";
import FooterComp from "../FooterComp";

const WorkList = () => {
    // redux 불러오기
    let state_work = useSelector((state) => state.work);
    let dispatch = useDispatch();

    // 로그인 유저 정보 가져오기
    let loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

    // local storage 직무 정보 & 지역 정보 가져오기 
    let depth1 = localStorage.getItem("depth1");
    let depth2 = localStorage.getItem("depth2");
    let depth3 = localStorage.getItem("depth3");
    let work_address_code = localStorage.getItem("work_address_code");

    useEffect(()=>{
      //back -> api -> cors 우회 
      axios.post(`http://localhost:8080/api/open`,{openAPI:`http://openapi.work.go.kr/opi/opi/opia/wantedApi.do?authKey=WNLITIN7GFVJY3J17FMWQ2VR1HK&callTp=L&returnType=XML&startPage=1&display=30&region=${work_address_code}&occupation=${depth1}|${depth2}|${depth3}`})
      .then((res)=>{
        dispatch(setJobList(res.data.wantedRoot.wanted));
      }).catch((err)=>{
        console.log("cors 에러");
      })
    },[]);

    return(
      <div className={style.fadein}>
        <HeaderComp/>

        {/* 안내문구 */}
        <div className={style.msg}>{loginUser.name}님, 이런 기업들은 어떠세요?

          <a href="/workQuestion" style={{textDecoration:"none"}} >
            <p className={style.replay_btn}>다시 찾을래요</p>
          </a>
       </div>
        
          {state_work.job_list.map((res)=>{
            return(
              <div class="card" className={style.card} style={{width:"18rem"}}>
                <img src="data:image/jpeg;base64,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" class="card-img-top" alt="..."/>

                  <div class="card-body">
                    <h5 className={style.company_name} class="card-title">{res.company}</h5>
                    <p className={style.subject}>{res.title}</p>
                    <p className={style.sal} class="card-text" style={{fontSize:"15px", height:"50px"}}>연봉/월급 : {res.sal}</p>
                    <a href="https://m.work.go.kr/regionJobsWorknet/jobDetailView2.do?srchInfotypeNm=VALIDATION&srchWantedAuthNo=K120232306230033" class="btn btn-dark">지원하기</a>
                  </div>
              </div>
            );
          })}
       <FooterComp/>
      </div>
    );
}

export default WorkList;