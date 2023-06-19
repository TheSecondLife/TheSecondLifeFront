import {createSlice } from "@reduxjs/toolkit";
// import {codes_info} from "../pages/health/scraper.js";
import {server} from "../pages/health/server";


let initialState = {
  hospitalList  : [],
  address_sido : "",
  sido_num : 110001,
  address_dong : "",
  sickness : "",
  question:["무슨 구에 거주하시나요?", "무슨 읍/면/동에 거주하시나요?", "어디가 아프세요?"],
  explain:["강남구 / 송파구 / 부산남구 / 인천남동구", "정왕동 / 서천읍 / 금산면", "배가 아파요 / 이가 아파요"],
  // codes_info,
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
      
      // for(var i =0;i<codes_info.length;i++){
      //   if(action.payload===codes_info[i].region){
      //     state.sido_num = codes_info[i].code;
      //     localStorage.setItem("address_gu",state.sido_num);
      //     break;
      //   }
      // }
      
      // 구 이름을 받으면 코드로 변환하기
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
      }else if(action.payload=="도봉구"){
        state.sido_num = 110006;
      }else if(action.payload=="동대문구"){
        state.sido_num = 110007;
      }else if(action.payload=="동작구"){
        state.sido_num = 110008;
      }else if(action.payload=="마포구"){
        state.sido_num = 110009;
      }else if(action.payload=="서대문구"){
        state.sido_num = 110010;
      }else if(action.payload=="성동구"){
        state.sido_num = 110011;
      }else if(action.payload=="성북구"){
        state.sido_num = 110012;
      }else if(action.payload=="영등포구"){
        state.sido_num = 110013;
      }else if(action.payload=="용산구"){
        state.sido_num = 110014;
      }else if(action.payload=="은평구"){
        state.sido_num = 110015;
      }else if(action.payload=="종로구"){
        state.sido_num = 110016;
      }else if(action.payload=="중구"){
        state.sido_num = 1100017;
      }else if(action.payload=="송파구"){
        state.sido_num = 110018;
      }else if(action.payload=="중랑구"){
        state.sido_num = 110019;
      }else if(action.payload=="양천구"){
        state.sido_num = 110020;
      }else if(action.payload=="서초구"){
        state.sido_num = 110021;
      }else if(action.payload=="노원구"){
        state.sido_num = 110022;
      }else if(action.payload=="광진구"){
        state.sido_num = 110023;
      }else if(action.payload=="강북구"){
        state.sido_num = 110024;
      }else if(action.payload=="금천구"){
        state.sido_num = 110025;
      }else if(action.payload=="부산남구"){
        state.sido_num = 210001;
      }else if(action.payload=="부산동구"){
        state.sido_num = 210002;
      }else if(action.payload=="부산동래구"){
        state.sido_num = 210003;
      }else if(action.payload=="부산진구"){
        state.sido_num = 210004;
      }else if(action.payload=="부산북구"){
        state.sido_num = 210005;
      }else if(action.payload=="부산서구"){
        state.sido_num = 210006;
      }else if(action.payload=="부산영도구"){
        state.sido_num = 210007;
      }else if(action.payload=="부산중구"){
        state.sido_num = 210008;
      }else if(action.payload=="부산해운대구"){
        state.sido_num = 210009;
      }else if(action.payload=="부산사하구"){
        state.sido_num = 210010;
      }else if(action.payload=="부산금정구"){
        state.sido_num = 210011;
      }else if(action.payload=="부산강서구"){
        state.sido_num = 210012;
      }else if(action.payload=="부산연제구"){
        state.sido_num = 210013;
      }else if(action.payload=="부산수영구"){
        state.sido_num = 210014;
      }else if(action.payload=="부산사상구"){
        state.sido_num = 210015;
      }else if(action.payload=="부산기장군"){
        state.sido_num = 210100;
      }else if(action.payload=="인천미추홀구"){
        state.sido_num = 220001;
      }else if(action.payload=="인천동구"){
        state.sido_num = 220002;
      }else if(action.payload=="인천부평구"){
        state.sido_num = 220003;
      }else if(action.payload=="인천중구"){
        state.sido_num = 220004;
      }else if(action.payload=="인천서구"){
        state.sido_num = 220005;
      }else if(action.payload=="인천남동구"){
        state.sido_num = 220006;
      }else if(action.payload=="인천연수구"){
        state.sido_num = 220007;
      }else if(action.payload=="인천계양구"){
        state.sido_num = 220008;
      }else if(action.payload=="인천강화군"){
        state.sido_num = 220100;
      }else if(action.payload=="인천옹진군"){
        state.sido_num = 220200	;
      }else if(action.payload=="대구남구"){
        state.sido_num = 230001	;
      }else if(action.payload=="대구동구"){
        state.sido_num = 230002	;
      }else if(action.payload=="대구북구"){
        state.sido_num = 230003	;
      }else if(action.payload=="대구서구"){
        state.sido_num = 230004	;
      }else if(action.payload=="대구수성구"){
        state.sido_num = 230005	;
      }else if(action.payload=="대구중구"){
        state.sido_num = 230006	;
      }else if(action.payload=="대구달서구"){
        state.sido_num = 230007	;
      }else if(action.payload=="대구달성군"){
        state.sido_num = 230100	;
      }else if(action.payload=="광주동구"){
        state.sido_num = 240001	;
      }else if(action.payload=="광주북구"){
        state.sido_num = 240002	;
      }else if(action.payload=="광주서구"){
        state.sido_num = 240003	;
      }else if(action.payload=="광주광산구"){
        state.sido_num = 240004	;
      }else if(action.payload=="광주남구"){
        state.sido_num = 240005	;
      }else if(action.payload=="대전유성구"){
        state.sido_num = 250001	;
      }else if(action.payload=="대전대덕구"){
        state.sido_num = 250002	;
      }else if(action.payload=="대전서구"){
        state.sido_num = 250003	;
      }else if(action.payload=="대전동구"){
        state.sido_num = 250004	;
      }else if(action.payload=="대전중구"){
        state.sido_num = 250005	;
      }else if(action.payload=="울산남구"){
        state.sido_num = 260001	;
      }else if(action.payload=="울산동구"){
        state.sido_num = 260002	;
      }else if(action.payload=="울산중구"){
        state.sido_num = 260003	;
      }else if(action.payload=="울산북구"){
        state.sido_num = 260004	;
      }else if(action.payload=="울산울주군"){
        state.sido_num = 260100	;
      }
      state.address_sido = action.payload;
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