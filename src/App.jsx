import "./App.css";
import { Route, Routes, Link, useNavigate, Outlet, Router } from 'react-router-dom';

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
                    <Route path='/boardDetail/:id' element={<Detail />} />

                </Routes>
        </div>
        
     
    );
}

export default App;
