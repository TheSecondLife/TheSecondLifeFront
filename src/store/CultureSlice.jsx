import {createSlice } from "@reduxjs/toolkit";
import {records} from "../pages/culture/eventList";


const initialState = {
  culture_list : records,
}

const culture = createSlice({
  name : 'culture',
  initialState,
  reducers:{

  }
})


export default culture;