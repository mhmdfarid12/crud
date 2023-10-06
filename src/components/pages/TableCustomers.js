import React, { Fragment, useEffect, useState } from "react";
import { Button, Table, Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import axios from "axios";

function TableCustomers() {
  // Tambahkan useNavigate

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [customers, setCustomers] = useState([]);
  // function for supervisor START

  const getCustomers = async () => {
    try {
      const respons = await axios.get("http://localhost:1234/customers");
      const allCustomers = respons.data;
      const filteredCustomers = allCustomers.filter(
        (employee) =>
          employee.name?.toLowerCase().includes(searchTerm?.toLowerCase()) &&
          employee.role !== "supervisor"
      );

      setCustomers(filteredCustomers);
      console.log(filteredCustomers);
    } catch (error) {
      console.log(error);
    }
  };

  const firstIndex = (currentPage - 1) * recordsPerPage;
  const lastIndex = currentPage * recordsPerPage;
  const records = customers.slice(firstIndex, lastIndex);

  const npage = Math.ceil(customers.length / recordsPerPage);
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

  const handleEdit = (id, name, phone, payMethod) => {
    localStorage.setItem("Id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("phone", phone);
    localStorage.setItem("payMethod", payMethod);
  };

  const handleDelete = async (id) => {
    try {
      const respons = await axios.delete(
        `http://localhost:1234/customers/${id}`
      );
      console.log(respons);
      console.log("deleted");
      getCustomers();
    } catch (error) {
      console.log(error);
    }
    navigate("/tableCustomers");
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

  useEffect(() => {
    getCustomers();
  }, []);

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
                  <Nav.Link href="/tableOrders">Table Orders</Nav.Link>

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
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Pay Method</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customers && customers.length > 0 ? (
                  records.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.payMethod}</td>

                        <td>
                          <Link to={`/editCustomers/${item.id}`}>
                            <Button
                              style={{ background: "purple" }}
                              onClick={() =>
                                handleEdit(
                                  item.id,
                                  item.name,
                                  item.phone,
                                  item.payMethod
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
            <Link className="d-grid gap-2" to="/addCustomers">
              <Button style={{ background: "purple" }} size="lg">
                Create
              </Button>
            </Link>
          </div>
        </Fragment>
      </div>
    </div>
  );
}

export default TableCustomers;
