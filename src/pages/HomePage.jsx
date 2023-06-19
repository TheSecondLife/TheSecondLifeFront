import HeaderComp from './HeaderComp';
import Footer from './FooterComp';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function HomePage() {

  let navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("navState", 0);
  }, [])

  return (
    <>
      <div style={{height: "53px"}}>
        <HeaderComp />
      </div>
      <div>
        <button onClick={() => navigate("/job") }>취업</button>
        <button onClick={() => navigate("/culture") }>문화</button>
        <button onClick={() => navigate("/HealthList") }>건강</button>
        <button onClick={() => navigate("/board") }>소통</button>
      </div>
      <div style={{height: "51px"}}>
        <Footer />
      </div>
    </>
  )
}



export default HomePage;
