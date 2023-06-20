import HeaderComp from './HeaderComp';
import Footer from './FooterComp';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import style from "../css/Home.module.css";

function HomePage() {

  // local storage
  let loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

  let navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("navState", 0);
  }, [])

  return (
    <>
      <div style={{height: "53px"}}>
        <HeaderComp />
      </div>

      {/* 안내문구 */}
      <div className={style.msg}>{loginUser.name}님, 어떤 서비스를 원하세요?</div>

      <div className={style.selectBtn}>
        <div className={style.lineOne}>
          <button onClick={() => navigate("/job") } className={style.workBtn}><div className={style.backText}><b className={style.title}>취업</b></div></button>
          <button onClick={() => navigate("/culture") } className={style.exerciseBtn}><div className={style.backText}><b className={style.title}>문화</b></div></button>
        </div>

        <div className={style.lineTwo}>
          <button onClick={() => navigate("/HealthQuestion") } className={style.healthBtn}><div className={style.backText}><b className={style.title}>건강</b></div></button>
          <button onClick={() => navigate("/board") } className={style.communicationBtn}><div className={style.backText}><b className={style.title}>소통</b></div></button>
        </div>
      </div>

      <div style={{height: "51px"}}>
        <Footer />
      </div>
    </>
  )
}



export default HomePage;
