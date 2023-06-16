import "./App.css";
import { Route, Routes, Link, useNavigate, Outlet, Router } from 'react-router-dom';

import BoardPage from "./BoardPage";
import Home from "./Home";
import Create from "./Create";
import Login from "./components/Login";
import HealthList from "./components/HealthList";

function App() {
    return (
        <div className="App">
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/boardCreate" element={<Create />}></Route>
                    <Route path="/HealthList" element={<HealthList/>}></Route> {/*이거 지워야함*/}
                </Routes>
        </div>
        
     
    );
}

export default App;
