import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile({ user, setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(() => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    setUser(user);
    setName(user.name);
    setEmail(user.email);
  }, []);
  const token = JSON.parse(localStorage.getItem("user")).token;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/users/profile",
        {
          name: name,
          email: email,
          password: password,
        },
        config
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response.data));
        setSuccess("updated successfuly");
      })
      .catch((Error) => {
        console.log("hhhhhh");
        console.log(Error);
        setError(Error.data.message);
      });
  };

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      {error && (
        <div className="alert alert-danger">
          <strong>{error}</strong>
        </div>
      )}
      {success && (
        <div className="alert alert-info">
          <strong>{success}</strong>
        </div>
      )}
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              width="150px"
              src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"
            />
            <span className="font-weight-bold">{user?.name}</span>
            <span className="text-black-50">{user?.email}</span>
            <span></span>
          </div>
        </div>
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div>
            <div className="row mt-2">
              <div className="col-md-12">
                <label className="labels">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Votre Nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">Password</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="col-md-12 mt-3">
                <label className="labels">Email </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Votre Email "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-5 text-center">
                <button
                  className="btn btn-info profile-button"
                  type="button "
                  onClick={submitHandler}
                  style={{ color: "white", backgroundColor: "#2777BA" }}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 py-5">
            <div className="d-flex flex-column align-items-center text-center p-3 py-9">
              <img
                width="300px"
                className="rounded-circle"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdAkPAKh6lCmREdcYPDCT-QMHtphAxnYv4bm_qw5oHbqmL2afS2tVHVQE8C_JAAI_FB2g&usqp=CAU"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
