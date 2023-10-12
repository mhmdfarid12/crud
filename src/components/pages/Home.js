import React from "react";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Home = () => {
  const navigate = useNavigate(); // Tambahkan useNavigate
  const userRole = localStorage.getItem("UserRole");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");

    Swal.fire({
      position: "top-middle",
      icon: "success",
      title: "LOGOUT Berhasil!!",
      showConfirmButton: false,
      timer: 1500,
    });
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
      }}
    >
      <Navbar bg="light" expand="lg" className="bg-body-tertiary">
        <Container style={{ background: "grey" }}>
          <Navbar.Brand href="#home">Sewa ruang</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <Nav.Link href="/table">Table</Nav.Link>
              <Nav.Link href="/TableOrders">Table orders</Nav.Link>
              <Nav.Link href="/TableCustomers">Table Customers</Nav.Link>
              <Nav.Link href="/reportSewa">Report Sewa</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <button onClick={handleLogout} className="btn btn-danger">
                LOGOUT
              </button>
            </Nav>
            <Nav.Link href="/profile">PROFILE</Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br></br>
      <div className="home">
        {userRole === "supervisor" ? (
          <h1>WELCOME SUPERVISOR</h1>
        ) : (
          <h1> WELCOME OPERATOR</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
