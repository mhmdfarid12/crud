import "../css/Profile.css";
import axios from "axios";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
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
        backgroundColor: "white",

        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <button
        onClick={kembali}
        style={{
          transform: "translate(-755px, 10px)",

          height: "40px",
          borderRadius: "10px",
          backgroundColor: "red",
          color: "white",
        }}
      >
        kembali
      </button>
      <br></br>
      <br></br>
      <br></br>
      <div className="baground">
        <div>
          <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
            rel="stylesheet"
          />
          <br></br>
          <div className="container bootstrap snippets bootdeys">
            <div className="row">
              <div className="col-xs-12 col-sm-9">
                <form className="form-horizontal">
                  <div className="panel panel-default">
                    <div className="profil">
                      <br></br>
                      <img
                        style={{
                          display: "flex",
                          justifyContent: "auto",
                          borderRadius: "50%",
                          width: "200px",
                          height: "200px",
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
                  <div className="kolom">
                    <div className="panel-heading">
                      <h1
                        style={{
                          textAlign: "center",
                          transform: "translate(15%, -50%)",
                        }}
                        className="panel-title"
                      >
                        MY PROFILE
                      </h1>
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
                              width: "400px",
                              height: "60px",
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
                              width: "400px",
                              height: "60px",
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
                              width: "400px",
                              height: "60px",
                              borderRadius: "20px",
                            }}
                            value={role}
                            type="text"
                            className="form-control"
                            onChange={(e) => setRole(e.target.value)}
                          />
                          <br></br>

                          <Button
                            style={{
                              borderRadius: "10px",
                              height: "40px",
                              transform: "translate(-100%, -50%)",
                            }}
                            variant="primary"
                            onClick={handleShow}
                          >
                            EDIT
                          </Button>
                          <button
                            onClick={Logout}
                            style={{
                              transform: "translate(-65%, -50%)",
                              height: "40px",
                              borderRadius: "10px",
                              backgroundColor: "red",
                              color: "white",
                            }}
                          >
                            LOGOUT
                          </button>

                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Modal heading</Modal.Title>
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
                                  background: "purple",
                                  borderRadius: "10px",
                                }}
                                variant="secondary"
                                onClick={handleClose}
                              >
                                Close
                              </Button>
                              <Button
                                style={{
                                  background: "purple",
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
