import {configureStore, createSlice} from '@reduxjs/toolkit'
import {boardList} from "../Data";

const board = createSlice({
    name : "boards",
    initialState : boardList,
    reducers : {
        addBoard : (state) =>{
            
        }
    }
})


// export default configureStore({
//     reducer : {
//         boards : boardSlice.reducer,
//     }
// })
export let {addBoard} = board.actions;
export default board;
