import React, { useState } from "react";
import "../css/Register.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "supervisor",
  });
  const navigate = useNavigate();
  const accounts = [
    {
      id: 0,
      email: "youremail@gmail.com",
      username: "yourname",
      password: "yourpassword",
      role: "supervisor",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.username !== "" &&
      formData.email !== "" &&
      formData.password !== "" &&
      formData.role !== ""
    ) {
      const newAccount = {
        id: accounts.length,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        role: formData.role,
      };

      // Menambahkan akun baru ke array accounts
      accounts.push(newAccount);

      // Menyimpan array accounts di localStorage
      localStorage.setItem("accounts", JSON.stringify(accounts));

      // alert("Registrasi berhasil!");
      Swal.fire({
        position: "top-middle",
        icon: "success",
        title: "Register Berhasil!!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(accounts);

      navigate("/login");

      setFormData({
        username: "",
        email: "",
        password: "",
      });
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
          "url(https://www.gotravelly.com/blog/wp-content/uploads/2019/10/Gunung-Fuji-Jepang-1024x640.jpg)" /* Ganti dengan path gambar Anda */,
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
              <form className=" card-body-color p-lg-5" onSubmit={handleSubmit}>
                <div className="mb-3 tgh">
                  <h3 className="text-center">REGISTER</h3>
                  <input
                    type="text"
                    className="form-control"
                    id="Username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="User Name"
                    name="username"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    id="email"
                    name="email"
                    placeholder="email"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    id="password"
                    name="password"
                    placeholder="password"
                  />
                </div>
                <div className="">
                  <label htmlFor="role" className="form-label"></label>
                  <select
                    className="form-select"
                    id="role"
                    value={formData.role}
                    onChange={handleChange}
                    name="role"
                  >
                    <option value="supervisor">Supervisor</option>
                    <option value="operator">Operator</option>
                  </select>
                </div>
                <br />
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-color px-5 mb-5 w-100"
                  >
                    Register
                  </button>
                </div>

                <div id="login" classNaBelumme="text-center mb-5 text-dark">
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
