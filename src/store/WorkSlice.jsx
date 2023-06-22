import {createSlice } from "@reduxjs/toolkit";
import {local_info} from "../pages/work/local_code";

let initialState = {
  local_info,
}


const work = createSlice({
  name : 'work',
  initialState,
  reducers:{}
})


export let {} = work.actions
export default work;