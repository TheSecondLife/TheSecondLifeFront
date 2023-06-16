import React, { useState , useEffect} from 'react';
import axios from 'axios';
import style from "../css/HealthList.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { changeHospital } from '../store';


//https://www.data.go.kr/data/15001698/openapi.do
const HealthList = () => {
  // redux 불러오기
  let state = useSelector((state) => state.hospitalList);
  let dispatch = useDispatch();

  // console.log(state);

  let [list,setList]=useState();
  
  let [hospital,setHospital] = useState();//판매 신발 정보 
 
    useEffect( ()=>{axios.get('https://apis.data.go.kr/B551182/hospInfoServicev2/getHospBasisList?ServiceKey=fERDp1OKmJqiN%2BlVyCvnmH8YoFqdfOjIk7KzkZoDA8%2FIw6vmfXxGYvEou8NwVtlFsiX%2FLynuCmwQv9K1YfOGXw%3D%3D')
          .then((data)=>{
            // console.log(data.data.response.body.items.item[0]);
            dispatch(changeHospital(data.data.response.body.items.item));
            setList(data.data.response.body.items);
          })
          .catch(()=>{
            console.log("error");
          })},[])
        
    return(
      <div className={style.intro, style.fadein}> 
        {/* 로고 */}
        <div className={style.logo}>Second Life</div>

        {/* 안내문구 */}
        <div className={style.msg}>000님, 이런 병원들은 어떠세요?</div>

        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">분류</th>
              <th scope="col">병원명</th>
              <th scope="col">전화번호</th>
              <th scope="col">위치</th>
            </tr>
          </thead>
          <tbody>
            {
              //여기 병원 정보 돌리기 
              [1,2,3].map((index)=>{
                return(
                  <tr className={style.infoLine}>
                    <th scope="row">
                      <button type="button" class="btn" className={style.category}>상급병원</button>
                    </th>
                    <td>000병원</td>
                    <td>032-000-0000</td>
                    <td>대전광역시 유성구 00동 000건물 1층 </td>
                  </tr>
                );
              })
            }
            
          </tbody>
        </table>

        {/* page nation */}
        <nav aria-label="Page navigation example">
          <ul class="pagination" style={{justifyContent:'center'}}>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
        
      </div>
    );
}

export default HealthList;