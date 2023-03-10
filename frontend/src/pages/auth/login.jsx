import { useEffect, useState } from "react";
import "../../assets/css/login.css";
import axios from "axios";
import logo from "../../assets/image/Login-Logo.png";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  //define state
  const [insert, setInsert] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(0);
  const navigate = useNavigate();

  //define validation
  const [validation, setValidation] = useState([]);

  const loginHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (insert.includes("@")) {
      formData.append("email", insert);
    } else {
      formData.append("phone", insert);
    }
    formData.append("password", password);

    try {
      await axios
        .post("http://localhost:8000/api/login", formData)
        .then((response) => {
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("tokenType", response.data.token_type);
          localStorage.setItem("expiresIn", response.data.expires_in);
          navigate("/dashboard", { replace: true });
        });
    } catch (error) {
      console.log(error);
    }
  };

    const toggleRemember = (value) => {
      if (value == 0) {
        setRemember(1);
      } else {
        setRemember(0);
      }
    };

    useEffect(() => {
      if (localStorage.getItem("token")) {
        navigate("/dashboard");
      }
      document.title = "Login - LinkUp";
    }, ["Login - LinkUp"]);

  return (
    <>
      <div className="wrapper-login">
        <div className="form-login">
          <div className="header-form">
            <div className="image-header">
              <img src={logo} alt="" />
            </div>
          </div>
          <div className="body-form">
            <form onSubmit={loginHandler}>
              <div className="form-grp">
                <label>Enter Your Email Or Phone Number</label>
                <input
                  type="text"
                  name="insert"
                  value={insert}
                  onChange={(e) => setInsert(e.target.value)}
                  placeholder="Enter Your Email Or Phone Number"
                />
                <label>Enter Your Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your Password"
                />
              </div>
              <div className="form-grp checkbox">
                <input type="checkbox" />
                <label>Remember me?</label>
              </div>
              <div className="form-butt">
                <button type="submit">Sign In</button>
              </div>
              <div className="form-foot">
                <p>
                  Don't Have Any Account?<Link to="/register">Register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
