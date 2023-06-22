import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderComp from './HeaderComp';
import Footer from './FooterComp';
import style from "../css/BoardDetail.module.css"
import {BsSend} from 'react-icons/bs';
import {VscBookmark} from "react-icons/vsc";
import { IoIosArrowBack } from "react-icons/io";

function BoardDetail() {

  const navigate = useNavigate();
  let { id } = useParams();
  let [post, setPost] = useState({});
  let[commentList, setCommentList] = useState([]); 

  useEffect(()=> {
    const url = "/api/post/" + id;
    axios.get(url)
    .then((result) => {
      console.log(result.data);
      setCommentList(result.data.commentList);
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

      {/* <span onClick={()=>{navigate(-1)}} ><IoIosArrowBack className={`${style.goBack}`} /></span> */}
     <IoIosArrowBack onClick={()=>{navigate(-1)}} className={`${style.goBack}`} />
      {/* <div onClick={()=>{navigate(-1)}} className={`${style.goBack}`}><IoIosArrowBack /></div> */}
      <div className={`${style.body}`}>
        <div className={`${style.profileWrap}`}>
            <div className={`${style.profileImg}`}><img className={`${style.img}`} src={`${post.profileImg}`} alt="" /></div>
            <div className={`${style.profileInfo}`}>
                <div>{post.userNickName} {paintGrade(post.grade, post)}</div>
                <div>{sliceDate(post.modifiedDate)}</div>
            </div>
            <VscBookmark className={`${style.bookmark}`} size={20} color=''/>
        <br />
        </div>
        <div className={`${style.title}`}>
          {post.title}
        </div>

        <div className={`${style.content}`}>
          {post.content}
        </div>
        <img style={{width : "50%", borderRadius : "7px"}} src={post.img} alt="" />
        <hr />
        <div className={`${style.commentWrap}`}>
          {commentList.map((comment, i) =>{
            return <Comment comment={comment} key={i} ></Comment>
            
          })}
          {commentList.map((comment, i) =>{
            return <Comment comment={comment} key={i} ></Comment>

          })}
          
        </div>
       <div className={`${style.inputComment}`}>
        <input type="text" placeholder='댓글을 입력해주세요' />
        <BsSend className={`${style.sendBtn}`} size={18} color='white' />
        {/* <span>+</span> */}
       </div>

      </div >
      <div style={{height: "51px"}}>
        <Footer />
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
      result = regdate.substring(11);
    } else {
      result = regdate.substring(0, 10);
    }
    return result;
}
function Comment({comment}){
  return (
    <>
    <div className={`${style.line}`}>
      <div className={`${style.profileWrap}`}>
        <img className={`${style.commentProfileImg}`} src={comment.userProfileImg} alt="" />
        <div className={`${style.commentProfileInfo}` }>
            <div>{comment.userNickName} {paintGrade(comment.userGrade)}</div>
            <div style={{fontSize: "11px", marginLeft : "-3px" }} >{sliceDate(comment.modifiedDate)}</div>
        </div>
        <div className={`${style.commentContent}`}>{comment.content}</div>
      </div>
    </div>
    </>
  )
}
function paintGrade(grade){
  console.log(grade);
  // console.log(post.commentList.length);
  if(grade === "씨앗") return "🌱";
  if(grade === "떡잎") return "🌿";
  if(grade === "줄기") return "🪴";
  if(grade === "꽃") return  "🌸";
  if(grade === "열매") return  "🍎";
}

export default BoardDetail;