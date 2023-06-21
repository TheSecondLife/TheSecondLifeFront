import { useEffect, useState } from 'react'
import style from '../css/Footer.module.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Footer () {

  let [profileImg, setProfileImg] = useState("icon/profile.png");
  let [state, setState] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("loginUser")).profileImg;
    setProfileImg(user);
    let navState = localStorage.getItem("navState")
    if (navState === null) {
      setState(0)
      localStorage.setItem("navState", state);
    } else {
      setState(navState)
    }
  }, [])

  return(
    <>
      <div className={`${style.footer}`}>
        {
          state == 0 ? 
          <img className={`${style.icon}`} src='https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/secondlife/mainselect.png' onClick={() => selectIcon(0)}></img>
          :
          <img className={`${style.icon}`} src='https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/secondlife/main.png' onClick={() => selectIcon(0)}></img>
        }
        {
          state == 1 ?
          <img className={`${style.icon}`} src='https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/secondlife/chatselect.png' onClick={() => selectIcon(1)}></img>
          :
          <img className={`${style.icon}`} src='https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/secondlife/chat.png' onClick={() => selectIcon(1)}></img>
        }
        {
          state == 2 ?
          <img className={`${style.icon}`} src='https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/secondlife/boardselect.png' onClick={() => selectIcon(2)}></img>
          :
          <img className={`${style.icon}`} src='https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/secondlife/board.png' onClick={() => selectIcon(2)}></img>
        }
        <img className={`${style.profile}`} src={`${profileImg}`} onClick={() => selectIcon(3)}></img>
      </div>
    </>
  )

  function selectIcon(index) {
    setState(index)
    localStorage.setItem("navState", index);
    let navMenu = ["/home", "/chat", "/board", "/profile"];
    navigate(navMenu[index]);
  }
}


export default Footer