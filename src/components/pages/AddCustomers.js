import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { v4 as uuid } from "uuid";

import { Await, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddCustomers() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [payMethod, setPayMethod] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ids = uuid();
    let uniqueId = ids.slice(0, 8);

    const riquest = {
      id: uniqueId,
      name: name,
      phone: phone,
      payMethod: payMethod,
    };
    try {
      const respons = await axios.post(
        "http://localhost:1234/customers",
        riquest
      );
      console.log(respons);
      console.log("added");
    } catch (error) {
      console.log(error);
    }

    navigate("/tableCustomers");
  };
  const kembali = () => {
    navigate("/tableCustomers");
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
        <Form
          className="d-grid gap-2"
          style={{ margin: "15rem" }}
          onSubmit={handleSubmit} // Menambahkan event handler untuk form submission
        >
          <Form.Group className="mb-3" controlId="forUsername">
            <h4>Add Customers</h4>
            <Form.Control
              type="text"
              placeholder="name"
              required
              value={name} // Menambahkan value agar input terkait dengan state
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="forEmail">
            <Form.Control
              type="number" // Mengubah tipe input ke 'email'
              placeholder="phone"
              required
              value={phone} // Menambahkan value agar input terkait dengan state
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>
          <label htmlFor="payMethod">
            <select
              className=""
              style={{ width: "300px", height: "40px", borderRadius: "5px" }}
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
            CREATE
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
      </div>
    </div>
  );
}
export default AddCustomers;
