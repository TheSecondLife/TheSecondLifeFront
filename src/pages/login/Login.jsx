import React, { useState , useEffect} from 'react';
import style from "../../css/Login.module.css";


const User = {
  id: 'id123@@@@',
  pw: 'pw123@@@@'
}

export default function Login(){

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [notAllow, setNotAllow] = useState(true);

  // 계정의 유효함을 저장 
  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);

  const handleId = (e) => {
    console.log(e.target.value);
    setId(e.target.value);
    const regex =
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

    // 이 아이디가 정규문자식에 통과된다면 유효한 아이디이다.
    if(regex.test(id)){
      setIdValid(true);
    }else{
      setIdValid(false);
    }
  }

  const handlePassword = (e) => {
    setPw(e.target.value);
    const regex =
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
      if (regex.test(e.target.value)) {
        setPwValid(true);
      } else {
        setPwValid(false);
      }
  }

  useEffect(() => {
    if(idValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [idValid, pwValid]);


  const onClickConfirmButton = () => {
    if(id === User.id && pw === User.pw) {
      alert('로그인에 성공했습니다.')
    } else {
      alert("등록되지 않은 회원입니다.");
    }
  }

  return(
    <div className={`${style.page}`}>
      <div style={{textAlign:'center', height:'70px', lineHeight: '70px'}}>Second Life LOGO</div>
      <div className={`${style.titleWrap}`}>
        아이디와 비밀번호를 <br/> 입력해주세요
      </div>

      <div className={`${style.contentWrap}`}>
        <div className={`${style.inputTitle}`} type="text">아이디</div>
        <div className={`${style.inputWrap}`}>
          <input value={id}
          onChange={handleId}
          className={`${style.input}`}></input>
        </div>

        {/* warning */}
        <div className={`${style.errorMessageWrap}`}>
          {
            //id!=undefined 없으면 에러! 
            !idValid && id!=undefined && id.length > 0 && (
              <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
            )
          }
          
        </div>

        <div style={{marginTop: "26px"}} className={`${style.inputTitle}`} type="password">비밀번호</div>
        <div className={`${style.inputWrap}`}>
          <input className={`${style.input}`}
          value={pw}
          onChange={handlePassword}></input>
        </div>

        {/* warning */}
        <div className={`${style.errorMessageWrap}`}>
        {!pwValid && pw!=undefined && pw.length > 0 && (
          //pw!=undefined 없으면 에러
          <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
        )}
        </div>
      </div>

      {/* 확인버튼 */}
      <div>
        <button className={`${style.bottomButton}`} disabled={notAllow} onClick={onClickConfirmButton}>로그인</button>
      </div>
    </div>
  );
  
}