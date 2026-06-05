import { useState } from "react";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      alert("Login successful!");

      window.location.href = "/dashboard";
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Login failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
  style={{
    minHeight: "80vh",
    background: "linear-gradient(to right, #e3f2fd, #ffffff)"
  }}
    >
      <div
        className="card shadow p-4"
        style={{
          width: "400px"
        }}
      >
        <h2 className="text-center mb-4">
          Smart Student System
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;