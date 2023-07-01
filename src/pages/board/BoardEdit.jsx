import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import HeaderComp from '../HeaderComp';
import { IoIosArrowBack } from 'react-icons/io';
import Footer from '../FooterComp';
import { BsCameraFill } from 'react-icons/bs';
import style from "../../css/BoardDetail.module.css"
import axios from 'axios';
function BoardEdit() {
let { id } = useParams();
let navigate = useNavigate();
const [post, setPost] = useState({})
const [title, setTitle] = useState("")
const [category, setCategory] = useState("")
const [content, setContent] = useState("")
const [file, setFile] = useState(1);

useEffect(()=>{
    const url = "/api/post/" + id;
    axios.get(url)
    .then((result) => {
      setTitle(result.data.title);
      setPost(result.data);
      setCategory(result.data.category);
      setFile(result.data.img);
      setContent(result.data.content);
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

     <IoIosArrowBack onClick={()=>{navigate(-1)}} className={`${style.goBack}`} />

      <div className={`${style.body}`}>
        
        <div className={`${style.profileWrap}`}>
            <div onClick={editBoard}  className={`${style.addPost}`}>수정</div>
        <br />
        </div>
        <div className={`${style.writeTitle}`}>
          <input onChange={(e) => {setTitle(e.target.value)}} type="text" placeholder={post.title}/>

          <span className={style.selectCategory}>
                <select name="" id="" v-model="category" className={style.category}
                        onChange={e => {setCategory(e.target.value)}}
                >
                    <option value="JOB">직업</option>
                    <option value="CULTURE">문화생활</option>
                    <option value="HEALTH">건강</option>
                    <option value="COMMUNICATION">소통</option>
                </select>
            </span>
        </div>
        <hr />
        <textarea onChange={(e) => {setContent(e.target.value)}} className={`${style.writeContent}`} name="" id="" cols="30"  placeholder={post.content}></textarea>
        <div className={`${style.content}`}>
          {
            post.img === "1"?
            "" :
            <img style={{width : "70%", borderRadius : "7px"}} src={post.img} alt="" />
          }
        </div>
        {/* <img style={{width : "50%", borderRadius : "7px"}} src={post.img} alt="" /> */}
       <div className={`${style.btnWrap}`}>
        <input onChange={upload} className={style.myInput} id='myInput' type="file" />
        <BsCameraFill  onClick={uploadPicture} className={`${style.addImageBtn}`} size={18} color='#7e4bc0'></BsCameraFill>
        {/* <span>+</span> */}
       </div>

      </div >
      <div style={{height: "51px"}}>
        <Footer />
      </div>
    </>
  )
  function editBoard(){
    const url = "/api/post/update/" + id;
    let data = {
      title : title,
      content : content,
      img : file,
      category : category,
    }
    const config = {"Content-Type": 'multipart/form-data'};

    axios.put(url, data, config)
    .then(() => {
      navigate("/board");
      // setPost(result.data);
    })
    .catch((err) => {
      console.log(err)
    })
  }
  function uploadPicture(){
    let myInput = document.getElementById("myInput");
    myInput.click();
  }
  
  function upload(e) {
    let file = e.target.files[0];
    setFile(file);
    console.log(file);

  }
}

export default BoardEdit
