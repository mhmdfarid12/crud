import React, { useState } from "react";
import "../css/Register.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { v4 as uuid } from "uuid";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ids = uuid();
    let uniqueId = ids.slice(0, 8);
    const riquest = {
      id: uniqueId,
      username: username,
      email: email,
      password: password,
      role: "supervisor",
    };

    if (username !== "" && email !== "" && password !== "") {
      try {
        const response = await axios.post(
          "http://localhost:1234/accounts",
          riquest
        );
        console.log(response);
        console.log("added");
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        position: "top-middle",
        icon: "error",
        title: "Tolong isi semua kolom!!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-vector/paper-style-white-monochrome-background_23-2149000982.jpg?w=826&t=st=1697102479~exp=1697103079~hmac=1c79075f3069e702f954e9de0789b464a3dc62c98b37d0c76da2f4b9f244d670)" /* Ganti dengan path gambar Anda */,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="my-5">
              <form
                className=" card-body-color p-lg-5"
                onSubmit={(e) => handleSubmit(e)}
              >
                <div className="mb-3 tgh">
                  <h3 className="text-center">REGISTER</h3>
                  <input
                    type="text"
                    className="form-control"
                    id="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="User Name"
                    name="username"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    placeholder="email"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    placeholder="password"
                  />
                </div>
                <div className=""></div>
                <br />
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-color px-5 mb-5 w-100"
                  >
                    Register
                  </button>
                </div>

                <div id="login" className="text-center mb-5 text-dark">
                  <span style={{ color: "white" }}>Punya Akun?</span>
                  <Link to="/login" className="text-dark fw-bold">
                    <span style={{ color: "white" }}>
                      klik di sini untuk login
                    </span>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
