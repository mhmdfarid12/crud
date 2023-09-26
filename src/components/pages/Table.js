import React, { Fragment, useState } from "react";
import { Button, Table, Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Employees from "./Employees";

import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";

function Tabel() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  const firstIndex = (currentPage - 1) * recordsPerPage;
  const lastIndex = currentPage * recordsPerPage;

  const filteredEmployees = Employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  let history = useNavigate();

  const handleEdit = (id, name, age) => {
    localStorage.setItem("Name", name);
    localStorage.setItem("Age", age);
    localStorage.setItem("Id", id);
  };

  const handleDelete = (id) => {
    var index = Employees.map(function (e) {
      return e.id;
    }).indexOf(id);
    Employees.splice(index, 1);

    history("/");
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
      <Fragment>
        <Navbar bg="light" expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">Sewa ruang</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <Nav.Link href="/table">Table</Nav.Link>
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
                  setCurrentPage(1) || setRecordsPerPage(Number(e.target.value))
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
                <th>Name</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees && filteredEmployees.length > 0 ? (
                records.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td>
                        <Link to={"/edit"}>
                          <Button
                            onClick={() =>
                              handleEdit(item.id, item.name, item.age)
                            }
                          >
                            EDIT
                          </Button>
                        </Link>
                        &nbsp;
                        <Button onClick={() => handleDelete(item.id)}>
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
            <Button variant="primary" size="lg">
              Create
            </Button>
          </Link>
        </div>
      </Fragment>
    </div>
  );
}

export default Tabel;
