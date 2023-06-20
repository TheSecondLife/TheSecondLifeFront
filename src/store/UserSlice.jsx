import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name : 'user',
  initialState : {
    id:1,
    name:"Daen"
  },
  reducers : {
    changeUser(state, action) {
      state = action.payload
    },
  }
})
export let { changeUser } = user.actions;
export default user;