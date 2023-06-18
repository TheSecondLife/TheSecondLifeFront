import {createSlice } from "@reduxjs/toolkit";

let initialState = {
  hospitalList  : [],
  address_sido : "",
  sido_num : 110001,
  address_dong : "",
  sickness : "",
  question:["무슨 구에 거주하시나요?", "무슨 읍/면/동에 거주하시나요?", "어디가 아프세요?"],
  explain:["강남구 / 송파구 / 부산남구 / 인천남동구", "정왕동 / 서천읍 / 금산면", "배가 아파요 / 이가 아파요"],
}
// 병원 정보 api 저장 
const hospital = createSlice({
  name : 'hospital',
  initialState,
  reducers:{
    changeHospitalList : (state, action)=>{
      // 유저 선택에 따라 달라지는 병원 리스트 
      // state : hospitalList
      // action : 새로넘겨받은 값
      state.hospitalList=action.payload;
    },
    getAddress_sido : (state, action)=>{
      state.address_sido = action.payload;

      //구 이름을 받으면 코드로 변환하기
      if(action.payload=="강남구"){
        state.sido_num = 110001;
      }else if(action.payload=="강동구"){
        state.sido_num = 110002;
      }else if(action.payload=="강서구"){
        state.sido_num = 110003;
      }else if(action.payload=="관악구"){
        state.sido_num = 110004;
      }else if(action.payload=="구로구"){
        state.sido_num = 110005;
      }
    },
    getAddress_dong : (state, action)=>{
      state.address_dong = action.payload;
    },
    getSickness: (state, action)=>{
      state.sickness = action.payload;
    }

  }
})


export let {changeHospitalList,getAddress_sido,getAddress_dong,getSickness} = hospital.actions
export default hospital;