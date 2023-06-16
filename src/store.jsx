import { configureStore, createSlice } from "@reduxjs/toolkit";
import {} from "./UserReducer";

let initialState = {
  hospitalList  : [],

}
// 병원 정보 api 저장 
const hospitalSlice = createSlice({
  name : 'hospitals',
  initialState,
  reducers:{
    changeHospital : (state, action)=>{
      // 유저 선택에 따라 달라지는 병원 리스트 
      // state : hospitalList
      // action : 새로넘겨받은 값
      state=action.payload;
    }
  }
})
console.log(hospitalSlice);
export let {changeHospital} = hospitalSlice.actions

export default configureStore({
  reducer: { 
    hospitalSlice : hospitalSlice.reducer,
  }
}) 