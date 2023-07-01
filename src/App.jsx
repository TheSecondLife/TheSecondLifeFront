import "./App.css";
import { Route, Routes, Link, useNavigate, Outlet, Router } from 'react-router-dom';

// import BoardPage from "./BoardPage";
// import Login from "./pages/login/Login";
import Main from "./pages/login/Main";
// import Home from "./pages/Home";
import Create from "./pages/Create";
import Detail from "./pages/Detail";
import KakaoCallback from './pages/login/KakaoCallback'
import HomePage from './pages/HomePage';
import HealthList from "./pages/health/HealthList";
import HealthQuestion from "./pages/health/HealthQuestion";
import ChatPage from "./pages/ChatPage";
import BoardPage from "./pages/BoardPage";
import ProfilePage from './pages/ProfilePage'
import JobPage from './pages/JobPage'
import CulturePage from './pages/CulturePage'
import BoardDetail from './pages/BoardDetail'
import ChatList from './pages/ChatListPage'
import WorkQuestion from './pages/work/WorkQuestion'
import WorkList from './pages/work/WorkList'
import BoardEdit from "./pages/BoardEdit";
import CultureQuestion from './pages/culture/CultureQuestion';
import CultureList from './pages/culture/CultureList';




function App() {
    return (
        <div className="App">
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path='/kakao/callback' element={<KakaoCallback></KakaoCallback>}> </Route>
                    <Route path='/home' element={<HomePage/>}></Route>
                    {/* <Route path="/" element={<Home></Home>}></Route> */}
                    <Route path="/boardCreate" element={<Create />}></Route>
                    <Route path="/main" element={<Main />}></Route>
                    <Route path='/boardDetail' element={<Detail />} />
                    <Route path="/HealthList" element={<HealthList/>}></Route>
                    <Route path="/HealthQuestion" element={<HealthQuestion/>}></Route>
                    <Route path='/chatlist' element={<ChatList/>}/>
                    <Route path='/chat/:otherId/:roomId' element={<ChatPage />}></Route>
                    <Route path='/board' element={<BoardPage />}></Route>
                    <Route path='/profile' element={<ProfilePage />}></Route>
                    {/* <Route path='/job' element={<JobPage/>}></Route> */}
                    <Route path='/culture' element={<CulturePage/>}></Route>
                    <Route path='/board/:id' element={<BoardDetail/>}></Route>
                    <Route path='/boardEdit/:id' element={<BoardEdit/>}></Route>
                    <Route path='/workQuestion' element={<WorkQuestion/>}></Route>
                    <Route path='/workList' element={<WorkList/>}></Route>
                    <Route path='/cultureQuestion' element={<CultureQuestion/>}></Route>
                    <Route path="/cultureList" element={<CultureList/>}></Route>
                </Routes>
        </div>
        
    );
}

export default App;