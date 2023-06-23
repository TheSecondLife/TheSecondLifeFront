import HeaderComp from './HeaderComp';
import Footer from './FooterComp';
import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from "../css/ChatPage.module.css"

function ChatPage() {

  const navigate = useNavigate();

  let [chatList, setChatList] = useState([]);
  let [chat, setChat] = useState('');
  let [name, setName] = useState('');
  let [userId, setUserId] = useState(0);

  const { otherId } = useParams();

  const roomId = 1
  // const apply_id = 1;
  const client = useRef({});

  function connect() {
    client.current = new StompJs.Client({
      brokerURL: 'ws://localhost:8080/ws',
      onConnect: () => {
        console.log('success');
        subscribe();
      },
    });
    client.current.activate();
  };

  function publish(chat) {
    if (!client.current.connected) {
      return;
    }
    client.current.publish({
      destination: '/pub/chat',
      body: JSON.stringify({
        roomId: roomId,
        userId: userId,
        nickname: name,
        profileImg: "https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/profile_default.jpg",
        chat: chat,
      }),
    });

    setChat('');
  };

  function subscribe() {
    client.current.subscribe('/sub/chat/' + roomId, (body) => {
      const json_body = JSON.parse(body.body);
      const message = json_body;
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

    // let roomId = localStorage.getItem("roomId")
    // if (roomId == null) {
    //   navigate("/home")
    //   return
    // }

    let userId = JSON.parse(sessionStorage.getItem("loginUser")).id;
    setUserId(userId);
    


    const url = "/api/chat/" + roomId
    axios.get(url)
    .then((result) => {
      setChatList(result.data);
      connect();
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
          <img className={style.backImg} src="https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/secondlife/back.png"/>
          <h4 style={styleObj}>대화</h4>
        </div>
        
      <div>
        {/* temp */}
        <h4>chatRoom : {roomId}</h4>
        <div>
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
        <hr></hr>
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
                  {item.chat}
                </div>
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