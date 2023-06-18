import {createSlice } from "@reduxjs/toolkit";

let initialState = {
  hospitalList  : [],

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
    }
  }
})

export let {changeHospitalList} = hospital.actions
export default hospital;