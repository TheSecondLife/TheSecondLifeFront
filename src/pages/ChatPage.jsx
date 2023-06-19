import HeaderComp from './HeaderComp';
import Footer from './FooterComp';


function ChatPage() {
  return(
    <>
      <div style={{height: "53px"}}>
        <HeaderComp />
      </div>
      <div>
        채팅
      </div>
      <div style={{height: "51px"}}>
        <Footer />
      </div>
    </>
  )
}

export default ChatPage;