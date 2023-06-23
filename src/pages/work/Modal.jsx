import React, { useState , useEffect} from 'react';
import styled from "styled-components";
import style from "../../css/Modal.module.css";
import { useSelector, useDispatch } from 'react-redux';
import {setDepth_data, setDepth1, setDepth2, setDepth3, changeStatement} from "../../store/WorkSlice.jsx";


export const ModalContainer = styled.div`
  // Modal을 구현하는데 전체적으로 필요한 CSS를 구현
  display : flex;
  justify-content : center;
  align-items : center;
  height : 100%;
`;

export const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1; //위치지정 요소
  position: fixed;
  display : flex;
  justify-content : center;
  align-items : center;
  background-color: rgba(0,0,0,0.4);
  border-radius: 10px;
  top : 0;
  left : 0;
  right : 0;
  bottom : 0;
`;

export const ModalBtn = styled.button`
  background-color: white;
  text-decoration: none;
  border: 1px double black;
  padding: 20px;
  color: grey;
  cursor: grab;
  width : 80%;
  height : 50px;
  margin-bottom : 5%;
  line-height :10px;
`;

export const ExitBtn = styled(ModalBtn) `
background-color : #a26ce9;
border-radius: 10px;
text-decoration: none;
margin: 10px;
margin-left:auto;
padding: 5px 10px;
width: 40px;
height: 40px;
display : flex;
justify-content : center;
align-items : center;
color : white;
border:none;
`;

export const ModalView = styled.div.attrs((props) => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있다.
  role: 'dialog',
}))`
  // Modal창 CSS를 구현합니다.
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  width: 80%;
  height: 70%;
  overflow: auto;
  background-color: #ffffff;
    >div.desc {
      margin: 50px;
      font-size: 15px;
      color: var(--coz-purple-600);
    }
`;



export const Modal = (props) => {
  // redux 불러오기
  let state_work = useSelector((state) => state.work);
  let dispatch = useDispatch();
  
  const [isOpen, setIsOpen] = useState(false);
  
  const openModalHandler1 = () => {
    let list = [];
    //depth 1 선택 
    if(props.data===1){
      state_work.work_info.map((one)=>{
        if(one.depth1!=" " && one.depth2==" " && one.depth3==" "){
          list.push({code:one.code, depth:one.depth1});
        }
      })
    }

    else if(props.data===2){
      for(var i=state_work.depth1_idx+1;i<state_work.work_info.length;i++){
        if(state_work.work_info[i].depth1!=" ") break;
        else if(state_work.work_info[i].depth3!=" ") continue;
        else{
          if(state_work.work_info[i].depth2==" ") continue; //빈 내용 스킵 
          list.push({code:state_work.work_info[i].code, depth:state_work.work_info[i].depth2});
        }
      }
    }

    else if(props.data===3){
      for(var i=state_work.depth2_idx+1;i<state_work.work_info.length;i++){
        if(state_work.work_info[i].depth1!=" ") break;
        else{
          if(state_work.work_info[i].depth3==" ") continue; //빈 내용 스킵 
          list.push({code:state_work.work_info[i].code, depth:state_work.work_info[i].depth3});
        }
      }
    }

    dispatch(setDepth_data(list));
    setIsOpen(true);
  };

  const openModalHandler2 = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ModalContainer>
        <ModalBtn onClick={openModalHandler1}
        // 클릭하면 Modal이 열린 상태(isOpen)를 boolean 타입으로 변경하는 메소드가 실행되어야 합니다. 
        > {state_work.click}
          {/* 조건부 렌더링을 활용해서 Modal이 열린 상태(isOpen이 true인 상태)일 때는 ModalBtn의 내부 텍스트가 'Opened!' 로 Modal이 닫힌 상태(isOpen이 false인 상태)일 때는 ModalBtn 의 내부 텍스트가 'Open Modal'이 되도록 구현 */}
        </ModalBtn>
        {/* 조건부 렌더링을 활용해서 Modal이 열린 상태(isOpen이 true인 상태)일 때만 모달창과 배경이 뜰 수 있게 구현 */}
        {isOpen ? 
        <ModalBackdrop onClick={openModalHandler2}>
          {/* //event 버블링을 막는 메소드  */}
            <ModalView onClick={(e) => e.stopPropagation()}>
              <ExitBtn onClick={openModalHandler2}>x</ExitBtn>
              <div className={style.msg}>원하시는 직업을 선택해주세요</div>
              <div className='desc'>
                {
                    state_work.depth_data && state_work.depth_data.map((one)=>{
                        return(
                            <div onClick={()=>{
                              if(props.data==1){dispatch(setDepth1(one.code)); openModalHandler2(); dispatch(changeStatement(one.depth))}
                              else if(props.data==2){dispatch(setDepth2(one.code)); openModalHandler2(); dispatch(changeStatement(one.depth))}
                              else if(props.data==3){dispatch(setDepth3(one.code)); openModalHandler2(); dispatch(changeStatement(one.depth))}
                            }} className={style.job_data}>{one.depth}</div>
                        );
                    })
                }
              </div>
            </ModalView>
          </ModalBackdrop>
          : null
        }
      </ModalContainer>
    </>
  );
};