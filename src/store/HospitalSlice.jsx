import {createSlice } from "@reduxjs/toolkit";
import {codes_info} from "../pages/health/RegionCode";
import {hospital_code} from "../pages/health/HospitalCode";


let initialState = {
  hospitalList  : [],
  address_sido : "",
  sido_num : 110001,
  address_dong : "",
  sickness : "",//아픈곳 statement
  diagnosis_list:[],//진료과명 리스트
  hospitalInfo: hospital_code,//진료과명 코드 전체 데이터
  diagnosisCodes : [],//진료과명을 코드로 바꾼 전체 데이터
  question:["무슨 구에 거주하시나요?", "무슨 읍/면/동에 거주하시나요?", "어디가 아프세요?"],
  explain:["강남구 / 송파구 / 부산남구 / 인천남동구", "정왕동 / 서천읍 / 금산면", "배가 아파요 / 이가 아파요"],
  codes : codes_info,
}
// 병원 정보 api 저장 
const hospital = createSlice({
  name : 'hospital',
  initialState,
  reducers:{
    getAddress_sido : (state, action)=>{
      
      //주소를 코드로 변환
      for(var i=0;i<state.codes.length;i++){
        if(action.payload===state.codes[i].region){
          state.sido_num = state.codes[i].code;
          localStorage.setItem("address_gu",state.sido_num);
          break;
        }
      }
      // 구 이름을 받으면 코드로 변환하기
      state.address_sido = action.payload;
    },
    getAddress_dong : (state, action)=>{
      state.address_dong = action.payload;
    },
    getSickness: (state, action)=>{
      state.sickness = action.payload;
    },
    getDiagnosis_list : (state, action) => {
      state.diagnosis_list = action.payload;
    },
    getDiagnosisCodes : (state, action) =>{
      state.diagnosisCodes.push(action.payload);
    },
    changeHospitalList:(state, action)=>{
      //특정한 지역의 전체 병원 리스트
      state.hospitalList.push(action.payload);
    }

  }
})


export let {changeHospitalList,getAddress_sido,getAddress_dong,getSickness,getDiagnosis_list,getDiagnosisCodes} = hospital.actions
export default hospital;