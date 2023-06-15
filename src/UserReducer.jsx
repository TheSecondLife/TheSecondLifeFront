import {configureStore, createSlice} from '@reduxjs/toolkit'
import {boardList} from "./Data";

const boardSlice = createSlice({
    name : "boards",
    initialState : boardList,
    reducers : {
        addBoard : (state, action) =>{
            console.log(action)
        }
    }
})


export default configureStore({
    reducer : {
        boards : boardSlice.reducer,
    }
})
export let {addBoard} = boardSlice.actions;
