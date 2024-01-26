// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useRouteMatch,
//   useParams
// } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";


function App() {
  return (
    <div className="App">
      
      <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          
        </ul>

        <Routes>

            <Route path='/' element={<Home/>} />
            <Route path='/about' element={<About/>} />

        </Routes>
      </div>
    </Router>


    </div>
  );
}

export default App;
