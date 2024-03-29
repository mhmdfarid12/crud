import "../css/Profile.css";
import axios from "axios";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";

import { useNavigate } from "react-router-dom";

const Profil = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState();
  const [role, setRole] = useState();

  const [Email, setEMAIL] = useState();
  const [Username, setUSERNAME] = useState("");
  const [AvatarUrl, setAVATARURL] = useState();
  const [Password, setPassword] = useState();

  const getAccounts = async () => {
    try {
      const respons = await axios.get(
        `http://localhost:1234/accounts/${localStorage.getItem("id")}`
      );
      const account = respons.data;
      setEmail(account.email);
      setUsername(account.username);
      setRole(account.role);
      setAvatarUrl(account.avatarUrl);
      setPassword(account.Password);
      console.log(account);
    } catch (error) {
      console.log(error);
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const riquest = {
      email: Email,
      username: Username,
      avatarUrl: AvatarUrl,
      role: role,
      Password: Password,
    };
    try {
      const respons = await axios.put(
        `http://localhost:1234/accounts/${localStorage.getItem("id")}`,
        riquest
      );
      console.log(respons);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccounts();
    setAVATARURL(avatarUrl);
    setUSERNAME(username);
    setEMAIL(email);
  }, [email, username, role, avatarUrl]);

  const kembali = () => {
    navigate(-1);
  };

  const Logout = () => {
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="baground">
        <div>
          <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
            rel="stylesheet"
          />
          <br></br>
          <br></br>
          <div className="container bootstrap snippets bootdeys">
            <div className="row">
              <div className="col-xs-12 col-sm-9">
                <form className="form-horizontal">
                  <div className="panel panel-default">
                    <div className="profil">
                      <br></br>
                      <br></br>
                      <br></br>

                      <div
                        className="bagroundPr"
                        style={{
                          background: "",
                          transform: "translate(-25%, 20%)",
                          borderRadius: "10%",
                          width: "420px",
                          height: "520px",
                          top: "-25px",
                          left: "-3px",

                          position: "absolute",
                        }}
                      >
                        <div
                          style={{
                            background: "grey",

                            borderRadius: "50%",
                            width: "220px",
                            height: "220px",
                            transform: "translate(45%, -60%)",
                            position: "absolute",
                            zIndex: "2",
                          }}
                        >
                          <img
                            style={{
                              display: "flex",
                              justifyContent: "auto",
                              borderRadius: "50%",
                              top: "-105px",
                              transform: "translate(5%, 5%)",
                              width: "200px",
                              height: "200px",

                              zIndex: "2",
                            }}
                            src={
                              avatarUrl !== ""
                                ? avatarUrl
                                : "https://divedigital.id/wp-content/uploads/2021/10/1-min.png"
                            }
                            className="img-circle profile-avatar"
                            alt="User avatar"
                          />
                        </div>
                      </div>
                    </div>{" "}
                  </div>
                  <div className="kolom">
                    <div className="panel-heading">
                      <strong
                        style={{
                          fontSize: "30px",
                          position: "absolute",
                          top: "-60px",
                          left: "80px",
                        }}
                        className="panel-title"
                      >
                        MY PROFILE
                      </strong>
                    </div>
                    <div className="panel-body">
                      <div className="form-group">
                        <label
                          className="col-sm-2 control-label"
                          style={{
                            transform: "translate(-200%, -50%)",
                          }}
                        >
                          USERNAME:
                        </label>
                        <br></br>
                        <div className="col-sm-10">
                          <input
                            style={{
                              height: "60px",
                              width: "350px",
                              borderRadius: "20px",
                            }}
                            value={username}
                            type="text"
                            className="form-control"
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          className="col-sm-2 control-label"
                          style={{
                            transform: "translate(-200%, -10%)",
                          }}
                        >
                          EMAIL:
                        </label>
                        <div className="col-sm-10">
                          <input
                            style={{
                              height: "60px",
                              width: "350px",
                              borderRadius: "20px",
                            }}
                            value={email}
                            type="text"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          className="col-sm-2 control-label"
                          style={{
                            transform: "translate(-200%, -10%)",
                          }}
                        >
                          ROLE:
                        </label>
                        <div className="col-sm-10">
                          <input
                            style={{
                              height: "60px",
                              width: "350px",
                              borderRadius: "20px",
                            }}
                            value={role}
                            type="text"
                            className="form-control"
                            onChange={(e) => setRole(e.target.value)}
                          />
                          <br></br>
                          <div
                            style={{
                              display: "flex",
                              gap: "40px",
                              justifyContent: "center",
                            }}
                          >
                            <Button
                              style={{
                                borderRadius: "10px",
                                height: "40px",
                              }}
                              variant="primary"
                              onClick={handleShow}
                            >
                              EDIT
                            </Button>

                            <Dropdown
                              as={ButtonGroup}
                              style={{
                                height: "40px",
                                borderRadius: "10px",
                                border: "none",

                                color: "white",
                              }}
                            >
                              <Button variant="danger" className="split">
                                Split Button
                              </Button>

                              <Dropdown.Toggle
                                split
                                variant="success"
                                id="dropdown-split-basic"
                              />

                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onClick={kembali}
                                  href="#/action-1"
                                >
                                  Kembali
                                </Dropdown.Item>
                                <Dropdown.Item onClick={Logout}>
                                  Logout
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>EDIT PROFILE</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <div className="form-group">
                                <label className=" control-label">IMAGE:</label>
                                <div className="col-sm-10">
                                  <input
                                    style={{
                                      width: "400px",
                                      height: "60px",
                                      borderRadius: "20px",
                                    }}
                                    value={AvatarUrl}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) =>
                                      setAVATARURL(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                            </Modal.Body>
                            <Modal.Body>
                              <div className="form-group">
                                <label className="col-sm-2 control-label">
                                  USERNAME:
                                </label>
                                <br></br>
                                <div className="col-sm-10">
                                  <input
                                    style={{
                                      width: "400px",
                                      height: "60px",
                                      borderRadius: "20px",
                                    }}
                                    value={Username}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) =>
                                      setUSERNAME(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                            </Modal.Body>
                            <Modal.Body>
                              <div className="form-group">
                                <label className="col-sm-2 control-label">
                                  EMAIL:
                                </label>
                                <div className="col-sm-10">
                                  <input
                                    style={{
                                      width: "400px",
                                      height: "60px",
                                      borderRadius: "20px",
                                    }}
                                    value={Email}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setEMAIL(e.target.value)}
                                  />
                                </div>
                              </div>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                style={{
                                  background: "grey",
                                  borderRadius: "10px",
                                }}
                                variant="secondary"
                                onClick={handleClose}
                              >
                                Close
                              </Button>
                              <Button
                                style={{
                                  background: "grey",
                                  borderRadius: "10px",
                                }}
                                variant="primary"
                                onClick={(e) => handleSubmit(e)}
                              >
                                Save Changes
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
