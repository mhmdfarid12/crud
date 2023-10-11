import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { v4 as uuid } from "uuid";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Edit() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("UserRole");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");

  const [noLantai, setNolantai] = useState("");
  const [noKamar, setNokamar] = useState("");

  let history = useNavigate();
  const param = useParams();
  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    setEmail(localStorage.getItem("email"));
    setPassword(localStorage.getItem("password"));
    setId(localStorage.getItem("Id"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const riquest = {
      username: username,
      email: email,
      password: password,
      role: "operator",
    };
    try {
      const respons = await axios.put(
        `http://localhost:1234/accounts/${param.id}`,
        riquest
      );
      console.log(respons.data);
      console.log("updated");
    } catch (error) {
      console.log(error);
    }
    history("/Table");
  };
  //const super visor END

  //const operator Start
  useEffect(() => {
    setNolantai(localStorage.getItem("noKamar"));
    setNokamar(localStorage.getItem("noKamar"));
  }, []);

  const Submit = async (e) => {
    e.preventDefault();

    const riquest = {
      noLantai: noLantai,
      noKamar: noKamar,
    };
    try {
      const respons = await axios.put(
        `http://localhost:1234/rooms/${param.id}`,
        riquest
      );
      console.log(respons.data);
      console.log("updated");
    } catch (error) {
      console.log(error);
    }

    history("/Table");
  };
  const kembali = () => {
    navigate("/Table");
  };
  return (
    <div>
      <div
        style={{
          backgroundImage:
            "url(https://www.gotravelly.com/blog/wp-content/uploads/2019/10/Gunung-Fuji-Jepang-1024x640.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* //edit super visor start */}
        <div className="home">
          {userRole === "supervisor" ? (
            <Form className="d-grid gap-2" style={{ width: "300px" }}>
              <h4>Edit Tabel</h4>
              <Form.Group className="mb-3" controlId="forName">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="forAge">
                <Form.Control
                  type="text"
                  placeholder="Email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="forAge">
                <Form.Control
                  type="text"
                  placeholder="Password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button
                style={{
                  background: "purple",
                  width: "143px",
                  height: "40px",
                  borderRadius: "10px",
                  backgroundColor: "blue",
                }}
                onClick={(e) => handleSubmit(e)}
                type="submit"
              >
                UPDATE
              </Button>
              <button
                onClick={kembali}
                style={{
                  width: "143px",
                  height: "40px",
                  transform: "translate(110%, -120%)",
                  borderRadius: "10px",
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                kembali
              </button>
            </Form>
          ) : (
            //edit super visor END
            //edit operator START
            <Form className="d-grid gap-2" style={{ width: "300px" }}>
              <h4>Edit Tabel</h4>
              <Form.Group className="mb-3" controlId="forName">
                <Form.Control
                  type="text"
                  placeholder="Nomer lantai"
                  value={noLantai}
                  required
                  onChange={(e) => setNolantai(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="forAge">
                <Form.Control
                  type="text"
                  placeholder="Nomor kamar"
                  value={noKamar}
                  required
                  onChange={(e) => setNokamar(e.target.value)}
                />
              </Form.Group>

              <Button
                style={{
                  background: "purple",
                  width: "143px",
                  height: "40px",
                  borderRadius: "10px",
                  backgroundColor: "blue",
                }}
                onClick={(e) => Submit(e)}
                type="submit"
              >
                UPDATE
              </Button>
              <button
                onClick={kembali}
                style={{
                  width: "143px",
                  height: "40px",
                  transform: "translate(110%, -120%)",
                  borderRadius: "10px",
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                kembali
              </button>
            </Form>
            //edit operator END
          )}
        </div>
      </div>
    </div>
  );
}

export default Edit;
