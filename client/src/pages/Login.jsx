import "../styles/login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

async function handleLogin(e) {
    e.preventDefault();
    try{
const response = await axios.post(
   `${import.meta.env.VITE_API_URL}/api/auth/login`,
    {
        email,
        password
    }
);
console.log(response.data);
const firstLogin = response.data.firstLogin;
 alert("Login successful! 🎉");
localStorage.setItem("token", response.data.token);
navigate("/home", { state: { firstLogin } });
}
catch (error) {
  alert(error.response?.data?.message || "Something went wrong!");
};
};

  return (
    <div className="login-container">

      <div className="login-card">

        <h1 className="login-logo">MirrorVibes</h1>

        <h2>Welcome Back!</h2>

        <p>
          Continue your journey, cuz music heals!.
        </p>

        <form className="login-form" onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <button type="submit">
            Continue
          </button>

        </form>

        <span>
          Don't have an account?{" "}
          <Link to="/signup">
            Create one
          </Link>
        </span>

      </div>

    </div>
  );
};


export default Login;