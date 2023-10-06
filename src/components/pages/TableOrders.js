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

function TableOrders() {
  const userRole = localStorage.getItem("UserRole");
  const [ordersList, setOrdersList] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [disabledItems, setDisabledItems] = useState({});

  const handleEdit = (
    id,
    rooms,
    capacity,
    snack,
    lunch,
    extraTime,
    booking
  ) => {
    localStorage.setItem("Id", id);
    localStorage.setItem("rooms", rooms);
    localStorage.setItem("capacity", capacity);
    localStorage.setItem("snack", snack);
    localStorage.setItem("lunch", lunch);
    localStorage.setItem("extraTime", extraTime);
    localStorage.setItem("booking", booking);
  };

  const handleDelete = async (id) => {
    try {
      const respons = await axios.delete(`http://localhost:1234/orders/${id}`);
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
      const response = await axios.get("http://localhost:1234/orders");
      const allOrders = response.data;
      console.log(allOrders);
      const filteredOrders = allOrders.filter((order) =>
        order.rooms?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
      setOrdersList(filteredOrders);
      console.log(filteredOrders);
    } catch (error) {
      console.log(error);
    }
  };

  const records = ordersList.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(ordersList.length / recordsPerPage);
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

  const disableButton = (index) => {
    setDisabledItems((prev) => ({ ...prev, [index]: true }));

    Swal.fire({
      position: "top-middle",
      icon: "success",
      title: "Approve berhasil!!",
      showConfirmButton: false,
      timer: 1500,
    });
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
      }}
    >
      <div className="tabel">
        {userRole === "supervisor" ? (
          <Fragment>
            <Navbar
              style={{ background: "purple" }}
              bg="light"
              expand="lg"
              className="bg-body-tertiary"
            >
              <Container style={{ background: "purple" }}>
                <Navbar.Brand href="#home">Sewa ruang</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <Nav.Link href="/table">Table</Nav.Link>
                    <Nav.Link href="/tableOrders">Table orders</Nav.Link>
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
                    <th>ID</th>
                    <th>Rooms</th>
                    <th>Capacity</th>
                    <th>Snack</th>
                    <th>Lunch</th>
                    <th>Extra Time</th>
                    <th>Booking</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.rooms}</td>
                      <td>{item.capacity}</td>
                      <td>{item.snack === true ? "ada" : "tidak ada"}</td>
                      <td>{item.lunch === true ? "ada" : "tidak ada"}</td>
                      <td>{item.extraTime === true ? "ada" : "tidak ada"}</td>
                      <td>{item.booking}</td>
                      <td>
                        <button
                          style={{ background: "purple", borderRadius: "5px" }}
                          disabled={disabledItems[index]}
                          onClick={() => disableButton(index)}
                        >
                          Approve
                        </button>
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
              style={{ background: "purple" }}
              bg="light"
              expand="lg"
              className="bg-body-tertiary"
            >
              <Container style={{ background: "purple" }}>
                <Navbar.Brand href="#home">Sewa ruang</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <Nav.Link href="/table">Table</Nav.Link>
                    <Nav.Link href="/tableOrders">Table orders</Nav.Link>
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
                    <th>Rooms</th>
                    <th>Capacity</th>
                    <th>Snack</th>
                    <th>Lunch</th>
                    <th>Extra Time</th>
                    <th>Booking</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {records.map((item, index) => (
                    <tr key={index}>
                      <td>{item.rooms}</td>
                      <td>{item.capacity}</td>
                      <td>{item.snack === true ? "ada" : "tidak ada"}</td>
                      <td>{item.lunch === true ? "ada" : "tidak ada"}</td>
                      <td>{item.extraTime === true ? "ada" : "tidak ada"}</td>
                      <td>{item.booking}</td>
                      <td>
                        <Link to={`/editOrders/${item.id}`}>
                          <Button
                            style={{ background: "purple" }}
                            onClick={() =>
                              handleEdit(
                                item.id,
                                item.rooms,
                                item.capacity,
                                item.snack,
                                item.lunch,
                                item.extraTime,
                                item.booking
                              )
                            }
                          >
                            EDIT
                          </Button>
                        </Link>
                        &nbsp;
                        <Button
                          style={{ background: "purple" }}
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
              <Link className="d-grid gap-2" to="/addOrders">
                <Button style={{ background: "purple" }} size="lg">
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

export default TableOrders;
