import React, { Fragment, useState } from "react";
import { Button, Table, Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Accounts from "../database/Accounts";
import Rooms from "../database/Rooms";
import TableOrders from "./TableOrders";
import TableCustomers from "./TableCustomers";
import "../css/Table.css";

import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";

function Tabel() {
  // Tambahkan useNavigate
  const userRole = localStorage.getItem("UserRole");

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  // function for supervisor START
  const firstIndex = (currentPage - 1) * recordsPerPage;
  const lastIndex = currentPage * recordsPerPage;

  const filteredEmployees = Accounts.filter(
    (employee) =>
      employee.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
      employee.role !== "supervisor"
  );

  const records = filteredEmployees.slice(firstIndex, lastIndex);

  const npage = Math.ceil(filteredEmployees.length / recordsPerPage);
  const number = [...Array(npage + 1).keys()].slice(1);

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changePage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  const handleEdit = (id, username, email, password) => {
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("Id", id);
    localStorage.setItem("password", password);
  };

  const handleDelete = (id) => {
    var index = Accounts.map(function (e) {
      return e.id;
    }).indexOf(id);
    Accounts.splice(index, 1);

    navigate("/table");
  };
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
  // function for supervisor END

  // function for operator START

  const [currPage, setCurrPage] = useState(1);
  const [srcTerm, setSrcTerm] = useState("");
  const [rcdPerPage, setRcdPerPage] = useState(5);

  const firstIdx = (currPage - 1) * rcdPerPage;
  const lastIdx = currPage * rcdPerPage;

  const filteredOperator = Rooms.filter(
    (employee) =>
      employee.noLantai.toLowerCase().includes(srcTerm.toLowerCase()) &&
      employee.role !== "supervisor"
  );

  const rcd = filteredOperator.slice(firstIdx, lastIdx);

  const npg = Math.ceil(filteredOperator.length / recordsPerPage);
  const num = [...Array(npg + 1).keys()].slice(1);

  function prPage() {
    if (currPage !== 1) {
      setCurrPage(currPage - 1);
    }
  }

  function changPage(id) {
    setCurrPage(id);
  }

  function nxtPage() {
    if (currPage !== npg) {
      setCurrPage(currPage + 1);
    }
  }

  const edit = (id, noLantai, noKamar) => {
    localStorage.setItem("noLantai", noLantai);
    localStorage.setItem("noKamar", noKamar);
    localStorage.setItem("Id", id);
  };

  const del = (id) => {
    var index = Rooms.map(function (e) {
      return e.id;
    }).indexOf(id);
    Rooms.splice(index, 1);

    navigate("/table");
  };
  const logout = () => {
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

  //function operator END

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
          //tabel dari super visor START
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
                    <Nav.Link href="/TableOrders">Table orders</Nav.Link>
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
                  placeholder="search"
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
                    <th>Username</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees && filteredEmployees.length > 0 ? (
                    records.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.username}</td>
                          <td>{item.email}</td>
                          <td>{item.password}</td>
                          <td>{item.role}</td>
                          <td>
                            <Link to={"/edit"}>
                              <Button
                                style={{ background: "purple" }}
                                onClick={() =>
                                  handleEdit(
                                    item.id,
                                    item.username,
                                    item.email,
                                    item.password
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
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="3">No data available</td>
                    </tr>
                  )}
                </tbody>
              </Table>

              <Pagination>
                <Pagination.Prev onClick={prePage} />
                {number.map((n, i) => (
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

              <br />
              <Link className="d-grid gap-2" to="/create">
                <Button style={{ background: "purple" }} size="lg">
                  Create
                </Button>
              </Link>
            </div>
          </Fragment>
        ) : (
          //tabel super visor END

          //tabel operator START
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
                    <Nav.Link href="/tableCustomers">Table Customers</Nav.Link>
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
                    <button onClick={logout} className="btn btn-danger">
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
                  placeholder="search"
                  value={srcTerm}
                  onChange={(e) => setSrcTerm(e.target.value)}
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
                    value={rcdPerPage}
                    onChange={(e) =>
                      setCurrPage(1) || setRcdPerPage(Number(e.target.value))
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
                    <th>Nomor lantai</th>
                    <th>Nomor kamar</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOperator && filteredOperator.length > 0 ? (
                    rcd.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.noLantai}</td>
                          <td>{item.noKamar}</td>

                          <td>
                            <Link to={"/edit"}>
                              <Button
                                style={{ background: "purple" }}
                                onClick={() =>
                                  edit(item.id, item.noLantai, item.noKamar)
                                }
                              >
                                EDIT
                              </Button>
                            </Link>
                            &nbsp;
                            <Button
                              style={{ background: "purple" }}
                              onClick={() => del(item.id)}
                            >
                              DELETE
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="3">No data available</td>
                    </tr>
                  )}
                </tbody>
              </Table>

              <Pagination>
                <Pagination.Prev onClick={prPage} />
                {num.map((n, i) => (
                  <Pagination.Item
                    key={i}
                    active={currentPage === n}
                    onClick={() => changPage(n)}
                  >
                    {n}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={nxtPage} />
              </Pagination>

              <br />
              <Link className="d-grid gap-2" to="/create">
                <Button style={{ background: "purple" }} size="lg">
                  Create
                </Button>
              </Link>
            </div>
          </Fragment>

          //tabel operator END
        )}
      </div>
    </div>
  );
}

export default Tabel;
