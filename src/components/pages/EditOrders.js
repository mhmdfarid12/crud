import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { v4 as uuid } from "uuid";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditOrders() {
  const [rooms, setRooms] = useState("");
  const [capacity, setCapacity] = useState("");
  const [snack, setSnack] = useState("");
  const [lunch, setLunch] = useState("");
  const [extraTime, setExtraTime] = useState("");
  const [booking, setBooking] = useState("");
  const [id, setId] = useState("");

  let history = useNavigate();
  const param = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const riquest = {
      rooms: rooms,
      capacity: capacity,
      snack: snack,
      lunch: lunch,
      extraTime: extraTime,
      booking: booking,
    };
    try {
      const respons = await axios.put(
        `http://localhost:1234/orders/${param.id}`,
        riquest
      );
      console.log(respons.data);
      console.log("updated");
    } catch (error) {
      console.log(error);
    }
    history("/tableOrders");
  };

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setRooms(localStorage.getItem("rooms"));
    setCapacity(localStorage.getItem("capacity"));
    setSnack(localStorage.getItem("snack"));
    setLunch(localStorage.getItem("lunch"));
    setExtraTime(localStorage.getItem("extraTime"));
    setBooking(localStorage.getItem("booking"));
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
                placeholder="rooms"
                value={rooms}
                required
                onChange={(e) => setRooms(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Control
                type="text"
                placeholder="capacity"
                value={capacity}
                required
                onChange={(e) => setCapacity(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Control
                type="text"
                placeholder="booking"
                value={booking}
                required
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

export default EditOrders;
