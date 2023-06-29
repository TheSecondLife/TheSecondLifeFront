import React, { useState , useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {setCultureListSel} from "../../store/CultureSlice.jsx";

import style from "../../css/Culture.module.css";

import Loading from "../Loading";
import HeaderComp from "../HeaderComp";
import FooterComp from "../FooterComp";

const CultureList = () => {
    // redux 불러오기
    let state_culture = useSelector((state) => state.culture);
    let dispatcher = useDispatch();

    // 로그인 유저 정보 가져오기
    let loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

    const [loading, setLoading] = useState(true);//로딩창 
  
    
        console.log(state_culture.culture_list_sel);
        useEffect(()=>{dispatcher(setCultureListSel()); setLoading(false)},[]);

        return(
          <div className={style.fadein}>
            <HeaderComp/>
            {loading ? <Loading/> : null}

            {/* 안내문구 */}
            <div className={style.msg}>{loginUser.name}님, 이런 문화생활은 어떠세요?

              <a href="/cultureQuestion" style={{textDecoration:"none"}} >
                <p className={style.replay_btn}>다시 찾을래요</p>
              </a>
          </div>
            
              {state_culture.culture_list_sel.length!==0?state_culture.culture_list_sel.map((res)=>{
                return(
                  <div class="card" className={style.card} style={{width:"18rem"}}>
                    <img src="https://newsimg.hankookilbo.com/2019/06/17/201906171561759022_6.jpg" class="card-img-top" alt="..."/>

                      <div class="card-body">
                        <h5 className={style.company_name} class="card-title">{res.행사명}</h5>
                        <p className={style.subject} style={{fontSize:"15px", height:"10px"}}>요금 : {res.요금정보}</p>
                        <p className={style.sal} class="card-text" style={{fontSize:"15px", height:"10px", marginTop:'10px'}}>장소 : {res.장소}</p>
                        <p className={style.sal} class="card-text" style={{fontSize:"15px", height:"10px"}}>기간 : {res.행사시작일자} ~ {res.행사종료일자}</p>
                        <a class="btn btn-dark" href={`tel:${res.전화번호}`}>전화하기</a>
                      </div>
                  </div>
                );
              }) : <div style={{backgroundColor: '#a26ce9', color: 'white',fontSize: '30px', marginTop:'30%'}}>적합한 문화생활이 없습니다.</div>}
          <FooterComp/>
        </div>
    );
}

export default CultureList;