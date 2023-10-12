import React, { Fragment, useState, useEffect } from "react";
import { Button, Table, Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";

import axios from "axios";

function ReportSewa() {
  const userRole = localStorage.getItem("UserRole");
  const [reportList, setReport] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [rooms, setRooms] = useState("");
  const [capacity, setCapacity] = useState("");
  const [snack, setSnack] = useState(false);

  const [extraTime, setExtraTime] = useState("");
  const [booking, setBoking] = useState(false);
  const [approve, setApprove] = useState("");

  const handleDelete = async (id) => {
    try {
      const respons = await axios.delete(`http://localhost:1234/report/${id}`);
      console.log(respons);
      console.log("deleted");
      getOrder();
    } catch (error) {
      console.log(error);
    }
    Swal.fire({
      position: "top-middle",
      icon: "success",
      title: "Delete berhasil!!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const firstIndex = (currentPage - 1) * recordsPerPage;
  const lastIndex = currentPage * recordsPerPage;

  const getOrder = async () => {
    try {
      const response = await axios.get("http://localhost:1234/report");
      const allReport = response.data;
      console.log(allReport);
      const filteredReport = allReport.filter((order) =>
        order.rooms?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
      setReport(filteredReport);
      console.log(filteredReport);
    } catch (error) {
      console.log(error);
    }
  };

  const records = reportList.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(reportList.length / recordsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    getOrder();
  }, [searchTerm]);

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changePage(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function nextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

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

  const handleSubmit = (e) => {
    Swal.fire({
      position: "top-middle",
      icon: "success",
      title: "Approve berhasil!!",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/home");
  };

  const disableButton = async (
    e,
    id,
    dateTime,
    rooms,
    capacity,
    snack,

    extraTime,
    booking
  ) => {
    e.preventDefault();
    const riquest = {
      dateTime: dateTime,
      rooms: rooms,
      capacity: capacity,
      snack: snack,

      extraTime: extraTime,
      booking: booking,
      approve: true,
    };
    try {
      const respons = await axios.put(
        `http://localhost:1234/report/${id}`,
        riquest
      );
      console.log(respons.data);
      Swal.fire({
        position: "top-middle",
        icon: "success",
        title: "Approve berhasil!!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
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
      <div className="tabel">
        {userRole === "supervisor" ? (
          <Fragment>
            <Navbar
              style={{ background: "grey" }}
              bg="light"
              expand="lg"
              className="bg-body-tertiary"
            >
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
                      <NavDropdown.Item href="#action/3.1">
                        Action
                      </NavDropdown.Item>
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

            <div className="div" style={{ margin: "10rem" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: "400px",
                    height: "40px",
                    fontSize: "15px",
                    borderRadius: "5px",
                    marginRight: "10px",
                  }}
                />
                <span>
                  <select
                    value={recordsPerPage}
                    onChange={(e) => {
                      setCurrentPage(1);
                      setRecordsPerPage(Number(e.target.value));
                    }}
                    style={{
                      width: "100px",
                      height: "40px",
                      fontSize: "15px",
                      borderRadius: "5px",
                      marginRight: "10px",
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                  </select>
                </span>
              </div>
              <br />
              <br />
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Date Time</th>
                    <th>Rooms</th>
                    <th>Capacity</th>
                    <th>Snack</th>

                    <th>Extra Time</th>
                    <th>Booking</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((item, index) => (
                    <tr key={index}>
                      <td>{item.dateTime}</td>
                      <td>{item.rooms}</td>
                      <td>{item.capacity}</td>
                      <td>{item.snack === true ? "ada" : "tidak ada"}</td>

                      <td>{item.extraTime === true ? "ada" : "tidak ada"}</td>
                      <td>{item.booking}</td>
                      <td>
                        <form action="" onSubmit={handleSubmit}>
                          <button
                            style={{
                              background: "grey",
                              borderRadius: "5px",
                            }}
                            disabled={item.approve ? true : false}
                            onClick={(e) =>
                              disableButton(
                                e,
                                item.id,
                                item.dateTime,
                                item.rooms,
                                item.capacity,
                                item.snack,

                                item.extraTime,
                                item.booking
                              )
                            }
                          >
                            Approve
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Pagination>
                <Pagination.Prev onClick={prePage} />
                {pageNumbers.map((number) => (
                  <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => changePage(number)}
                  >
                    {number}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={nextPage} />
              </Pagination>
            </div>
          </Fragment>
        ) : (
          //Tabel orders role operator

          <Fragment>
            <Navbar
              style={{ background: "grey" }}
              bg="light"
              expand="lg"
              className="bg-body-tertiary"
            >
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
                      <NavDropdown.Item href="#action/3.1">
                        Action
                      </NavDropdown.Item>
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

            <div className="div" style={{ margin: "10rem" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: "400px",
                    height: "40px",
                    fontSize: "15px",
                    borderRadius: "5px",
                    marginRight: "10px",
                  }}
                />
                <span>
                  <select
                    value={recordsPerPage}
                    onChange={(e) =>
                      setCurrentPage(1) ||
                      setRecordsPerPage(Number(e.target.value))
                    }
                    style={{
                      width: "100px",
                      height: "40px",
                      fontSize: "15px",
                      borderRadius: "5px",
                      marginRight: "10px",
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                  </select>
                </span>
              </div>
              <br />
              <br />
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Date Time</th>
                    <th>Rooms</th>
                    <th>Capacity</th>
                    <th>Snack</th>

                    <th>Extra Time</th>
                    <th>Booking</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {records.map((item, index) => (
                    <tr key={index}>
                      <td>{item.dateTime}</td>
                      <td>{item.rooms}</td>
                      <td>{item.capacity}</td>
                      <td>{item.snack === true ? "ada" : "tidak ada"}</td>

                      <td>{item.extraTime === true ? "ada" : "tidak ada"}</td>
                      <td>{item.booking}</td>
                      <td>
                        <Link to={`/editReportSewa/${item.id}`}>
                          <Button style={{ background: "grey" }}>EDIT</Button>
                        </Link>
                        &nbsp;
                        <Button
                          style={{ background: "grey" }}
                          onClick={() => handleDelete(item.id)}
                        >
                          DELETE
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Pagination>
                <Pagination.Prev onClick={prePage} />
                {pageNumbers.map((n, i) => (
                  <Pagination.Item
                    key={i}
                    active={currentPage === n}
                    onClick={() => changePage(n)}
                  >
                    {n}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={nextPage} />
              </Pagination>
              <br></br>
              <Link className="d-grid gap-2" to="/AddReportSewa">
                <Button style={{ background: "grey" }} size="lg">
                  Create
                </Button>
              </Link>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}

export default ReportSewa;
