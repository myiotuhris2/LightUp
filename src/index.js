import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Sidebar from './components/Sidebar';
import StatusChart from './components/StatusChart';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <div className="Apple">
    <div className="AppleGlass">
    <Router>
    <Sidebar/>
    <Routes>
    <Route exact path="/" element={<App />} />
            <Route path="/chart" exact element={<StatusChart />} />
    </Routes>
   </Router>
    </div>
    </div>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
