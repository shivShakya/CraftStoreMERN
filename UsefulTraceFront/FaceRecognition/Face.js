import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import FaceRegister from "./FaceRegister";
import FaceDetection from "./FaceDetection";
import Page from "./Page";
function Face() {
  return (
    <BrowserRouter>
        <nav>
            <div>
              <ul className="nav">
               <Link to='/' className="nav_li">Register</Link>
               <Link to='/predict' className="nav_li">Predict</Link>
               <Link to='/main' className="nav_li">MainPage</Link>
              </ul>
            </div>
        </nav>
        <Routes>
            <Route exact path="/" element={<FaceRegister/>} />
            <Route path="/predict" element={<FaceDetection/>} />
            <Route path="/main" element={<Page/>} />
        </Routes>    
    </BrowserRouter>
  );
}

export default Face;