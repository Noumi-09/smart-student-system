import { useState } from "react";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/register", {
        name,
        email,
        password
      });

      console.log(res.data);

      alert("Registration successful!");

      window.location.href = "/";
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Registration failed");
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
          width: "450px"
        }}
      >
        <h2 className="text-center mb-4">
          Create Account
        </h2>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
            className="btn btn-success w-100"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;