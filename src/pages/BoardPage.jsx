import HeaderComp from './HeaderComp';
import Footer from './FooterComp';


function BoardPage() {
  return(
    <>
      <div style={{height: "53px"}}>
        <HeaderComp />
      </div>
      <div>
        게시판
      </div>
      <div style={{height: "51px"}}>
        <Footer />
      </div>
    </>
  )
}

export default BoardPage;