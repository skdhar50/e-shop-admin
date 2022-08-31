import React from 'react';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './components/pages/Login';
import reportWebVitals from './reportWebVitals';

const options = {
  position: positions.BOTTOM_RIGHT,
  timeout: 5000,
  offset: '5px',
  transition: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AlertProvider template={AlertTemplate} {...options}>
        <Routes>
          <Route path="/*" element={<App />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        
        </AlertProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

