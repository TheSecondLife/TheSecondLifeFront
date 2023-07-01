import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderComp from '../HeaderComp';
import Footer from '../FooterComp';
import style from "../../css/BoardDetail.module.css"
import { IoIosArrowBack } from "react-icons/io";
import { BsCameraFill, BsFillTrash3Fill } from "react-icons/bs";
import { useDispatch } from 'react-redux';


function Create() {

    //변수 바구니
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("JOB")
    const [content, setContent] = useState("")
    const [file, setFile] = useState(1);
    const [tempFile, setTempFile] = useState("https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/383e4119-bcee-4aa9-83f4-eef677e23fd7-profile.png");
    //dispatch
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    let user = JSON.parse(sessionStorage.getItem("loginUser"));
    function findUser(){
        return user;
    }
    useEffect(()=> {
    if(!findUser()){
        alert("로그인 후 이용해주세요");
        navigate(-1);
    }
    },[])

function createBoard(){
    // const url = process.env.REACT_APP_SERVER + "/"
    if (file == 1) {
      const data = {
        title : title,
        content : content,
        img : file,
        category : category
        }
        const config = {"Content-Type": 'multipart/form-data'};
        console.log(data);
        // axios.post(url+"post/regist/"+user.id, data, config)
        axios.post("/api/post/regist/"+user.id, data, config)
        .then(() => {
        navigate('/board')
        })
    } else {
      let data = new FormData();
      data.append("title", title);
      data.append("content", content)
      data.append("file", file);
      data.append("category", category);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      axios.post("/api/post/registimg/"+user.id, data, config)
      .then(() => {
        navigate('/board')
      })
    }

    setTimeout(()=>{
 
    }, 200)
  }

  return (
    <>
      <div  style={{height: "53px"}}>
        <HeaderComp />
      </div>

     <IoIosArrowBack onClick={()=>{navigate(-1)}} className={`${style.goBack}`} />

      <div className={`${style.body}`}>
        
        <div className={`${style.profileWrap}`}>
            <div onClick={createBoard}  className={`${style.addPost}`}>등록</div>
        <br />
        </div>
        <div className={`${style.writeTitle}`}>
          <input onChange={(e) => {setTitle(e.target.value)}} type="text" placeholder='제목을 입력하세요'/>

          <span className={style.selectCategory}>
                <select name="" id="" v-model="category" className={style.category}
                        onChange={e => {setCategory(e.target.value); console.log(category)}}
                >
                    <option value="JOB">직업</option>
                    <option value="CULTURE">문화생활</option>
                    <option value="HEALTH">건강</option>
                    <option value="COMMUNICATION">소통</option>
                </select>
            </span>
        </div>
        <hr />
        <textarea onChange={(e) => {setContent(e.target.value)}} className={`${style.writeContent}`} name="" id="" cols="30"  placeholder='내용을 입력하세요'></textarea>
        <div className={`${style.content}`}>
          
        </div>
        {/* <img style={{width : "50%", borderRadius : "7px"}} src={post.img} alt="" /> */}
       <div className={`${style.btnWrap}`}>
        <input onChange={upload} className={style.myInput} id='myInput' type="file" />
        <BsCameraFill  onClick={uploadPicture} className={`${style.addImageBtn}`} size={18} color='#7e4bc0'></BsCameraFill>
        {/* <span>+</span> */}
       </div>
       <img className={style.minsungImg} src={tempFile}></img>

      </div >
      <div style={{height: "51px"}}>
        <Footer />
      </div>
    </>
  ) 

  function uploadPicture(){
    let myInput = document.getElementById("myInput");
    myInput.click();
  }
  
  function upload(e) {
    let file = e.target.files[0];
    setFile(file);
    console.log(file);
    try {
      let url = URL.createObjectURL(file); 
      setTempFile(url);
    } catch (error) {
      console.log(error)
    }
  }
}



export default Create;