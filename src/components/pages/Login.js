import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css"; // Impor file CSS
import Swal from "sweetalert2";

import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.get("http://localhost:1234/accounts");
      console.log(data);

      if (formData.username !== "" && formData.password !== "") {
        // const storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];
        const obj = data.data;
        const existingAccount = obj.find(
          (account) =>
            account.username === formData.username &&
            account.password === formData.password
        );

        if (existingAccount) {
          Swal.fire({
            position: "top-middle",
            icon: "success",
            title: "Login Berhasil!!",
            showConfirmButton: false,
            timer: 1500,
          });
          localStorage.setItem("UserRole", existingAccount.role);
          localStorage.setItem("id", existingAccount.id);
          navigate("/Home");
        } else {
          Swal.fire({
            position: "top-middle",
            icon: "error",
            title: "Username atau password salah!",
            showConfirmButton: false,
            timer: 1500,
          });
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
                className="card-body cardbody-color p-lg-5"
                onSubmit={handleSubmit}
              >
                <div className="mb-3">
                  <h3 className="text-center">LOGIN</h3>
                  <input
                    type="text"
                    className="form-control"
                    id="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    aria-describedby="emailHelp"
                    placeholder="User Name"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-color px-5 mb-5 w-100"
                  >
                    Login
                  </button>
                </div>
                <div
                  id="emailHelp"
                  className="form-text text-center mb-5 text-dark"
                >
                  <span style={{ color: "white" }}>Belum Punya Akun?</span>
                  <Link to="/" href="#" className="text-dark fw-bold">
                    <span style={{ color: "white" }}>
                      Klik Di Sini Untuk Register
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

export default Login;
