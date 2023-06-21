import { useState } from 'react';
import style from '../css/BoardComp.module.css';
import { useNavigate } from 'react-router-dom';


function BoardComp(props) {
  
  let user = JSON.parse(sessionStorage.getItem("loginUser"))
  let [post, setPost] = useState(props.post)
  let navigate = useNavigate();

  return(
    <>
      <div className={`${style.postComp}`} onClick={() => {
        postDetail(post.id);
      }}>
        <div className={`${style.category}`}>{setCategory(post.category)}</div>
        <div className={`${style.postTitle}`}>{post.title}</div>
        <div className={`${style.postDate}`}>{sliceDate(post.createdDate)}</div>
        <div className={`${style.chatCnt}`}>
          <img className={`${style.chatIcon}`} src="icon/chat.png" alt="" />
          <span className={`${style.chatNum}`} >1</span>
        </div>
      </div>
    </>
  )
  function commentLength(comment){
    return comment.length;
  }
  function setCategory(category){
    if(category === "JOB") return "취업";
    if(category === "CULTURE") return "문화";
    if(category === "COMMUNICATION") return "소통";
    if(category === "HEALTH") return "건강";
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
        result = regdate.substring(11);
      } else {
        result = regdate.substring(0, 10);
      }
      return result;
  }

  function postDetail(id) {
    navigate(`${id}`)
  }
}


export default BoardComp;