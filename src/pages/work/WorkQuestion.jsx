import React, { useState , useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from "../../css/WorkList.module.css";
import axios from 'axios';
import { useSpeechRecognition } from "react-speech-kit";
import HeaderComp from "../HeaderComp";
import FooterComp from "../FooterComp";

const WorkQuestion = () => {

  // redux 불러오기
  let state_work = useSelector((state) => state.work);
  let dispatch = useDispatch();

  // 로그인 유저 정보 가져오기
  let loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

  const [questionNumber, setQuestionNumber] = useState(0);
  const [btnOn, setBtnOn] = useState(false);
  
  //음성인식 : react-speech-toolkit
  //참고문서 : https://www.npmjs.com/package/react-speech-kit
  const [value, setValue] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
    },
  });

  // 결과 페이지 이동 함수
  function resultPage(){
    window.location.href = "/WorkList"
  }

  return(
    <div className={style.intro, style.fadein}>
      <HeaderComp/>
      {/* 안내문구 */}
      <div className={style.msg}>{loginUser.name}님, {state_work.question[questionNumber]} <p style={{fontSize:"15px", marginTop:"-15px"}}>ex) {state_work.explain[questionNumber]}</p></div>
      
      <div className={style.q_and_a}>
        <div className={style.explain}>💛 녹음버튼을 누른 채 말씀해주세요 💛</div>
        <input placeholder="직접 작성도 가능합니다"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className={style.answer_text}
        />

      </div>  
        <button type="button" className={style.speack_btn} onMouseDown={listen} onMouseUp={stop} data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Tooltip on bottom">
          녹음
        </button>
        
        {listening && <div>말씀이 끝나셨다면, 손을 떼주세요!</div>}


        <div className={style.step_btn}>

        {questionNumber>=1 && <button className={style.prev} onClick={()=>{
            setQuestionNumber(questionNumber-1);
            // input 비우기위해 value 초기화
            setValue("")
          }}>이전</button>}

          {/* 답변을 local storage에 저장할 것 */}
          <button className={style.next} onClick={()=>{
            // if(questionNumber==0){setValue(""); dispatch(getAddress_sido(value));}
            // else if(questionNumber==1){setValue(""); dispatch(getAddress_dong(value)); localStorage.setItem("address_dong", value);}
            // else if(questionNumber==2){setValue(""); dispatch(getSickness(value)); localStorage.setItem("sickness", value); GPT();}
            setQuestionNumber(questionNumber+1);
            if(questionNumber==2){window.location.href = "/WorkList"}
            if(questionNumber>=1){return setBtnOn(true)}
          }}>다음</button>
        </div>
        <FooterComp/>

    </div>

  )

}

export default WorkQuestion;