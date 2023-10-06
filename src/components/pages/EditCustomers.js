import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { v4 as uuid } from "uuid";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditCustomers() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [payMethod, setPayMethod] = useState("");
  const [id, setId] = useState("");

  let history = useNavigate();
  const param = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const riquest = {
      name: name,
      phone: phone,
      payMethod: payMethod,
    };
    try {
      const respons = await axios.put(
        `http://localhost:1234/customers/${param.id}`,
        riquest
      );
      console.log(respons.data);
      console.log("updated");
    } catch (error) {
      console.log(error);
    }
    history("/tableCustomers");
  };

  useEffect(() => {
    setName(localStorage.getItem("name"));
    setPhone(localStorage.getItem("phone"));
    setPayMethod(localStorage.getItem("payMethod"));
    setId(localStorage.getItem("Id"));
  }, []);

  //const super visor END

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
        <div className="home">
          <Form className="d-grid gap-2" style={{ width: "300px" }}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Control
                type="text"
                placeholder="name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Control
                type="text"
                placeholder="Phone"
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <label htmlFor="payMethod">
              <div>payMethod:</div>
              <select
                className=""
                style={{ width: "300px", height: "40px", borderRadius: "5px" }}
                h
                name="payMethod"
                id="payMethod"
                value={payMethod}
                onChange={(e) => setPayMethod(e.target.value)}
              >
                <option value="Cash">Cash</option>
                <option value="Kredit">Kredit</option>
                <option value="Debit">Debit</option>
              </select>
            </label>
            <br></br>
            <Button
              style={{ background: "purple" }}
              onClick={(e) => handleSubmit(e)}
              type="submit"
            >
              UPDATE
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default EditCustomers;
