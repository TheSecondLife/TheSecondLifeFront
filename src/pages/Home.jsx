import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import "../css/Home.module.css"

function Home() {
    const navigate = useNavigate();
    const boards = useSelector((state) => state.board);
    console.log(boards);
    // let [boards, setBoards] = useState([]);

    // useEffect(() => {
    //     const url = "http://localhost:8080/api/";
    //     axios.get(`${url}/post/list`)
    // .then((res) => {
    //     setBoards(res.data);
    //     console.log("axios requested!");
    //     console.log(res.data);
    // })
    // .catch((err) => {
    //     console.log("failed!");
    // })
    // }, [])
   
  return (
    <div className='container'>
        <h2>CRUD practice 게시판</h2>
        <table className='table'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>카테고리</th>
                    <th>제목</th>
                    <th>날짜</th>
                    <th>조회수</th>
                </tr>
            </thead>
            <tbody>
                {boards.map((board, i) => (
                    <tr key={i}>
                       <td>{i+1}</td>     
                       <td>{board.category}</td>     
                       <td onClick={() => { navigate('/boardDetail') }}>{board.title}</td>     
                       <td>{board.createdDate}</td>     
                       <td>{0}</td>     
                    </tr>
                ))}
            </tbody>
        </table>
        <Link to="/boardCreate" className='btn btn-success my-3'>등록하기</Link>
    </div>
  )
}

export default Home