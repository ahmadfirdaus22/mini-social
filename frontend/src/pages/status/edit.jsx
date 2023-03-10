import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/css/addStatus.css";
import Navbar from "../../components/Navbar";

const EditStatus = () => {
  const [status, setStatus] = useState("");
  const id = useParams();
  const [rendering, forceUpdate] = useReducer((x) => x + 1, 0);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

 const getStatus = async () => {
    try{
      //setting axios header with bearer token
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      //getSTatus
      await axios.get("http://localhost:8000/api/status/"+id.id).then((response) =>{
        if(response.status == 200){
            setStatus(response.data.data.status)
            document.getElementById("status").value = response.data.data.status;
        }
      })
    }catch(error){

    }
 }

  const updateStatus = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("status", status);
    try {
      //setting axios header with bearer token
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      //post status
      await axios
        .post("http://localhost:8000/api/status/"+id.id, formData)
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
    if (localStorage.getItem("token")) {
      getStatus();
    }
  }, [rendering]);
  
  return (
    <>
      <Navbar />
      <div className="wrapper-add">
        <div className="form-add">
          <form onSubmit={updateStatus}>
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

export default EditStatus;
