import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          Smart Student System
        </Link>

        <div className="navbar-nav ms-auto d-flex align-items-center">

          {!token ? (
            <>
              <Link className="nav-link" to="/">
                Login
              </Link>

              <Link className="nav-link" to="/register">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>

              <Link className="nav-link" to="/students">
                Students
              </Link>

              <Link to="/predict">AI Prediction</Link>

              <button
                className="btn btn-danger btn-sm ms-3"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;