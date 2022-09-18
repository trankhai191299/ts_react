import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { store } from "./redux/configStore";
import HomeTemplate from "./templates/HomeTemplate";
import 'antd/dist/antd.css';
import './assets/scss/style.scss'
import Demo from "./pages/Demo/Demo";
import ResponsiveItem from "./HOC/ResponsiveItem/ResponsiveItem";
import HomeMobile from "./pages/Home/HomeMobile";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route index element={<ResponsiveItem Component={Home} ComponentMobile={HomeMobile}/>}></Route>
          <Route path="home" element={<ResponsiveItem Component={Home} ComponentMobile={HomeMobile}/>}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="demo" element={<Demo />}></Route>
          <Route path="detail">
            <Route path=":id"></Route>
          </Route>
          <Route path="*" element={<Navigate to="" />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
