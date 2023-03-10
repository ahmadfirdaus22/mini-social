import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/addStatus.css";
import Navbar from "../../components/Navbar";

const AddStatus = () => {
  const [status, setStatus] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const postStatus = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("status", status);
    try {
      //setting axios header with bearer token
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      //post status
      await axios
        .post("http://localhost:8000/api/status", formData)
        .then((response) => {
          if (response.status == 201) {
            navigate("/dashboard");
          }
        });
    } catch (error) {
        console.log(error);
    }
  };

  //give word limit up to 50 word
  const wordLimiter = () => {
    let input = document.getElementById("status");

    input.addEventListener("keypress", (e) => {
      let txt = input.value.split(/\s+/);
      let count = txt.length
      let maxword = 50;
      if(count > maxword){
          e.preventDefault();
          document.getElementById('word').innerHTML = maxword;
      }else if(count < 50){
        document.getElementById('word').innerHTML = count;
      }
      setStatus(input.value);
    });
  };

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/");
    }
  });
  return (
    <>
      <Navbar />
      <div className="wrapper-add">
        <div className="form-add">
          <form onSubmit={postStatus}>
            <div className="top">
                <label>Status </label>
                <div className="word">
                    <p>Word : </p><p id="word" >0</p><p>/50</p> 
                </div>
            </div>
            <textarea
              name="status"
              onChange={wordLimiter}
              placeholder="Write Your Day"
              id="status"
              cols="50"
              rows="10"
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddStatus;
