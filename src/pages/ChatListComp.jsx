import style from '../css/ChatList.module.css';
import { useNavigate } from 'react-router-dom';

function ChatListComp(props) {
  const navigate = useNavigate();
  // console.log(props.item)

  function chatStart(roomId) {
    localStorage.setItem("roomId", roomId);
    navigate("/chat/" + roomId);
  }

  return(
    <>
      <div className={`${style.box}`} onClick={() => {chatStart(props.item.roomId)}}>
        <img className={`${style.profile}`} src={props.item.profileImg} />
        <div className={`${style.content}`}>
          <div className={`${style.box}`}>
            <p className={`${style.name}`}>{props.item.nickname}</p>
            <p className={`${style.date}`}>{props.item.lastChatTime}</p>
          </div>
          <p className={`${style.content2}`}>{props.item.lastChat}</p>
        </div>
      </div>
    </>
  )

}


export default ChatListComp;