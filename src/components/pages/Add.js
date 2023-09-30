import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Accounts from "../database/Accounts";
import Rooms from "../database/Rooms";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";

function Add() {
  const userRole = localStorage.getItem("UserRole");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [noLantai, setNoLantai] = useState("");
  const [noKamar, setNoKamar] = useState("");

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const ids = uuid();
    let uniqueId = ids.slice(0, 8);

    let a = username,
      b = email,
      c = password;

    Accounts.push({
      id: uniqueId,
      username: a,
      email: b,
      password: c,
      role: "operator",
    });

    navigate("/table");
  };
  // function super END

  //function operator START

  const handelSubmit = (e) => {
    e.preventDefault();

    const ids = uuid();
    let uniqueId = ids.slice(0, 8);

    let a = noLantai,
      b = noKamar;

    Rooms.push({
      id: uniqueId,
      noLantai: a,
      noKamar: b,
    });

    navigate("/table");
  };

  return (
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
      <div className="home">
        {userRole === "supervisor" ? (
          //tabel super visor start
          <Form
            className="d-grid gap-2"
            style={{ margin: "15rem" }}
            onSubmit={handleSubmit} // Menambahkan event handler untuk form submission
          >
            <Form.Group className="mb-3" controlId="forUsername">
              <Form.Control
                type="text"
                placeholder="Username"
                required
                value={username} // Menambahkan value agar input terkait dengan state
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="forEmail">
              <Form.Control
                type="email" // Mengubah tipe input ke 'email'
                placeholder="Email"
                required
                value={email} // Menambahkan value agar input terkait dengan state
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="forPassword">
              <Form.Control
                type="password" // Mengubah tipe input ke 'password'
                placeholder="Password"
                required
                value={password} // Menambahkan value agar input terkait dengan state
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button style={{ background: "purple" }} type="submit">
              Submit
            </Button>
          </Form>
        ) : (
          //tabel super visor END

          //tabel operator START

          <Form
            className="d-grid gap-2"
            style={{ margin: "15rem" }}
            onSubmit={handelSubmit} // Menambahkan event handler untuk form submission
          >
            <Form.Group className="mb-3" controlId="forUsername">
              <Form.Control
                type="text"
                placeholder="Nomer lantai"
                required
                value={noLantai} // Menambahkan value agar input terkait dengan state
                onChange={(e) => setNoLantai(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="forEmail">
              <Form.Control
                type="text" // Mengubah tipe input ke 'email'
                placeholder="Nomor kamar"
                required
                value={noKamar} // Menambahkan value agar input terkait dengan state
                onChange={(e) => setNoKamar(e.target.value)}
              />
            </Form.Group>

            <Button style={{ background: "purple" }} type="submit">
              Submit
            </Button>
          </Form>

          //tabel operator END
        )}
      </div>
    </div>
  );
}
export default Add;
