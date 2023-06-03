import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ user, setUser }) => {
  useEffect(() => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    setUser(user);
  }, []);

  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div className="me-2">
      <nav className="navbar navbar-expand-sm navbar-light bg-info fixed-top  rounded-pill">
        <div className="container-fluid">
          <a className="navbar-brand" style={{ color: "white" }} href="/">
            Logo
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="mynavbar"
          >
            <ul className="navbar-nav ml-auto ">
              {user ? (
                <div class="navbar-nav">
                  <Link
                    to="addreview"
                    class="nav-item nav-link "
                    style={{ color: "white" }}
                  >
                    reviews
                  </Link>
                  <Link
                    to="/saves"
                    class="nav-item nav-link "
                    style={{ color: "white" }}
                  >
                    Saves
                  </Link>
                  <div class="nav-item dropdown">
                    <a
                      href="#"
                      class="nav-link dropdown-toggle  "
                      data-bs-toggle="dropdown"
                      style={{ color: "white" }}
                    >
                      {user.name}
                    </a>
                    <div class="dropdown-menu">
                      <Link to="profile" class="dropdown-item">
                        Profile
                      </Link>

                      <li>
                        <hr class="dropdown-divider" />
                      </li>
                      <li>
                        <a class="dropdown-item" onClick={logout}>
                          logout
                        </a>
                      </li>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link "
                      to="login"
                      style={{ color: "white" }}
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="signup"
                      style={{ color: "white" }}
                    >
                      Signup
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Header;
