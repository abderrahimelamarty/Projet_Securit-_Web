import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Signin = ({ setUser }) => {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const login = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/users/login",
        {
          email: Email,
          password: password,
        },
        config
      )
      .then((response) => {
        console.log(response);
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/profile");
      })
      .catch((Error) => {
        console.log(Error);
        setError(Error.response.data.message);
      });
  };
  return (
    <section className="h-100">
      <div className="container h-100">
        <div className="col-mt-3">
          <div className="d-flex flex-column align-items-center text-center p-3 py-1">
            <img
              width="100px"
              className="rounded-circle"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdAkPAKh6lCmREdcYPDCT-QMHtphAxnYv4bm_qw5oHbqmL2afS2tVHVQE8C_JAAI_FB2g&usqp=CAU"
            />
          </div>
        </div>
        <div className="row justify-content-sm-center h-100">
          <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
            <div className="card shadow-lg">
              {error && (
                <div className="alert alert-danger">
                  <strong>{error}</strong>
                </div>
              )}
              <div className="card-body p-5">
                <h1 className="fs-4 card-title fw-bold mb-4">Login</h1>
                <form onSubmit={login}>
                  <div className="mb-3">
                    <label className="mb-2 text-muted" for="email">
                      E-Mail Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-control"
                      name="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <div className="mb-2 w-100">
                      <label className="text-muted" for="password">
                        Password
                      </label>
                    </div>
                    <input
                      id="password"
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      require
                      required
                    />
                  </div>

                  <div className="d-flex align-items-center">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        name="remember"
                        id="remember"
                        className="form-check-input"
                      />
                      <label for="remember" className="form-check-label ">
                        Remember Me
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-info ms-auto"
                      style={{ color: "white", backgroundColor: "#2777BA" }}
                    >
                      LOGIN
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer py-3 border-0">
                <div className="text-center">
                  Don't have an account?
                  <Link to={"/signup"}> Create one</Link>
                </div>
              </div>
            </div>
            <div className="text-center mt-5 text-muted"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Signin;
