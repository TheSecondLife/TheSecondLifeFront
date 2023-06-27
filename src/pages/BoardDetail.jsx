import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderComp from './HeaderComp';
import Footer from './FooterComp';
import style from "../css/BoardDetail.module.css"
import {BsSend, BsTrash3} from 'react-icons/bs';
import {VscBookmark} from "react-icons/vsc";
import { IoIosArrowBack } from "react-icons/io";
import { GrEdit } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";

let toggleNickname;

function BoardDetail() {
  const navigate = useNavigate();
  let { id } = useParams();
  let [post, setPost] = useState({});
  let[commentList, setCommentList] = useState([]); 
  let[comment, setComment] = useState(""); 
  

  let user = JSON.parse(sessionStorage.getItem("loginUser"));
      //해당 게시글이 로그인유저가 쓴 글인지
  let isUser = post.userId === user.id;
  

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
  },[comment])

  function createComment(){
    const data = {
    content : comment
    };
    const config = {"Content-Type": 'application/json'};
    axios.post("/api/comment/regist/"+user.id+"/"+id, data, config)
    .then(() => {
      // let commentsCopy= [...commentList, ...]
      // navigate(0);
    }).catch((err)=>{
      console.log(err);
    })
  }

  return (
    <>
      <div  style={{height: "53px"}}>
        <HeaderComp />
      </div>

     <IoIosArrowBack onClick={()=>{navigate(-1)}} className={`${style.goBack}`} />
      <div className={`${style.body}`}>
        <div className={`${style.profileWrap}`}>
        {/* modal-dialog modal-sm" */}
          {/* 프로필 사진 */}
            <div className={`${style.profileImg}`}>
              <button type="button" class="btn btn-primary" id='profileBtn' className={style.profileBtn} data-bs-toggle="modal" data-bs-target="#chatBtn">demo
              </button>
              <div class="modal fade" id="chatBtn" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-sm modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-body">
                    {post.userNickName}님과 채팅을 시작하시겠습니까?
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                    <button type="button" className={style.startChatBtn} class="btn btn-primary" >채팅 시작</button>
                  </div>
                </div>
              </div>
            </div>
              <img onClick={openToggle} className={`${style.img}`} src={`${post.profileImg}`} alt="" />
            </div>
            <div className={`${style.profileInfo}`}>
                <div>{post.userNickName} {paintGrade(post.grade, post)}</div>
                <div>{sliceDate(post.modifiedDate)}</div>
            </div>
            {isUser? 
            <BsTrash3 onClick={deletePost} className={style.trashcan}></BsTrash3>
            : ""}
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
            return <Comment comment={comment} userId={user.id} key={i} ></Comment>
            
          })}

          
        </div>
        {/* 댓글 입력창 */}
       <div className={`${style.inputComment}`}>
        <input onKeyUp={enterKey} onChange={(e)=>{setComment(e.target.value)}} type="text" placeholder='댓글을 입력해주세요' value={comment} />
        <BsSend onClick={createComment} className={`${style.sendBtn}`} size={18} color='white' />
        {/* <span>+</span> */}
       </div>

      </div >
      <div style={{height: "51px"}}>
        <Footer />
      </div>
    </>
  ) 
  function enterKey(e){
    if(e.key == "Enter"){
      createComment();
      setTimeout(()=>{
        setComment("");

      },100)
    }
  }
  function openToggle(){
    document.querySelector("#profileBtn").click();
    console.log(post.userId);
  }

  function deletePost(){
    //백한테 이거 지워달라고 하기!
    const url = `/api/post/delete/${post.id}`;
    axios.delete(url)
    .then((result) => {
      navigate("/board");
      alert("게시글이 삭제되었습니다.");
    })
    .catch((err) => {
      console.log(err)
    })
  }
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

  function Comment({comment}){
    let navigate = useNavigate();
    let[commentId, setCommentId] = useState(0); 
    let[commentUserNickName, setcommentUserNickName] = useState(""); 
    let user = JSON.parse(sessionStorage.getItem("loginUser"));
    //해당 게시글이 로그인유저가 쓴 글인지
    let isCommentUser = comment.userId === user.id;
    // nickname = commentUserNickName;

  return (
    <>
    <div className={`${style.line}`}>
      <div className={`${style.profileWrap}`}>
        {/* profile img */}
        <img onClick={()=>{openCommentToggle(comment.userId, comment.userNickName)}} className={`${style.commentProfileImg}`} src={comment.userProfileImg} alt="" />
        <div className={`${style.commentProfileInfo}` }>
            <div>{comment.userNickName} {paintGrade(comment.userGrade)}</div>
            <div style={{fontSize: "11px", marginLeft : "-7px" }} >{sliceDate(comment.modifiedDate)}</div>
        </div>
        <div className={`${style.commentContent}`}>{comment.content}</div>
        {isCommentUser? 
        <>
        < GrEdit className={`${style.commentUpdate}`} />
        < AiOutlineDelete onClick={() =>{deleteComment(comment.id)}} className={`${style.commentDelete}`}/>
        </>
        : ""}
      </div>
    </div>

          <button type="button" class="btn btn-primary" id="commentToggleBtn" className={style.profileBtn} data-bs-toggle="modal" data-bs-target="#commentChatBtn">demo
              </button>
              <div class="modal fade" id="commentChatBtn" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-sm modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-body">
                    {commentUserNickName}님과 채팅을 시작하시겠습니까?
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                    <button type="button" class="btn btn-primary" className={style.commentStartChatBtn} >채팅 시작</button>
                  </div>
                </div>
              </div>
            </div>
    </>
    
  )
  function deleteComment(id){
    let url = `/api/comment/delete/${id}`
    axios.delete(url)
    .then((result) => {
      navigate(0);
      alert("댓글이 삭제되었습니다.");
    })
    .catch((err) => {
      console.log(err)
    })
  }
  function openCommentToggle(userId, userNickName){
    setCommentId(userId);
    setcommentUserNickName(userNickName);

    setTimeout(()=>{
      document.querySelector(`#commentToggleBtn`).click();
    },100)

  }
  } 
// function Comment({comment}){
//   return (
//     <>
//     <div className={`${style.line}`}>
//       <div className={`${style.profileWrap}`}>
//         {/* profile img */}
//         <button type="button" class="btn btn-primary" id={`profileBtn${comment.userId}`} className={style.profileBtn} data-bs-toggle="modal" data-bs-target={`#profileBtn${comment.userId}`}>demo
//               </button>
//               <div class="modal fade" id={`profileBtn${comment.userId}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//               <div class="modal-dialog modal-sm modal-dialog-centered">
//                 <div class="modal-content">
//                   <div class="modal-body">
//                     {comment.userNickName}님과 채팅을 시작하시겠습니까?
//                   </div>
//                   <div class="modal-footer">
//                     <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
//                     <button type="button" className={style.startChatBtn} class="btn btn-primary">채팅 시작</button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//         <img onClick={()=>{openCommentToggle(comment.userId)}} className={`${style.commentProfileImg}`} src={comment.userProfileImg} alt="" />
//         <div className={`${style.commentProfileInfo}` }>
//             <div>{comment.userNickName} {paintGrade(comment.userGrade)}</div>
//             <div style={{fontSize: "11px", marginLeft : "-3px" }} >{sliceDate(comment.modifiedDate)}</div>
//         </div>
//         <div className={`${style.commentContent}`}>{comment.content}</div>
//       </div>
//     </div>
//     </>
//   )
//   function openCommentToggle(userId){
//     console.log(userId);
//     document.querySelector(`#profileBtn${userId}`).click();
//   }

function paintGrade(grade){
  if(grade === "씨앗") return "🌱";
  if(grade === "떡잎") return "🌿";
  if(grade === "줄기") return "🪴";
  if(grade === "꽃") return  "🌸";
  if(grade === "열매") return  "🍎";
}

export default BoardDetail;