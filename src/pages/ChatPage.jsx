import HeaderComp from './HeaderComp';
import Footer from './FooterComp';
import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function ChatPage() {

  let [chatList, setChatList] = useState([]);
  let [chat, setChat] = useState('');
  let [name, setName] = useState('');

  const { otherId } = useParams();
  console.log(otherId)
  const roomId = 1
  // const apply_id = 1;
  const client = useRef({});

  function connect() {
    client.current = new StompJs.Client({
      brokerURL: 'ws://localhost:5000/ws',
      onConnect: () => {
        console.log('success');
        subscribe();
      },
    });
    client.current.activate();
  };

  function publish(chat) {
    if (!client.current.connected) return;

    client.current.publish({
      destination: '/pub/chat',
      body: JSON.stringify({
        channelId: roomId,
        userId: 1,
        nickname: name,
        profileImg: "",
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
    publish(chat);
  };

  function nameChange(event) {
    setName(event.target.value);
  }
  
  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);


  return(
    <>
      <div style={{height: "53px"}}>
        <HeaderComp />
      </div>
      <div>
        <h4>{roomId} 번 채팅방</h4>
        <div>
          이름설정 : {name}
          <InputGroup/>
          <InputGroup className="mb-3">
            <Form.Control placeholder="" type={'text'} onChange={nameChange} value={name} />
          </InputGroup>
        </div>
        <h2>채팅내역</h2>
        {
          chatList.map((item, index) => {
            return <div key={index}>{item.nickname} : {item.chat}</div>
          })
        }
        <br></br>
        <form onSubmit={(event) => handleSubmit(event, chat)}>
          <div>

          <InputGroup className="mb-3"  onSubmit={(event) => handleSubmit(event, chat)} >
            <Form.Control placeholder="" type={'text'} onChange={handleChange} value={chat} />
            <Button type={'submit'} variant="outline-secondary" id="button-addon2">
              전송
            </Button>
          </InputGroup>
          </div>
        </form>
      </div>
      <div style={{height: "51px"}}>
        <Footer />
      </div>
    </>
  )
}

export default ChatPage;