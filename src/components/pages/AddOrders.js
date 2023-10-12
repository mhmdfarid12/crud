import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { v4 as uuid } from "uuid";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

function AddOrders() {
  const [rooms, setRooms] = useState("");
  const [capacity, setCapacity] = useState("");
  const [snack, setSnack] = useState("");
  const [lunch, setLunch] = useState("");
  const [extraTime, setExtraTime] = useState("");
  const [booking, setBooking] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ids = uuid();
    let uniqueId = ids.slice(0, 8);
    const riquest = {
      id: uniqueId,
      rooms: rooms,
      capacity: capacity,
      snack: snack,
      lunch: lunch,
      extraTime: extraTime,
      booking: booking,
    };
    try {
      const respons = await axios.post("http://localhost:1234/orders", riquest);
      console.log(respons);
      console.log("added");
    } catch (error) {
      console.log(error);
    }

    navigate("/tableOrders");
  };

  const kembali = () => {
    navigate("/tableOrders");
  };

  return (
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
        <Form
          className="d-grid gap-2"
          style={{ margin: "15rem" }}
          onSubmit={handleSubmit} // Menambahkan event handler untuk form submission
        >
          <div
            className="home"
            style={{
              // backgroundColor: "grey",
              border: "1px solid black",
              backgroundColor: " grey",
              width: "345px",
              height: "520px",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <Form.Group className="mb-3" controlId="forRooms">
              <h4>Add Orders</h4>
              <Form.Control
                type="text"
                placeholder="rooms"
                required
                value={rooms} // Menambahkan value agar input terkait dengan state
                onChange={(e) => setRooms(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="forCapacity">
              <Form.Control
                type="text" // Mengubah tipe input ke 'email'
                placeholder="capacity"
                required
                value={capacity} // Menambahkan value agar input terkait dengan state
                onChange={(e) => setCapacity(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="forBooking">
              <Form.Control
                type="text" // Mengubah tipe input ke 'email'
                placeholder="booking"
                required
                value={booking} // Menambahkan value agar input terkait dengan state
                onChange={(e) => setBooking(e.target.value)}
              />
            </Form.Group>
            <label htmlFor="snack" style={{ color: "white" }}>
              SNACK
            </label>
            <select
              className=""
              style={{ width: "300px", height: "40px", borderRadius: "5px" }}
              name="snack"
              id="snack"
              value={snack}
              onChange={(e) => setSnack(e.target.value)}
            >
              <option value="true">True</option>
              <option value="false">false</option>
            </select>

            <label htmlFor="snack" style={{ color: "white" }}>
              Lunch
            </label>
            <select
              className=""
              style={{ width: "300px", height: "40px", borderRadius: "5px" }}
              name="lunch"
              id="lunch"
              value={lunch}
              onChange={(e) => setLunch(e.target.value)}
            >
              <option value="true">True</option>
              <option value="false">false</option>
            </select>

            <label htmlFor="snack" style={{ color: "white" }}>
              Extra Time
            </label>
            <select
              className=""
              style={{ width: "300px", height: "40px", borderRadius: "5px" }}
              name="extraTime"
              id="extraTime"
              value={extraTime}
              onChange={(e) => setExtraTime(e.target.value)}
            >
              <option value="true">True</option>
              <option value="false">false</option>
            </select>
            <br></br>
            <br></br>
            <Button
              style={{
                background: "grey",
                width: "143px",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "blue",
                transform: "translate(-5%,5%)",
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
                transform: "translate(5%,5%)",
                borderRadius: "10px",
                backgroundColor: "red",
                color: "white",
              }}
            >
              kembali
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
export default AddOrders;
