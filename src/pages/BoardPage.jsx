import HeaderComp from './HeaderComp';
import Footer from './FooterComp';
import { useEffect, useState, useRef } from 'react';
import BoardComp from './BoardComp';
import axios from 'axios';
import style from '../css/BoardComp.module.css';
import { BiMessageSquareAdd } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

function BoardPage() {
  const navigate = useNavigate();
  //postList의 내용을 리스팅해줌.
  // => postList를 바꿔주면 됨!
  // let postCopy;
  let [postList, setPostList] = useState([]);
  let [originalPosts, setOriginalPostList] = useState([]);
  let postRef = useRef([]);

  useEffect(() => {
    localStorage.setItem("navState", 2);
    const url = "/api/post/list";
    axios.get(url)
    .then((result) => {
      // const copy = [...postList, ...result.data];
      const copy = result.data.reverse();
      setPostList(copy);
      setOriginalPostList(copy);
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  let categoryList = ["전체","인기글", "취업", "문화", "건강", "소통"];
  let convertedCategoryList = ["", "", "JOB", "CULTURE", "HEALTH", "COMMUNICATION"];
  return(
    <div>
      <div  style={{height: "53px"}}>
        <HeaderComp />
      </div>
      <div className={`${style.body}`}>
      
      <div className={`${style.categoryList}`}>
        {
          categoryList.map((category, index) => {
            return <CategoryItem item={category} key={index} itemKey={index}/>
          })
        }
      </div>
      {
        postList.map((post) => {
          return <BoardComp post={post} key={post.id}/>
        })
      }
      </div>
      <BiMessageSquareAdd onClick={()=>{navigate("/boardCreate")}} color='#7d578d'  className={`${style.addPost}`}/>
      {/* <span className={`${style.addPost}`}>+</span> */}
      <div style={{height: "51px"}}>
        <Footer />
      </div>
    </div>
  )

  function CategoryItem(props) {
    return(
      <div className={`${style.item}`} onClick={() => {
        showSelectCategory(props.item);
      }}>
        {props.item}
      </div>
    )
  }

function showSelectCategory(item) {
  console.log(originalPosts);
  let posts = originalPosts;
    if(item === "인기글"){

    } else if (item === "전체"){
      setPostList(posts);
    } else {
      let idx = categoryList.indexOf(item);
      let selectPost = posts.filter((post)=>post.category === convertedCategoryList[idx]);
      setPostList(selectPost);
    }
  }
}

export default BoardPage;