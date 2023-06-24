import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "../css/Create.module.css"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { addBoard } from '../store/BoardSlice.jsx'

function Create() {
    //변수 바구니
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [content, setContent] = useState("")
    //dispatch
    const dispatch = useDispatch();
    //navigate 
    let navigate = useNavigate();
    //현재 유저 
    let user = useSelector((state) => state.user);

    function createBoard(){
        //카테고리 따로 클릭하지 않았을 시 디폴트 세팅
        //axios에서 잘 들어가는지 테스트 필요.
        if(category === ""){
            setCategory("HEALTH");
        }
        const url = `${process.env.REACT_APP_SERVER}/api/`;
        const data = {
        title : title,
        content : content,
        img : "SampleImgSource",
        category : category,
    }
    console.log(data);
    const config = {"Content-Type": 'application/json'};
    axios.post(url+"post/regist/"+user.id, data, config)
    .then(() => {
      navigate('/')
    })
    console.log(data)
    }

    //////// html ///////
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

export default Create