import Navbar from "../../components/Navbar";
import "../../assets/css/showStatus.css";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../components/Loading";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Dropdown, Button } from "antd";

const Show = () => {
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const param = useParams();
  const [rendering, forceUpdate] = useReducer((x) => x + 1, 0);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getStatus = async () => {
    //setting axios header with bearer token
    setLoading(true);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    //geting data
    await axios
      .get("http://localhost:8000/api/status/" + param.id)
      .then((response) => {
        if (response.status == 200) {
          setStatus(response.data.data);
          setComments(response.data.data.comments);
          setLoading(false);
          if(response.data.user == response.data.data.user_id){
            document.getElementById("more").style.display = "block";
          }
        }
      });
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("status_id", status.id);
    formData.append("comment", comment);
    //setting axios header with bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    //post comment
    await axios.post("http://localhost:8000/api/comment", formData).then();
  };

  const deleteHandle = async() => {
    //setting axios header with bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    await axios.delete("http://localhost:8000/api/status/"+status.id).then((response) => {
        if(response.status == 204){
            navigate("/")
        }
    });
  }

  const items = [{
    key: '1',
    label: (
      <Link to={"/edit-status/"+status.id}>
        Edit
      </Link>
    ),
  },{
    key: '2',
    label: (
      <a onClick={() => {if(window.confirm("Are You Want Delete This Status?")){deleteHandle()}}}>
        Delete
      </a>
    ),
  }]

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
      <div className="wrapper-show">
        <div className="first-layer">
          <div className="left">
            <div className="top">
              <div className="name">
                {status?.user?.name}
                <div className="more" id="more">
                <Dropdown
                  menu={{
                      items
                    }}
                    placement="bottomRight"
                    arrow
                    >
                  <Button>More</Button>
                </Dropdown>
                </div>
              </div>
            </div>
            <div className="middle">
              {loading ? (
                <div className="loading">
                  <LoadingSpinner />
                </div>
              ) : (
                status.status
              )}
            </div>
            <div className="bottom"></div>
          </div>
          <div className="right">
            <div className="top">Comment</div>
            <div className="middle">
              {loading ? (
                <div className="loading">
                  <LoadingSpinner />
                </div>
              ) : comments.length == 0 ? (
                <div className="zero">This Status Don't Have Any Comment</div>
              ) : (
                <div className="many">
                  {comments.map((value, index) => {
                    return (
                      <div key={index} className="data">
                        <label>{value.name}</label>
                        {value.comment}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="bottom">
              <form onSubmit={handleComment}>
                <input
                  type="text"
                  onChange={(e) => setComment(e.target.value)}
                  name="comment"
                  placeholder="Send A Comment"
                />
                <button>
                  <i class="fa-solid fa-plus"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Show;
