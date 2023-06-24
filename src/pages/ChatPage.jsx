import HeaderComp from './HeaderComp';
import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from "../css/ChatPage.module.css"

// redux
import { useSelector, useDispatch } from 'react-redux';
import {getChatList} from "../store/chatSlice";

function ChatPage() {

  let state_chat = useSelector((state)=> state.chat);
  let dispatch = useDispatch();

  const navigate = useNavigate();

  // let [chatList, setChatList] = useState([]);
  let [chat, setChat] = useState('');
  let [otherName, setOtherName] = useState('');
  let [userId, setUserId] = useState(1);

  let [name, setName] = useState('');
  const profileImg = JSON.parse(sessionStorage.getItem("loginUser")).profileImg;

  const { roomId } = useParams();
  const { otherId } = useParams();

  const client = useRef({});

  // 스크롤 최하단 위치 
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior : 'smooth'});
  }, [state_chat.chatList])


  function connect() {
    console.log(4);
    client.current = new StompJs.Client({
      brokerURL: process.env.REACT_APP_WS,
      onConnect: () => {
        console.log('success');
        subscribe();
        console.log(7);
      },
    });
    client.current.activate();
  };

  function publish(chat) {
    console.log(8);
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
        chat: chat,
      }),
    });

    loadData(); //또 데이터 불러와 
    setChat(''); //이게 변하면서 전체적으로 새롭게 대화 추가 후 재렌더링됨
  };

  function subscribe() {
    console.log(5);
    client.current.subscribe('/sub/chat/' + roomId, (body) => {
      console.log(6);
      const json_body = JSON.parse(body.body);
      const message = json_body;

      // 이게 랜더링 이슈로인해서 ㅜㅜㅜㅜㅜㅜㅜㅜㅜ
      // console.log(message);
      // dispatch(getChatList(message)); //새로운 메세지 추가하여 새롭게 리스트 배치 
      // console.log(`state_chat.chatList : ${state_chat.chatList}`);
      // setChat('');
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



  const loadData = async () => {
    console.log(2);
    let userId = JSON.parse(sessionStorage.getItem("loginUser")).id; //로그인 유저 가져오기 

    const url = "/api/chat"
    const data = {
      userA: userId,
      userB: otherId
    }
    const config = {"Content-Type": 'application/json'}; //데이터 헤더 json 형식 전송 
    
    let result_2 = await axios.post(url, data, config)
    .then((result) => {
      // dispatch(getChatList(result.data)); //이거만 하면 소용 없음 
      return result;
    })

    setOtherName(result_2.data.talkUserName);
    dispatch(getChatList(result_2.data.chatList));
  
    return () => {
      localStorage.removeItem("roomId")
      disconnect();
    }
  }

  useEffect(() => {
    console.log(1);
    loadData();
    console.log(3);
    connect();
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
       
            state_chat.chatList[0] && state_chat.chatList.map((item, index) => {
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
    </>
  )
}

export default ChatPage;