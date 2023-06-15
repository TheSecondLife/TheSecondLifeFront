import React, { useState } from 'react'
import "./css/Create.module.css"
import { Link } from 'react-router-dom'

function Create() {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [content, setContent] = useState("")

    const createBoard = (e) => {
        e.preventDefault();

    }
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
                        <option value="1">분류1</option>
                        <option value="2">분류2</option>
                        <option value="3">분류3</option>
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