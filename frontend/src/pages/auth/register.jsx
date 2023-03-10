import "../../assets/css/register.css";
import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  //define State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [validation, setValidation] = useState([]);
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("password_confirmation", confirm);

    try {
      await axios.post("http://localhost:8000/api/register", formData).then((response) => {
        if(response.status == 204){
          navigate('/');
        }
      });
    } catch (error) {
      console.log(error);
      setValidation();
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
      <div className="wrapper-register">
        <div className="form-register">
          <div className="header-form">
            <h1>Register</h1>
          </div>
          <div className="body-form">
            <form onSubmit={registerHandler}>
              <div className="form-grp">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Your Full Name"
                />
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your email"
                />
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter Your Phone Number"
                />
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your Password"
                />
                <label>Password Confirmation</label>
                <input type="password" name="confirm" value={confirm} onChange={(e)=>setConfirm(e.target.value)} placeholder="Enter Your Password Again" />
              </div>
              <div className="form-butt">
                <button type="submit">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
