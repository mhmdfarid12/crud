import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { v4 as uuid } from "uuid";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

function AddReportSewa() {
  const [dateTime, setDateTime] = useState("");
  const [rooms, setRooms] = useState("");
  const [capacity, setCapacity] = useState("");
  const [snack, setSnack] = useState("");

  const [extraTime, setExtraTime] = useState("");
  const [booking, setBooking] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ids = uuid();
    let uniqueId = ids.slice(0, 8);
    const riquest = {
      id: uniqueId,
      dateTime: dateTime,
      rooms: rooms,
      capacity: capacity,
      snack: snack,

      extraTime: extraTime,
      booking: booking,
    };
    try {
      const respons = await axios.post(
        " http://localhost:1234/report",
        riquest
      );
      console.log(respons);
      console.log("added");
    } catch (error) {
      console.log(error);
    }

    navigate("/reportSewa");
  };
  const kembali = () => {
    navigate("/reportSewa");
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
          <Form.Group className="mb-3" controlId="forRooms">
            <h4>Add Report Sewa</h4>
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
          <Form.Group className="mb-3" controlId="forBooking">
            <Form.Control
              type="text" // Mengubah tipe input ke 'email'
              placeholder="dateTime"
              required
              value={dateTime} // Menambahkan value agar input terkait dengan state
              onChange={(e) => setDateTime(e.target.value)}
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
          <Button
            style={{
              background: "purple",
              width: "143px",
              height: "40px",
              borderRadius: "10px",
              backgroundColor: "blue",
            }}
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
export default AddReportSewa;