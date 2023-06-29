import {createSlice } from "@reduxjs/toolkit";
import {records} from "../pages/culture/eventList";


const initialState = {
  culture_list : records,
  question:["어떤 도시에 사세요?", "오늘 문화를 즐길 예정이세요?"],
  explain:["ex) 서울광역시 / 대전광역시 / 인천광역시","ex) 네, 아니오로 대답해주세요"],
  culture_list_sel : [],
}

const culture = createSlice({
  name : 'culture',
  initialState,
  reducers:{
    setCultureListSel : (state)=>{
      //초기화
      state.culture_list_sel=[];
      //응답 불러오기
      let culture_country = localStorage.getItem("culture_country");
      let yes_or_no = localStorage.getItem("yes_or_no");

      //오늘날짜 구하기
      let today = new Date();   

      let year = today.getFullYear(); // 년도
      let month = today.getMonth() + 1;  // 월
      let date = today.getDate();  // 날짜

      records.map((one)=>{
        // console.log(one);
        //도시만 가져오기
        let address = null; //대구광역시 

        if(state.culture_list_sel.length>=30) return;

        if(one.소재지지번주소){address = one.소재지지번주소.split(' ')[0];}
        else address = null;

        //지역 확인 같냐 
        if(address===culture_country){
          //날짜 split '-'
          let date_list = one.데이터기준일자.split('-'); //[2023, 06, 30]
  
          if(yes_or_no==="네"){
            //오늘 날짜만 보여주기 
            if(date_list[0]==year && date_list[1]==month && date_list[2]==date){
              state.culture_list_sel.push(one);
            }

          }else{
            //아니요 -> 오늘날짜부터 이후에 있는 문화까지 보여주기 
            if(date_list[0]>=year || (date_list[0]==year && date_list[1]>=month) || (date_list[0]==year && date_list[1]==month && date_list[2]>=date)){
              state.culture_list_sel.push(one);
            }
          }
        }
        
      })
    }
  }
})

export let {setCultureListSel} = culture.actions
export default culture;