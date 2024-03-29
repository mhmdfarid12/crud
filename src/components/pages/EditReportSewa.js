import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditReportSewa() {
  const navigate = useNavigate();
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
  const kembali = () => {
    navigate("/reportSewa");
  };
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
              height: "690px",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <Form className="d-grid gap-2">
              <h4>Edit Report Sewa</h4>
              <label>Rooms</label>
              <Form.Group className="mb-3" controlId="name">
                <Form.Control
                  type="text"
                  placeholder="rooms"
                  value={rooms}
                  required
                  onChange={(e) => setRooms(e.target.value)}
                />
              </Form.Group>
              <label>Capacity</label>
              <Form.Group className="mb-3" controlId="phone">
                <Form.Control
                  type="text"
                  placeholder="capacity"
                  value={capacity}
                  required
                  onChange={(e) => setCapacity(e.target.value)}
                />
              </Form.Group>
              <label>Booking</label>
              <Form.Group className="mb-3" controlId="phone">
                <Form.Control
                  type="text"
                  placeholder="booking"
                  value={booking}
                  required
                  onChange={(e) => setBooking(e.target.value)}
                />
              </Form.Group>
              <label>Date Time</label>
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

export default EditReportSewa;
