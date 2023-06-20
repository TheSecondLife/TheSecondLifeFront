import HeaderComp from './HeaderComp';
import Footer from './FooterComp';


function JobPage() {
  return(
    <>
      <div style={{height: "53px"}}>
        <HeaderComp />
      </div>
      <div>
        일자리 정보
      </div>
      <div style={{height: "51px"}}>
        <Footer />
      </div>
    </>
  )
}

export default JobPage;