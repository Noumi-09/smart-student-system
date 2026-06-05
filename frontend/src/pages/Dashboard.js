import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setCount(res.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container mt-4">

      <h2 className="text-center fw-bold mb-4">
        Admin Dashboard
      </h2>

      {/* STATS CARDS */}
      <div className="row g-4">

        <div className="col-md-4">
          <div className="card shadow-sm text-center p-4 bg-primary text-white border-0">
            <h5>Total Students</h5>
            <h2>{count}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center p-4 bg-success text-white">
            <h5>System Status</h5>
            <h2>Active</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center p-4 bg-warning text-dark">
            <h5>Backend</h5>
            <h2>Running</h2>
          </div>
        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div className="text-center mt-5">

        <button
          className="btn btn-primary me-3"
          onClick={() => navigate("/students")}
        >
          Manage Students
        </button>

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Dashboard;