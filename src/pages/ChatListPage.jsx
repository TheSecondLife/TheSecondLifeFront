import HeaderComp from './HeaderComp';
import Footer from './FooterComp';
import { useEffect, useState } from 'react';
import ChatListComp from './ChatListComp';

function ChatList() {

  let [chatList, setChetList] = useState([
    {
      roomId: "1",
      profileImg: "https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/profile_default.jpg",
      nickname: "민성",
      lastChat: "ㅎㅎㅎ 매우 웃겨 ~~",
      lastChatTime: "2023-04-13 12:41:34",
    },
    {
      roomId: "1",
      profileImg: "https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/profile_default.jpg",
      nickname: "민성",
      lastChat: "ㅎㅎㅎ 매우 웃겨 ~~",
      lastChatTime: "2023-04-13 12:41:34",
    },
    {
      roomId: "1",
      profileImg: "https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/profile_default.jpg",
      nickname: "민성",
      lastChat: "ㅎㅎㅎ 매우 웃겨 ~~",
      lastChatTime: "2023-04-13 12:41:34",
    },
    {
      roomId: "1",
      profileImg: "https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/profile_default.jpg",
      nickname: "민성",
      lastChat: "ㅎㅎㅎ 매우 웃겨 ~~",
      lastChatTime: "2023-04-13 12:41:34",
    },
    {
      roomId: "1",
      profileImg: "https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/profile_default.jpg",
      nickname: "민성",
      lastChat: "ㅎㅎㅎ 매우 웃겨 ~~",
      lastChatTime: "2023-04-13 12:41:34",
    },
    {
      roomId: "1",
      profileImg: "https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/profile_default.jpg",
      nickname: "민성",
      lastChat: "ㅎㅎㅎ 매우 웃겨 ~~",
      lastChatTime: "2023-04-13 12:41:34",
    },
    {
      roomId: "1",
      profileImg: "https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/profile_default.jpg",
      nickname: "민성",
      lastChat: "ㅎㅎㅎ 매우 웃겨 ~~",
      lastChatTime: "2023-04-13 12:41:34",
    },
    {
      roomId: "1",
      profileImg: "https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/profile_default.jpg",
      nickname: "민성",
      lastChat: "ㅎㅎㅎ 매우 웃겨 ~~",
      lastChatTime: "2023-04-13 12:41:34",
    },
    {
      roomId: "1",
      profileImg: "https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/profile_default.jpg",
      nickname: "민성",
      lastChat: "ㅎㅎㅎ 매우 웃겨 ~~",
      lastChatTime: "2023-04-13 12:41:34",
    },
    {
      roomId: "1",
      profileImg: "https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/profile_default.jpg",
      nickname: "민성",
      lastChat: "ㅎㅎㅎ 매우 웃겨 ~~",
      lastChatTime: "2023-04-13 12:41:34",
    },
    {
      roomId: "1",
      profileImg: "https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/profile_default.jpg",
      nickname: "민성",
      lastChat: "ㅎㅎㅎ 매우 웃겨 ~~",
      lastChatTime: "2023-04-13 12:41:34",
    },
    {
      roomId: "1",
      profileImg: "https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/profile_default.jpg",
      nickname: "민성",
      lastChat: "ㅎㅎㅎ 매우 웃겨 ~~",
      lastChatTime: "2023-04-13 12:41:34",
    },
    {
      roomId: "1",
      profileImg: "https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/profile_default.jpg",
      nickname: "민성",
      lastChat: "ㅎㅎㅎ 매우 웃겨 ~~",
      lastChatTime: "2023-04-13 12:41:34",
    },
    {
      roomId: "1",
      profileImg: "https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/profile_default.jpg",
      nickname: "민성",
      lastChat: "ㅎㅎㅎ 매우 웃겨 ~~",
      lastChatTime: "2023-04-13 12:41:34",
    },
    {
      roomId: "1",
      profileImg: "https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/profile_default.jpg",
      nickname: "민성",
      lastChat: "ㅎㅎㅎ 매우 웃겨 ~~",
      lastChatTime: "2023-04-13 12:41:34",
    },
    {
      roomId: "1",
      profileImg: "https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/profile_default.jpg",
      nickname: "민성",
      lastChat: "ㅎㅎㅎ 매우 웃겨 ~~",
      lastChatTime: "2023-04-13 12:41:34",
    },
  ]);

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