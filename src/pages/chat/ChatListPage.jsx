import HeaderComp from '../HeaderComp';
import Footer from '../FooterComp';
import { useEffect, useState } from 'react';
import ChatListComp from './ChatListComp';
import axios from 'axios';

function ChatList() {

  let [chatList, setChetList] = useState([]);

  useEffect(() => {
    let userId = JSON.parse(sessionStorage.getItem("loginUser")).id;
    console.log(userId)
    const url = process.env.REACT_APP_SERVER + "/api/chat/" + userId;
    axios.get(url)
    .then((result) => {
      setChetList(result.data);
    })
    .catch((err) => {
      console.log(err)
    })
  },[])

  const styleObj = {
		textAlign: "left",
    paddingLeft: "3%",
    fontWeight:"bolder"
	}

  return(
    <>
      <div style={{height: "53px"}}>
        <HeaderComp />
      </div>
      <h4 style={styleObj}>대화</h4>
      {
        chatList.map((item, index) => {
          return <ChatListComp item={item} key={index}/>
        })
      }
        
      <div style={{height: "51px"}}>
        <Footer />
      </div>
    </>
  )

}


export default ChatList