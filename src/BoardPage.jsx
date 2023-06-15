import React, { useState, useEffect } from 'react'
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios'

function BoardPage() {
    //useState
    let [boards, setBoards] = useState([{title : "제목", date : "2023-06-15", viewCnt : 33}]);
    let [category, setCategory] = useState("category");
    let [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    //axios
    //useEffect
    useEffect(()=>{
        axios.get("")
    .then((res) => {
        setBoards(res.data);
        console.log("axios requested!");
        console.log(res.data);
    })
    .catch((err) => {
        console.log("failed!");
    })
    .finally(() => setLoading(false));
    }, [])
    

  return (
    <div class="boardtable">
      <table class="tg" style={{width:"546px"}}>
        <colgroup>

        </colgroup>
        <thead>
          <tr>
            <th class="tg-8lxw">#</th>
            <th class="tg-8lxw">구분</th>
            <th class="tg-8lxw">제목</th>
            <th class="tg-8lxw">Date</th>
            <th class="tg-8lxw">조회수</th>
          </tr>
        </thead>
        <tbody>
            {boards.map((board, i)=>{
                return(
                    <tr>
                    <td className="tg-0lax">{i}</td>
                    <td className="tg-0lax category">{category}</td>
                    <td class="tg-0lax">
                      <button >
                      {/* 제목 클릭 시 보드인덱스와 i와 writer를 받아서 디테일로 */}
                        {board.title}
                      </button>
                    </td>
                    <td class="tg-0lax">{board.date}</td>
                    <td class="tg-baqh">{board.viewCnt}</td>
                  </tr>
                )
            })
            }
        </tbody>
      </table>
    </div>




  )
}

export default BoardPage