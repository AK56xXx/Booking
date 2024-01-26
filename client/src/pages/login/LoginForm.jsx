
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import './loginform.css';



const LoginForm = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
      });
    
      const { loading, error, dispatch } = useContext(AuthContext);
    
      const navigate = useNavigate()
    
      const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      };
    
      const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
          const res = await axios.post("/auth/login", credentials);
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
          navigate("/")
        } catch (err) {
          dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
      };



  return (
    <div className="login_form">
      <form action="#" className="form">
        <h1 className="form_title"> Log In </h1>

        <div className="form_div">
          <input type="text" className="form_input" placeholder=" " id="username" onChange={handleChange} />
          <label className="form_label">Username</label>
        </div>

        <div className="form_div">
          <input type="password" className="form_input" placeholder=" " id="password" onChange={handleChange} />
          <label className="form_label">Password</label>
        </div>

        <div id="captcha" className="form_div">
          <div className="preview"></div>
          <div className="captcha_form">
            <input type="text" id="captcha_form" className="form_input_captcha" placeholder=" " />
            <label className="form_label_captcha">Enter Captcha</label>
            <button className="captcha_refersh">
              <i className="fa fa-refresh"></i>
            </button>
          </div>
        </div>

        <button disabled={loading} onClick={handleClick} className="form_button">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </form>
    </div>
  );
};

export default LoginForm;