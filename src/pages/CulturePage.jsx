import HeaderComp from './HeaderComp';
import Footer from './FooterComp';


function CulturePage() {
  return(
    <>
      <div style={{height: "53px"}}>
        <HeaderComp />
      </div>
      <div>
        문화 정보
      </div>
      <div style={{height: "51px"}}>
        <Footer />
      </div>
    </>
  )
}

export default CulturePage;