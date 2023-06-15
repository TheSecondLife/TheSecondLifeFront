import React from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import "./css/Home.module.css"

function Home() {
    const users = useSelector((state) => state.users);
    console.log(users);
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
                {users.map((user, i) => (
                    <tr key={i}>
                       <td>{user.category}</td>     
                       <td>{user.title}</td>     
                       <td>{user.date}</td>     
                       <td>{user.viewCnt}</td>     
                    </tr>
                ))}
            </tbody>
        </table>
        <Link to="/boardCreate" className='btn btn-success my-3'>등록하기</Link>
    </div>
  )
}

export default Home