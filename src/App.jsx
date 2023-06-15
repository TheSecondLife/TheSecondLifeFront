import "./App.css";
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom';

import BoardPage from "./BoardPage";
import Home from "./Home";
import Create from "./Create";


function App() {
    return (
        
        <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/boardCreate" element={<Create />}></Route>
        </Routes>
     
    );
}

export default App;
