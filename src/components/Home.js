import React, { Fragment, useState } from "react";
import { Button, Table, Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Employees from "./Employees";

import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const firstIndex = (currentPage - 1) * recordsPerPage;
  const lastIndex = currentPage * recordsPerPage;
  const records = Employees.slice(firstIndex, lastIndex);

  const npage = Math.ceil(Employees.length / recordsPerPage);
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

  return (
    <Fragment>
      <div style={{ margin: "10rem" }}>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Employees && Employees.length > 0 ? (
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
  );
}

export default Home;
