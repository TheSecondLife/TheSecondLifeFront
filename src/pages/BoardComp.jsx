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
        <div className={`${style.category}`}>{post.category}</div>
        <div className={`${style.postTitle}`}>{post.title}</div>
        <div className={`${style.postContent}`}>{post.content}</div>
        <div className={`${style.postDate}`}>{post.createdDate}</div>
      </div>
    </>
  )

  function postDetail(id) {
    navigate(`${id}`)
  }
}


export default BoardComp;