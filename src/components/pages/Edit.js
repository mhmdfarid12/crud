import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Employees from "./Employees";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";

function Edit() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [id, setId] = useState("");

  let history = useNavigate();

  useEffect(() => {
    setName(localStorage.getItem("Name"));
    setAge(localStorage.getItem("Age"));
    setId(localStorage.getItem("Id"));
  }, []);

  var index = Employees.map(function (e) {
    return e.id;
  }).indexOf(id);

  const handleSubmit = (e) => {
    e.preventDefault();

    let a = Employees[index];
    a.name = name;
    a.age = age;
    history("/Table");
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
        <Form className="d-grid gap-2" style={{ width: "300px" }}>
          <Form.Group className="mb-3" controlId="forName">
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="forAge">
            <Form.Control
              type="text"
              placeholder="Enter Age"
              value={age}
              required
              onChange={(e) => setAge(e.target.value)}
            />
          </Form.Group>
          <Button onClick={(e) => handleSubmit(e)} type="submit">
            UPDATE
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Edit;
