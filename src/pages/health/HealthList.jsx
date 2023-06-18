import React, { useState , useEffect} from 'react';
import axios from 'axios';
import style from "../../css/HealthList.module.css";
import { useSelector, useDispatch } from 'react-redux';
import {changeHospitalList} from "../../store/HospitalSlice.jsx";

//https://www.data.go.kr/data/15001698/openapi.do
const HealthList = () => {
  // redux 불러오기
  let state_hospital = useSelector((state) => state.hospital);
  let dispatch = useDispatch();

  console.log(state_hospital.sido_num);
 
    useEffect(()=>{axios.get(`https://apis.data.go.kr/B551182/hospInfoServicev2/getHospBasisList?ServiceKey=fERDp1OKmJqiN%2BlVyCvnmH8YoFqdfOjIk7KzkZoDA8%2FIw6vmfXxGYvEou8NwVtlFsiX%2FLynuCmwQv9K1YfOGXw%3D%3D&sgguCd=${state_hospital.sido_num}`)
          .then((data)=>{
            // api로 불러온 정보 가져옴
            if(data.data.response.body.items.item != null)
              dispatch(changeHospitalList(data.data.response.body.items.item));
            console.log(data);
          })
          .catch(()=>{
            console.log("error");
          })},[])
        
    return(
      <div className={style.intro, style.fadein}> 
        {/* 로고 */}
        <div className={style.logo}>Second Life</div>

        {/* 안내문구 */}
        <div className={style.msg}>000님, 이런 병원들은 어떠세요?</div>

        {
          state_hospital.hospitalList.map((res)=>{
            return(
              <div className={style.hospital_info}>
                {/* 분류 / 병원 이름 / 병원 주소 순 */}
                <div><button type="button" class="btn" className={style.category}>{res.clCdNm}</button></div>
                <div className={style.hospital_info_sub}>
                  <div className={style.title}>{res.yadmNm}</div>
                  <div className={style.addr}>{res.addr}</div>
                </div>
                {/* 예약버튼 누르면 전화걸기 창으로 넘어감 */}
                <div className={style.btn_content}>
                  <div><button type="button" class="btn" className={style.regist_btn}>찜</button></div>
                  <a href={`tel:${res.telno}`}><button type="button" class="btn" className={style.regist_btn}>예약</button></a>
                </div>
              </div>
            );
          })
        }


        {/* page nation -> 무한 스크롤로 하면 필요 없음*/}
        {/* <nav aria-label="Page navigation example">
          <ul class="pagination" style={{justifyContent:'center'}}>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav> */}
        
      </div>
    );
}

export default HealthList;