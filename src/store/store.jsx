//////////////////////
/// 우리의 메인 스토어 ///
/////////////////////

import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./UserSlice";
import board from "./BoardSlice";
import hospital from "./HospitalSlice";
import work from "./WorkSlice";
import chat from "./chatSlice";

//이렇게 객체를 전달하면 redux state에는 state.name 변수가 만들어짐
//예) state.user, state.board
//컴포넌트에서 useSelector로 얘네를 사용!

export default configureStore({
    reducer: {
        user: user.reducer,
        board : board.reducer,
        hospital : hospital.reducer,
        work : work.reducer,
        chat : chat.reducer,
    },
});