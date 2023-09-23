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
    setName(localStorage.getItem('Name'));
    setAge(localStorage.getItem('Age'));
    setId(localStorage.getItem('Id'));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id !== "") {
      let index = Employees.findIndex(e => e.id === id);
      if (index !== -1) {
        let updatedEmployee = { ...Employees[index], Name: name, Age: age };
        Employees[index] = updatedEmployee;
      }
    }
    history("/");
  }

  return (
    <div>
      <Form className="d-grid gap-2" style={{ margin: "15rem" }}>
        <Form.Group className="mg-3" controlId="forName">
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mg-3" controlId="forAge">
          <Form.Control
            type="text"
            placeholder="Enter Age"
            value={age}
            required
            onChange={(e) => setAge(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button onClick={(e) => handleSubmit(e)} type="submit">UPDATE</Button>
      </Form>
    </div>
  )
}

export default Edit;