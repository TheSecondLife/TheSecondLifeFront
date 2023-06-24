import {createSlice } from "@reduxjs/toolkit";

let initialState = {
  chatList : [],
}

const chat = createSlice({
  name : 'chat',
  initialState,
  reducers:{
    getChatList : (state, action)=>{
        state.chatList = action.payload;
    }

  }
})


export let {getChatList} = chat.actions
export default chat;