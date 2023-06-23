import React, { useState , useEffect} from 'react';
import styled from "styled-components";
import style from "../../css/WorkQuestion.module.css";


const SelectBoxWrapper = styled.div`
	display: flex;
  justify-content : center;
`;


// map안에서도 꼭 return 해줘야함
const Select = (props) => {
    return(
      <SelectBoxWrapper>
        <select className={style.select_work}>
          {
            props.options.map((one)=>{
              return(<option 
                value={one.직종코드}
                defaultValue={props.defaultValue === one.직종코드}>{one.__EMPTY}</option>)
              })
          }
        </select> 

      </SelectBoxWrapper>   
    )
}

export default Select;