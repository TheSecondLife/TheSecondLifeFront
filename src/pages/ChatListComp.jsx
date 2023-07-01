import style from '../css/ChatList.module.css';
import { useNavigate } from 'react-router-dom';

function ChatListComp(props) {
  const navigate = useNavigate();
  // console.log(props.item)

  function chatStart() {
    localStorage.setItem("roomId", props.item.roomId);
    navigate("/chat/" + props.item.otherId + "/" + props.item.roomId);
    // navigate("/chat/" + props.item.otherId);
  }

  return(
    <>
      <div className={`${style.box}`} onClick={() => {chatStart(props.item.roomId)}}>
        <img className={`${style.profile}`} src={props.item.profileImg} />
        <div className={`${style.content}`}>
          <div className={`${style.box}`}>
            <p className={`${style.name}`}>{props.item.nickname}</p>
            <p className={`${style.date}`}>{sliceDate(props.item.lastChatTime)}</p>
          </div>
          <p className={`${style.content2}`}>{props.item.lastChat}</p>
        </div>
      </div>
    </>
  )

}
function sliceDate(data){
  let today = new Date();

    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    let dateString = year + '-' + month  + '-' + day;

    let regdate = '' + data;
    let result = "";
    if (regdate.substring(0, 10) === dateString) {
      result = regdate.substring(11,16);
    } else {
      result = regdate.substring(0, 10);
    }
    return result;
  }


export default ChatListComp;