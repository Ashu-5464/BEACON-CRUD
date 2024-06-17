import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import PostForm from './PostForm';


function App() {
  return (
    <div className="App">
     
      <BrowserRouter>
          
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="container-fluid">
               
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  
                    <li className="nav-item">
                      <Link className='nav-link' to="/Employee">Employee</Link>
                    
                    </li>
                   
                  </ul>

                </div>
              </div>
            </nav>

            <Routes>
          
              <Route path='Employee' element={<PostForm/>}></Route>
               <Route path="/postForm/:id" element={<PostForm />} />
            </Routes>
         
        </BrowserRouter>
    </div>
  );
}

export default App;
