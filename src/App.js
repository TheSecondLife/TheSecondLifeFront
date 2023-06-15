import "./App.css";
import Login from "./components/Login";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


// 라우터 
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
