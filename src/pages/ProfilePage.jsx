import HeaderComp from './HeaderComp';
import Footer from './FooterComp';


function ProfilePage() {
  return(
    <>
      <div style={{height: "53px"}}>
        <HeaderComp />
      </div>
      <div>
        프로필 수정
      </div>
      <div style={{height: "51px"}}>
        <Footer />
      </div>
    </>
  )
}

export default ProfilePage;