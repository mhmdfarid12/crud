import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Employees from "./Employees";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";

function Add() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [id, setId] = useState("");

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const ids = uuid();
    let uniqueId = ids.slice(0, 8);

    let a = name,
      b = age;

    Employees.push({ id: uniqueId, name: a, age: b });

    navigate("/");
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
      <Form className="d-grid gap-2" style={{ margin: "15rem" }}>
        <Form.Group className="mg-3" controlId="forName">
          <Form.Control
            type="text"
            placeholder="Enter Name"
            required
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mg-3" controlId="forAge">
          <Form.Control
            type="number"
            placeholder="Enter Age"
            required
            onChange={(e) => setAge(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button onClick={(e) => handleSubmit(e)} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Add;
