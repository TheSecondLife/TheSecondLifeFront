import HeaderComp from './HeaderComp';
import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from "../css/ChatPage.module.css"
import { compose } from '@reduxjs/toolkit';

function ChatPage() {

  const navigate = useNavigate();

  let [chatList, setChatList] = useState([]);
  let [chat, setChat] = useState('');
  let [otherName, setOtherName] = useState('');
  let [userId, setUserId] = useState(1);
  let [name, setName] = useState('');
  const profileImg = JSON.parse(sessionStorage.getItem("loginUser")).profileImg;

  const { roomId } = useParams();
  const { otherId } = useParams();


  const client = useRef({});

  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior : 'smooth'});
  }, [chatList])


  function connect() {
    client.current = new StompJs.Client({
      brokerURL: process.env.REACT_APP_WS,
      onConnect: () => {
        console.log('success');
        subscribe();
      },
    });
    // console.log("connect")
    // console.log(roomId)
    client.current.activate();
  };

  function publish(chat) {
    if (!client.current.connected) {
      console.log(`no!!`);
      return;
    }
    client.current.publish({
      destination: '/pub/chat',
      body: JSON.stringify({
        roomId: roomId,
        userId: userId,
        nickname: name,
        profileImg: profileImg,
        content: chat,
      }),
    });
    setChat('');
  };

  function subscribe() {
    // console.log("subcribe")
    // console.log(roomId)
    client.current.subscribe('/sub/chat/' + roomId, (body) => {
      console.log(`json_body : ${body.body}`);
      const json_body = JSON.parse(body.body);
      
      const message = json_body;
      // console.log("여기!");
      console.log(message);

      // 이게 랜더링 이슈로인해서 ㅜㅜㅜㅜㅜㅜㅜㅜㅜ
      setChatList((_chat_list) => [
        ..._chat_list, message
      ]);
    });
  };

  function disconnect() {
    client.current.deactivate();
  };

  function handleChange(event) { // 채팅 입력 시 state에 값 설정
    setChat(event.target.value);
  };

  function handleSubmit(event, chat) { // 보내기 버튼 눌렀을 때 publish
    event.preventDefault();
    if (chat !== "") {
      publish(chat);
    }
  };

  function nameChange(event) {
    setName(event.target.value);
  }

  function idChange(event) {
    setUserId(event.target.value);
  }

  
  useEffect(() => {

    // url 접근 막기
    // let roomId2 = localStorage.getItem("roomId")
    // if (roomId2 == null) {
    //   navigate("/home")
    //   return
    // }

    let userId = JSON.parse(sessionStorage.getItem("loginUser")).id;

    const url = "/api/chat"
    const data = {
      userA: userId,
      userB: otherId
    }
    const config = {"Content-Type": 'application/json'};
    
    axios.post(url, data, config)
    .then((result) => {
      setOtherName(result.data.talkUserName);
      setChatList(result.data.chatList);
      // console.log(33)
      // console.log(chatList) 
    })
    .then(() => {
      // console.log(chatList)
      connect();

      // setUp(false);
    })

    return () => {
      localStorage.removeItem("roomId")
      disconnect();
    }
  }, []);



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
      <div className={style.chatHeader}>
          <img className={style.backImg} 
              src="https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/secondlife/back.png"
              onClick={() => { navigate(-1) }}
              />
          <h4 style={styleObj}>{otherName}님과의 대화</h4>
        </div>
      <div>
        <br></br>
        <br></br>
        {/* temp */}
        {/* <h4>chatRoom : {roomId}</h4> */}
        {/* <div>
          name : {name}
          <InputGroup/>
          <InputGroup className="mb-3">
            <Form.Control placeholder="" type={'text'} onChange={nameChange} value={name} />
          </InputGroup>
          userId : {userId}
          <InputGroup/>
          <InputGroup className="mb-3">
            <Form.Control placeholder="" type={'text'} onChange={idChange} value={userId} />
          </InputGroup>
        </div>
        <hr></hr> */}
        {/* temp */}

        {
          chatList.map((item, index) => {
            return (
              <div key={index}>
                {
                  userId == item.userId ? null
                  :                   
                  <div className={style.other}>
                    <img className={style.chatProfileImg} src={item.profileImg}/>
                    <p className={style.name}>{item.nickname}</p>
                  </div> 
                }
                <div className={
                  userId == item.userId ? style.right:style.left
                }>
                  {item.content}
                </div>

                <div ref={scrollRef}></div>


                {
                  userId == item.userId?
                  <div>
                    <br></br><br></br>
                  </div>
                  :
                  null
                }
              </div>
            )
          })
        }
        <br></br>
        <br></br>
        <br></br>
        <div className={style.messages}>
          <form className={style.send} onSubmit={(event) => handleSubmit(event, chat)}>
            <input className={style.input} placeholder="메시지를 입력하세요" type={'text'} onChange={handleChange} value={chat} />
            <button className={style.btn} type={'submit'}>
              <img src="https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/secondlife/send.png"
                className={style.sendImg}
              />
            </button>
          </form>
        </div>

      </div>
      {/* <div style={{height: "51px"}}>
        <Footer />
      </div> */}
    </>
  )
}

export default ChatPage;