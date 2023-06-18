import "./App.css";
import { Route, Routes, Link, useNavigate, Outlet, Router } from 'react-router-dom';

import BoardPage from "./BoardPage";
import Login from "./pages/login/Login";
import Main from "./pages/login/Main";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Detail from "./pages/Detail";

function App() {
    return (
        <div className="App">
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/boardCreate" element={<Create />}></Route>
                    <Route path="/main" element={<Main />}></Route>
                    <Route path='/boardDetail' element={<Detail />} />

                </Routes>
        </div>
        
    );
}

export default App;
