import React, { useState , useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getAddress, getWork, changeStatement} from "../../store/WorkSlice.jsx";

import style from "../../css/WorkQuestion.module.css";

import axios from 'axios';

import SpeechRecognition,{ useSpeechRecognition } from "react-speech-recognition";


import HeaderComp from "../HeaderComp";
import FooterComp from "../FooterComp";
import {Modal} from "./Modal";
import Loading from "../Loading";

const WorkQuestion = () => {

  // redux 불러오기
  let state_work = useSelector((state) => state.work);
  let dispatch = useDispatch();

  // 로그인 유저 정보 가져오기
  let loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

  const [questionNumber, setQuestionNumber] = useState(0);
  const [btnOn, setBtnOn] = useState(false);
  const [loading, setLoading] = useState(false);
  
  //음성인식 : react-speech-toolkit
  //참고문서 : https://www.npmjs.com/package/react-speech-kit
  const [value, setValue] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(()=>{
    SpeechRecognition.startListening();
    if(!listening){
      setValue(transcript);
      resetTranscript();
    }
  },[listening])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }


  // 결과 페이지 이동 함수
  function resultPage(){
    window.location.href = "/WorkList"
  }



  return(
    <div className={style.intro, style.fadein}>
      <HeaderComp/>
      
      {loading ? <Loading/> : null}

      {/* 안내문구 */}
      <div className={style.msg}>{loginUser.name}님, {state_work.question[questionNumber]} <p style={{fontSize:"15px", marginTop:"-15px"}}>{state_work.explain[questionNumber]}</p></div>
      
      {/* 어디사는지 질문  */}
      <div className={style.q_and_a}>
        <div className={style.explain}>💛 {state_work.explain2[questionNumber]} 💛</div>
        
        {
          questionNumber==0 && 
          <input placeholder="직접 작성도 가능합니다"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className={style.answer_text}
          />
        }

        {/* work 질문 : list */}

        {
          questionNumber>=1 && <Modal data={questionNumber} />
        }


      </div>  


        {/* 버튼들 */}
        <p>녹음중 : {listening ?'on' : 'off'}</p>
        <button onClick={SpeechRecognition.startListening} className={style.speack_btn} >start</button>
        <button onClick={SpeechRecognition.stopListening} className={style.speack_btn}>stop</button>

        
        {listening && <div>말씀이 끝나셨다면, 손을 떼주세요!</div>}


        <div className={style.step_btn}>

        {questionNumber>=1 && <button className={style.prev} onClick={()=>{
            setQuestionNumber(questionNumber-1);
            // input 비우기위해 value 초기화
            setValue("")
            resetTranscript();
          }}>이전</button>}

          
          <button className={style.next} onClick={()=>{
            dispatch(changeStatement("여기를 눌러주세요"));
            if(questionNumber==0){setValue(""); dispatch(getAddress(value));}
            setQuestionNumber(questionNumber+1);
            if(questionNumber==3){setLoading(true); window.location.href = "/workList"}
            if(questionNumber>=1){return setBtnOn(true)}
            resetTranscript();
          }}>다음</button>
        </div>
        <FooterComp/>

    </div>

  )

}

export default WorkQuestion;