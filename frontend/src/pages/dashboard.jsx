import { useEffect, useReducer, useState } from "react";
import "../assets/css/dashboard.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../assets/image/Web-Logo.png";
import LoadingSpinner from "../components/Loading";
import moment from "moment/moment";

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [rendering, forceUpdate] = useReducer((x) => x + 1, 0);
  const [myStatus, setMyStatus] = useState([]);
  const [otherStatus, setOtherStatus] = useState([]);
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(false);

  const getStatus = async () => {
    try {
      setLoading(true);
      //setting axios header with bearer token
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      //Get All status from database
      await axios.get("http://localhost:8000/api/status").then((response) => {
        if (response.status == 200) {
          setMyStatus(response.data.user);
          setOtherStatus(response.data.not_user);
          setLoading(false);
          // console.log(myStatus)
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addStatus = () => {
    navigate("/add-status");
  };

  const showDetail = (name, id) => {
    // console.log();
    navigate("/" + name.replace(/\s+/g, "-") + "/status/" + id);
  };

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/");
    }
    if (localStorage.getItem("token")) {
      getStatus();
    }
  }, [rendering]);
  return (
    <>
      <Navbar />
      <div className="wrapper-dashboard">
        <div className="user-status">
          <div className="add-status" onClick={addStatus}>
            <i className="fa-solid fa-plus"></i>
          </div>
          <div className="your-status">
            {myStatus.length == 0 ? (
              <div className="no-data">You Don't Have Any Status</div>
            ) : (
              <div className="wrap-data">
                {myStatus.map((value, index) => {
                  return (
                    <div
                      key={index + 1}
                      data-hover={value.status}
                      className="data"
                      onClick={() => showDetail(value.user.name, value.id)}
                    >
                      <img src={logo} width="20px" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="other-status">
          {loading ? (
            <div className="loading">
              <LoadingSpinner />
            </div>
          ) : otherStatus.length == 0 ? (
            <div className="no-data">No Data</div>
          ) : (
            <div className="wrap-data">
              {otherStatus.map((value, index) => {
                return (
                  <div
                    key={index}
                    className="data"
                    onClick={() => showDetail(value.user.name, value.id)}
                  >
                    <label>{value.user.name}</label>
                    <p>
                        {value.status}
                    </p>
                    <div className="bottom">
                        {moment(value.created_at, "YYYY-MM-DDTHH:mm:ss.SSSSZ").fromNow()}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
