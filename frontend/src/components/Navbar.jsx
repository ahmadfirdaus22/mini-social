import React from "react";
import logo from "../assets/image/Navbar-Logo.png";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/navbar.css";
import { Button } from "antd";
import axios from "axios";

const Navbar = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const logoutHandler = async() => {
        // window.confirm("Are You Sure?");
        //setting axios header with bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fecth rest API
        await axios.post("http://localhost:8000/api/logout").then(()=>{
            //remove token from localstorage
            localStorage.removeItem('token');
            localStorage.removeItem('tokenType');
            localStorage.removeItem('expiresIn');

            //redirect to login
            navigate('/');
        });
    }

  return (
    <>
      <div className="wrapper-navbar">
        <div className="left">
          <Link to="/dashboard">
            <img src={logo} alt="" />
          </Link>
        </div>
        {/* <div className="middle">
          <Link className="text">Status</Link>
        </div> */}
        <div className="right">
          <Button type="primary" danger onClick={logoutHandler}>
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
