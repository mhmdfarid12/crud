import React, { Fragment, useEffect, useState } from "react";
import { Button, Table, Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "../css/Table.css";

import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Tabel() {
  // Tambahkan useNavigate
  const userRole = localStorage.getItem("UserRole");

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  const [currPage, setCurrPage] = useState(1);
  const [srcTerm, setSrcTerm] = useState("");
  const [rcdPerPage, setRcdPerPage] = useState(5);

  const [accounts, setAccounts] = useState([]);
  const [rooms, setRooms] = useState([]);

  // function for supervisor START

  const getAccounts = async () => {
    try {
      const respons = await axios.get("http://localhost:1234/accounts");
      const allAccounts = respons.data;
      const filteredAccounts = allAccounts.filter(
        (employee) =>
          employee.username
            ?.toLowerCase()
            .includes(searchTerm?.toLowerCase()) &&
          employee.role !== "supervisor"
      );
      setAccounts(filteredAccounts);
      console.log(filteredAccounts);
    } catch (error) {
      console.log(error);
    }
  };

  const firstIndex = (currentPage - 1) * recordsPerPage;
  const lastIndex = currentPage * recordsPerPage;
  const npg = Math.ceil(rooms.length / recordsPerPage);
  const num = [...Array(npg + 1).keys()].slice(1);
  const records = accounts.slice(firstIndex, lastIndex);

  const npage = Math.ceil(accounts.length / recordsPerPage);
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

  const handleDelete = async (id) => {
    try {
      const respons = await axios.delete(
        `http://localhost:1234/accounts/${id}`
      );
      console.log(respons);
      console.log("deleted");
      getAccounts();
    } catch (error) {
      console.log(error);
    }

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

  const getRooms = async () => {
    try {
      const respons = await axios.get("http://localhost:1234/rooms");
      const allRooms = respons.data;
      const filteredRooms = allRooms.filter((employee) =>
        employee.noLantai?.toLowerCase().includes(srcTerm?.toLowerCase())
      );
      setRooms(filteredRooms);
      console.log(filteredRooms);
    } catch (error) {
      console.log(error);
    }
  };

  const firstIdx = (currPage - 1) * rcdPerPage;
  const lastIdx = currPage * rcdPerPage;

  const rcd = rooms.slice(firstIdx, lastIdx);

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

  const del = async (id) => {
    try {
      const respons = await axios.delete(` http://localhost:1234/rooms/${id}`);
      console.log(respons);
      console.log("deleted");
      getRooms();
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => {
    getAccounts();
    getRooms();
  }, [srcTerm, searchTerm]);

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
                  <Nav.Link href="/profile">PROFILE</Nav.Link>
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
                  {accounts && accounts.length > 0 ? (
                    records.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.username}</td>
                          <td>{item.email}</td>
                          <td>{item.password}</td>
                          <td>{item.role}</td>
                          <td>
                            <Link to={`/edit/${item.id}`}>
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
                    <Nav.Link href="/profile">PROFILE</Nav.Link>
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
                  {rooms && rooms.length > 0 ? (
                    rcd.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.noLantai}</td>
                          <td>{item.noKamar}</td>

                          <td>
                            <Link to={`/edit/${item.id}`}>
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
