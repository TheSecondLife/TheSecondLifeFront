import "./App.css";
import { Route, Routes, Link, useNavigate, Outlet, Router } from 'react-router-dom';

import BoardPage from "./BoardPage";
import Home from "./Home";
import Create from "./Create";
import Login from "./pages/login/Login";
import Main from "./pages/login/Main"; {/* 이거 지우기 */}
import Home from "./pages/Home";
import Create from "./pages/Create";
import Login from "./components/Login";
import Detail from "./pages/Detail";

function App() {
    return (
        <div className="App">
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/boardCreate" element={<Create />}></Route>
                    <Route path="/main" element={<Main />}></Route> {/* 이거 지우기 */}
                    <Route path='/boardDetail' element={<Detail />} />

                </Routes>
        </div>
        
    );
}

export default App;
