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
    
    //페이지 create 시 get으로 해당 아이디의 게시글 가져오기
    useEffect(() => {
        const url = "http://localhost:8080/api/";
        axios.get(url+"post/"+id)
        .then((result) => {
          setBoard(result.data);
        })
        .catch((err) => {
          console.log(err)
        })
      },[])



  return (
    <div className='container'>
        <br/>
        <h2>The SecondLife</h2>
        <br />
        <br />
    <table className='table'>
            <tbody>
                <tr>
                    <td className='inputTitle'><input type="text" placeholder='제목을 입력해주세요'
                        onChange={(e) => {setTitle(e.target.value); console.log(title)}}
                    /></td>
                </tr>
                <tr>
                    <td className='selectCategory'>
                        카테고리 선택

                    <select name="" id="" v-model="category" class="category"
                         onChange={e => {setCategory(e.target.value); console.log(category)}}
                    >
                        <option value="JOB">직업</option>
                        <option value="CULTURE">문화생활</option>
                        <option value="HEALTH">건강</option>
                        <option value="COMMUNICATION">소통</option>
                    </select>
                    </td>
                </tr>
                <tr>
                    <td className='inputContent'><textarea name="" id="" cols="30" rows="10" placeholder='내용을 입력해주세요'
                         onChange={e => setContent(e.target.value)}
                    ></textarea></td>
                </tr>
            </tbody>
    </table>
    <button className='btn btn-primary my-3'
        onClick={createBoard}
    >등록하기</button>
    </div>
  )
}

export default Detail