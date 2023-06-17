import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "../css/Detail.module.css";

function Detail() {
    let {id} = useParams();
    let user = useSelector((state) => state.user);
    let [board, setBoard] = useState({});
    function setDummyBoard(){
        setBoard({
        title : "제목1",
        category : "건강",
        content : "내용1",
        createdDate : "2023-06-17",
        commentList: [
            {
              "id": 1,
              "content": "좋습니다",
              "createdDate": "2023-06-08T00:37:11",
              "modifiedDate": "2023-06-09T00:37:11",
              "userId": 2,
              "userNickName": "daen",
              "userProfileImg": "https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/de45b98d-980f-4cd4-b9ae-405e2b76b3a9-nara_1.jpeg",
              "userGrade": "씨앗"
            },
            {
              "id": 2,
              "content": "최고입니다",
              "createdDate": "2023-06-08T00:39:11",
              "modifiedDate": "2023-06-09T00:39:11",
              "userId": 3,
              "userNickName": "tksgk",
              "userProfileImg": "https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/57b3f1c6-057b-4170-83aa-5997a0b51ae9-jyj.png",
              "userGrade": "씨앗"
            },
        ]
        });
    }

    function modifyBoard(){

    }
    useEffect(() => {
        setDummyBoard();

        // const url = "http://localhost:8080/api/";
        // axios.get(url+"post/"+id)
        // .then((result) => {
        //   setBoard(result.data);
        // })
        // .catch((err) => {
        //   console.log(err)
        // })
      },[])

  return (
    <div className='container'>

    <table className='table'>
            <tbody>
                <tr><img className='mainImg' src="https://www.next-t.co.kr/public/uploads/7b7f7e2138e29e598cd0cdf2c85ea08d.jpg" alt="" /></tr>
                <tr className='userWrap'>
                    <img src="https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/de45b98d-980f-4cd4-b9ae-405e2b76b3a9-nara_1.jpeg" alt="" />
                    
                    
                </tr>
                <tr>
                <td>{user.name}  🌱</td>
                </tr>
                <tr className='titleWrap'>
                    <td className='selectCategory'>{board.category} | {board.title} | {board.createdDate}</td>
                </tr>
                <tr>
                    <td className='inputContent'>{board.content}
                    <br />
                    <br />
                    </td>
                </tr>
                {board && <tr>
                    <td>{board.commentList[0].userNickName} 🌱 | {board.commentList[0].content} | {board.commentList[0].createdDate}</td>
                </tr>}
            </tbody>
    </table>
    <button className='btn btn-primary my-3'
        onClick={modifyBoard}
    >수정하기</button>
    </div>
  )
}

export default Detail