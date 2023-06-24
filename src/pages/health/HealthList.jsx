import React, { useState , useEffect} from 'react';
import axios from 'axios';
import style from "../../css/HealthList.module.css";
import { useSelector, useDispatch } from 'react-redux';
import {changeHospitalList} from "../../store/HospitalSlice.jsx";
import HeaderComp from "../HeaderComp";
import FooterComp from "../FooterComp";

//https://www.data.go.kr/data/15001698/openapi.do
const HealthList = () => {
  // redux 불러오기
  let state_hospital = useSelector((state) => state.hospital);
  let dispatch = useDispatch();

  //loginUser 불러오기
  let loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

  //화면이 초기화되면 redux 내용이 모두 바뀌기 때문에 local storage에 값 저장 -> 불러오기
  let address_gu = localStorage.getItem("address_gu");
  let address_dong = localStorage.getItem("address_dong");
  let diagnosisCodes = localStorage.getItem("diagnosisCodes");

  // api요청 -> 내가 지금 위치한 곳 기준 전체 병원
  let hospitalList = [];
  let flag = false;

  useEffect(()=>{
    diagnosisCodes.split(",").map((code)=>{
      axios.get(`https://apis.data.go.kr/B551182/hospInfoServicev2/getHospBasisList?ServiceKey=${process.env.REACT_APP_HEALTH_KEY}&numOfRows=10&sgguCd=${address_gu}&emdongNm=${address_dong}&dgsbjtCd=${code}`)
      .then((data)=>{

        // api로 불러온 정보 가져옴
        for(let i=0;i<data.data.response.body.items.item.length;i++){ 
          for(let j=0;j<hospitalList.length;j++){
            if(hospitalList[j].yadmNm === data.data.response.body.items.item[i].yadmNm){
              //중복된 값이 이미 있다.
              flag = true;
            }
          }
        
          if(!flag){
            hospitalList.push(data.data.response.body.items.item[i]);
            dispatch(changeHospitalList(data.data.response.body.items.item[i]));
          }
          flag=false;
        }//for end

      })
      .catch(()=>{
        console.log("error");
      })
    });
  },[]);

  
        
  return(
    <div className={style.fadein}> 
      <HeaderComp/>

      {/* 로고 */}
      {/* <div className={style.logo}>Second Life</div> */}

      {/* 안내문구 */}
      <div className={style.msg}>{loginUser.name}님, 이런 병원들은 어떠세요?

        <a href="/HealthQuestion" style={{textDecoration:"none"}} >
          <p className={style.replay_btn}>다시 찾을래요</p>
        </a>
      </div>

      {/* 결과 지도 및 리스트 */}
      <div><Kakao></Kakao></div>
      {
        state_hospital.hospitalList.map((res)=>{
          return(
            <div class="card" className={style.card} style={{width:"18rem"}}>
              <img src="https://media.istockphoto.com/id/1240772668/ko/%EC%82%AC%EC%A7%84/%EB%B3%91%EC%9B%90%EC%9D%84%EC%9C%84%ED%95%9C-%ED%8C%8C%EB%9E%80%EC%83%89-%EB%AC%B8%EC%9E%90-h-%EA%B8%B0%ED%98%B8%EC%99%80-%ED%81%B0-%ED%98%84%EB%8C%80-%EA%B1%B4%EB%AC%BC.jpg?s=612x612&w=0&k=20&c=L4PWMffTtF8qilVCFpWjyIK8iqvBE9XVv3WpAF4naPs=" class="card-img-top" alt="..."/>
              <div class="card-body">
                <h5 class="card-title">{res.yadmNm}</h5>
                <p class="card-text" style={{fontSize:"15px", height:"100px"}}>{res.addr}</p>
                <a class="btn btn-dark" href={`tel:${res.telno}`}>전화하기</a>
              </div>
            </div>
          )
        })
      }
      <FooterComp/>
    </div>
    );
}


// 참고 :  https://velog.io/@tpgus758/React%EC%97%90%EC%84%9C-Kakao-map-API-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
// 카카오맵 api 시작
const {kakao} = window;

function Kakao(){
  //화면이 초기화되면 redux 내용이 모두 바뀌기 때문에 local storage에 값 저장 -> 불러오기
  let address_gu = localStorage.getItem("address_gu");
  let address_dong = localStorage.getItem("address_dong");
  let sickness = localStorage.getItem("sickness");
  let diagnosisCodes = localStorage.getItem("diagnosisCodes");

  // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
  function makeOverListener(map, marker, infowindow) {
    return function() {
        infowindow.open(map, marker);
    };
  }

  // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
  function makeOutListener(infowindow) {
    return function() {
        infowindow.close();
    };
  }

  useEffect(()=>{

    // 마커 표시
    axios.get(`https://apis.data.go.kr/B551182/hospInfoServicev2/getHospBasisList?ServiceKey=${process.env.REACT_APP_HEALTH_KEY}&sgguCd=${address_gu}&emdongNm=${address_dong}`)
    .then((data)=>{

    // 카카오 api
    var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    var options = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(data.data.response.body.items.item[0].YPos, data.data.response.body.items.item[0].XPos), //지도의 중심좌표.
      level: 7//지도의 레벨(확대, 축소 정도)
    };
    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    // api로 불러온 정보 가져옴 -> 정보 수만큼 마커 표시
    data.data.response.body.items.item.map((res)=>{
      var markerPosition  = new kakao.maps.LatLng(res.YPos, res.XPos); 
      var marker = new kakao.maps.Marker({
        position: markerPosition
      });
      marker.setMap(map);


      // 마커 위에 정보 표시
      var infowindow = new kakao.maps.InfoWindow({
        content:res.yadmNm // 인포윈도우에 표시할 내용
      });

      // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
      kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
    })
  })
  .catch(()=>{
    console.log("error");
  })
  },[])

  return(
    <div id="map" style={{width:"100%", height:"300px"}}></div>
  )
}
export default HealthList;