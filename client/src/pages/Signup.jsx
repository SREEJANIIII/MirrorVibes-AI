import "../styles/signup.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

async function handleSignup(e) {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
  alert("Please fill in all fields.");
  return;
}
    if (password !== confirmPassword) {
  alert("Passwords do not match!");
  return;
}
    try{
const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/signup`,
    {
        username,
        email,
        password
    }
);
 alert("Signup successful! 🎉");
navigate("/login");
}
catch (error) {
  alert(error.response?.data?.message || "Something went wrong!");
};
};

  return (
    <div className="signup-container">

      <div className="signup-card">

        <h1 className="signup-logo">MirrorVibes</h1>

        <h2>Create your Account</h2>

        <p>
          Start your healing journey with music...
        </p>

        <form className="signup-form" onSubmit={handleSignup}>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />

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
          <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
        />

          <button type="submit">
            Create Account
          </button>

        </form>

        <span>
          Already have an account?{" "}
          <Link to="/login">
            Log in
          </Link>
        </span>

      </div>

    </div>
  );
};




export default Signup;