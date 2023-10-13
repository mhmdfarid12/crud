import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { v4 as uuid } from "uuid";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditCustomers() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [payMethod, setPayMethod] = useState("");
  const [id, setId] = useState("");

  let history = useNavigate();
  const param = useParams();

  const getById = async () => {
    try {
      const respons = await axios.get(
        `http://localhost:1234/customers/${param.id}`
      );
      const resData = respons.data;
      setName(resData.rooms);
      setPhone(resData.phone);
      setPayMethod(resData.payMethod);

      console.log(resData);
    } catch (error) {
      console.log(error);
    }
  };

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

  const kembali = () => {
    navigate("/tableCustomers");
  };

  useEffect(() => {
    getById();
  }, []);

  //const super visor END

  return (
    <div>
      <div
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-vector/paper-style-white-monochrome-background_23-2149000982.jpg?w=826&t=st=1697102479~exp=1697103079~hmac=1c79075f3069e702f954e9de0789b464a3dc62c98b37d0c76da2f4b9f244d670)",
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
          <div
            className="home"
            style={{
              // backgroundColor: "grey",
              border: "1px solid black",
              backgroundColor: " grey",
              width: "345px",
              height: "400px",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h4>Edit Customers</h4>
            <Form className="d-grid gap-2" style={{ width: "300px" }}>
              <Form.Group className="mb-3" controlId="name">
                <label>Name</label>
                <Form.Control
                  type="text"
                  placeholder="name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="phone">
                <label>Phone</label>
                <Form.Control
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  required
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>
              <label htmlFor="payMethod">
                <label>payMethod</label>
                <select
                  className=""
                  style={{
                    width: "300px",
                    height: "40px",
                    borderRadius: "5px",
                  }}
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
                style={{
                  background: "grey",
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCustomers;
