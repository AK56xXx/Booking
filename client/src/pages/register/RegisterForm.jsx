import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import './registerform.css';

const RegisterForm = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });
    try {
      const res = await axios.post("/auth/register", credentials);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
      navigate("/"); // Redirect to home page after successful registration
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login_form">
      <form action="#" className="form">
        <h1 className="form_title"> Register </h1>

        <div className="form_div">
          <input type="text" className="form_input" placeholder=" " id="username" onChange={handleChange} required />
          <label className="form_label">Username</label>
        </div>

        <div className="form_div">
          <input type="email" className="form_input" placeholder=" " id="email" onChange={handleChange} required />
          <label className="form_label">Email</label>
        </div>

        <div className="form_div">
          <input type="text" className="form_input" placeholder=" " id="phone" onChange={handleChange} required />
          <label className="form_label">Phone</label>
        </div>

        <div className="form_div">
          <input type="text" className="form_input" placeholder=" " id="city" onChange={handleChange} required />
          <label className="form_label">City</label>
        </div>
        <div className="form_div">
          <input type="text" className="form_input" placeholder=" " id="country" onChange={handleChange} required />
          <label className="form_label">Country</label>
        </div>

        <div className="form_div">
          <input type="password" className="form_input" placeholder=" " id="password" onChange={handleChange} required />
          <label className="form_label">Password</label>
        </div>

        {/* You can include the captcha code here if needed */}

        <button disabled={loading} onClick={handleClick} className="form_button">
          Register
        </button>
        {error && <span>{error.message}</span>}
      </form>
    </div>
  );
};

export default RegisterForm;