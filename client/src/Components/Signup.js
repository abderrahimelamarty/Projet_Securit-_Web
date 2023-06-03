import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = ({ setUser }) => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const register = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/users/register",
        {
          name: name,
          email: Email,
          password: password,
        },
        config
      )
      .then((response) => {
        console.log(response);
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
      })
      .catch((Error) => {
        setError(Error.response.data.message);
        console.log(Error.response.data);
      });
  };

  return (
    <section className="h-80">
      {error && (
        <div className="alert alert-danger">
          <strong>{error}</strong>
        </div>
      )}
      <div className="container h-80">
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
              <div className="card-body p-5">
                <h1 className="fs-4 card-title fw-bold mb-4">Register</h1>
                <form onSubmit={register}>
                  <div className="mb-3">
                    <label className="mb-2 text-muted" for="name">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-control"
                      name="name"
                      required
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="mb-2 text-muted" for="email">
                      E-Mail Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-control"
                      name="email"
                      required
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="mb-2 text-muted" for="password">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="form-control"
                      name="password"
                      required
                      onChange={(e) => {
                        setpassword(e.target.value);
                      }}
                    />
                  </div>

                  <div className="align-items-center d-flex">
                    <button
                      type="submit"
                      className="btn btn-info ms-auto"
                      style={{ color: "white", backgroundColor: "#2777BA" }}
                    >
                      REGISTER
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer py-3 border-0">
                <div className="text-center">
                  Already have an account? <Link to={"/login"}> Login</Link>
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
export default Signup;
