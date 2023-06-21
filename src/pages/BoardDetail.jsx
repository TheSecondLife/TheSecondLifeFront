import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeaderComp from './HeaderComp';
import Footer from './FooterComp';
import style from "../css/BoardDetail.module.css"

function BoardDetail() {
  
  let { id } = useParams();
  let [post, setPost] = useState({});

  useEffect(()=> {
    const url = "/api/post/" + id;
    axios.get(url)
    .then((result) => {
      console.log(result.data);
      setPost(result.data);
    })
    .catch((err) => {
      console.log(err)
    })
  },[])

  return (
    <>
      <div  style={{height: "53px"}}>
        <HeaderComp />
      </div>
      <div>뒤로가기</div>
      <div className={`${style.body}`}>
        <div className={`${style.profileWrap}`}>
            <div className={`${style.profileImg}`}><img src={`${post.profileImg}`} alt="" /></div>
            <div className={`${style.profileInfo}`}>
                <div>{post.userNickName} {paintGrade(post.userGrade)}</div>
                <div>{post.modifiedDate}</div>
            </div>
        <br />
        </div>
        <div className={`${style.title}`}>
          {post.title}
        </div>
        <div className={`${style.content}`}>
          {post.content}
        </div>
        <div className={`${style.commentWrap}`}>
          {/* {post.commentList.map((comment, i) =>{
            return <Comment comment={comment} key={i} ></Comment>
          })} */}
          
        </div>
       
      {/* {
        postList.map((post) => {
          return <BoardComp post={post} key={post.id}/>
        })
      } */}
      </div>
      <div style={{height: "51px"}}>
        <Footer />
      </div>
    </>
  ) 
}

function Comment(props){
  return (
    <>
    <div>
      {props.comment}
    </div>
    </>
  )
}
function paintGrade(grade){
  if(grade === "씨앗") return 
  if(grade === "떡잎") return 
  if(grade === "줄기") return 
  if(grade === "꽃") return 
  if(grade === "열매") return 
}

export default BoardDetail;