import {createSlice } from "@reduxjs/toolkit";
import {local_info} from "../pages/work/local_code";
import {work_info} from "../pages/work/work_code";

let initialState = {
  local_info : local_info,
  work_info : work_info,
  depth_data : [],
  depth1_idx:"",
  depth2_idx:"",
  depth3_idx:"",
  question:["어디에서 일하시고 싶으세요?", "어떤 직업을 원하세요?", "이 중에선 어떤 직업을 원하시나요?", "마지막으로 최종 직업을 선택해주세요"],
  explain:["ex) 서울 / 서울 송파구 / 인천 / 인천 남동구", "자유롭게 선택해주세요","자유롭게 선택해주세요","자유롭게 선택해주세요"],
  explain2:["녹음버튼을 누른 채 말씀해주세요", "목록을 보시고 선택해주세요", "목록을 보시고 선택해주세요", "목록을 보시고 선택해주세요"],
  local_code:"0000",
  work_code:"011100",
  job_list : [],
  click : "여기를 눌러주세요",
}

const work = createSlice({
  name : 'work',
  initialState,
  reducers:{
    getAddress : (state, action)=>{
      //주소를 코드로 변환
      for(var i=0;i<state.local_info.length;i++){
        if(action.payload===state.local_info[i].region){
          state.local_code = state.local_info[i].code;
          localStorage.setItem("work_address_code",state.local_code);
          break;
        }
      }
    },

    getWork : (state, action) => {
      state.work_code = action.payload;
      localStorage.setItem("work_code",state.work_code);
    },

    setDepth_data : (state, action) => {
      state.depth_data = action.payload;
    },
    setDepth1 : (state, action)=>{
      for(var i=0;i<state.work_info.length;i++){
        if(state.work_info[i].code === action.payload) state.depth1_idx = i;
      }

      localStorage.setItem("depth1",action.payload);
    },
    setDepth2 : (state, action)=>{
      for(var i=0;i<state.work_info.length;i++){
        if(state.work_info[i].code === action.payload) state.depth2_idx = i;
      }
      localStorage.setItem("depth2",action.payload);
    },
    setDepth3 : (state, action)=>{
      for(var i=0;i<state.work_info.length;i++){
        if(state.work_info[i].code === action.payload) state.depth3_idx = i;
      }
      localStorage.setItem("depth3",action.payload);
    },

    setJobList : (state, action)=>{
      state.job_list = action.payload;
    },

    changeStatement : (state, action)=>{
        state.click = action.payload;
    }
  }
})


export let {changeStatement,getAddress, getWork, setDepth_data, setDepth1, setDepth2, setDepth3, setJobList} = work.actions
export default work;