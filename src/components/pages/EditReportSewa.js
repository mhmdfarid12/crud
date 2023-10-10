import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditReportSewa() {
  const [dateTime, setDateTime] = useState("");
  const [rooms, setRooms] = useState("");
  const [capacity, setCapacity] = useState("");
  const [snack, setSnack] = useState("");

  const [extraTime, setExtraTime] = useState("");
  const [booking, setBooking] = useState("");
  const [id, setId] = useState("");

  let history = useNavigate();
  const param = useParams();

  const getById = async () => {
    try {
      const respons = await axios.get(
        `http://localhost:1234/report/${param.id}`
      );
      const resData = respons.data;
      setDateTime(resData.dateTime);
      setRooms(resData.rooms);
      setCapacity(resData.capacity);
      setSnack(resData.snack);

      setExtraTime(resData.extraTime);
      setBooking(resData.booking);
      console.log(resData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const riquest = {
      dateTime: dateTime,
      rooms: rooms,
      capacity: capacity,
      snack: snack,
      extraTime: extraTime,
      booking: booking,
    };
    try {
      const respons = await axios.put(
        ` http://localhost:1234/report/${param.id}`,
        riquest
      );
      const resData = respons.data;
      setDateTime(resData.dateTime);
      setRooms(resData.rooms);
      setCapacity(resData.capacity);
      setSnack(resData.snack);

      setExtraTime(resData.extraTime);
      setBooking(resData.booking);
      console.log(respons.data);

      console.log("updated");
    } catch (error) {
      console.log(error);
    }
    history("/reportSewa");
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
            <Form.Group className="mb-3" controlId="phone">
              <Form.Control
                type="text"
                placeholder="dateTime"
                value={dateTime}
                required
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

export default EditReportSewa;
