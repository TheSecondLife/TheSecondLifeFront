import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import "./css/Home.module.css"

function Home() {
    // const boards = useSelector((state) => state.boards);
    // console.log(boards);
    let [boards, setBoards] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/post/list")
    .then((res) => {
        setBoards(res.data);
        console.log("axios requested!");
        console.log(res.data);
    })
    .catch((err) => {
        console.log("failed!");
    })
    }, [])
   
  return (
    <div className='container'>
        <h2>CRUD practice 게시판</h2>
        <table className='table'>
            <thead>
                <tr>
                    <th>카테고리</th>
                    <th>제목</th>
                    <th>날짜</th>
                    <th>조회수</th>
                </tr>
            </thead>
            <tbody>
                {boards.map((board, i) => (
                    <tr key={i}>
                       <td>{board.id}</td>     
                       <td>{board.category}</td>     
                       <td>{board.title}</td>     
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