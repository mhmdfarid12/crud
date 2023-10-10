import "../css/Profile.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profil = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState();
  const [role, setRole] = useState();

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
      console.log(account);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const riquest = {
      email: email,
      username: username,
      role: role,
    };
    try {
      const respons = await axios.put(
        `http://localhost:1234/accounts/${localStorage.getItem("id")}`,
        riquest
      );
      const resData = respons.data;
      setEmail(resData.email);
      setUsername(resData.username);
      setRole(resData.role);
    } catch (error) {}
  };

  useEffect(() => {
    getAccounts();
  }, [email, username, role, avatarUrl]);

  const kembali = () => {
    navigate(-1);
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
        style={{ transform: "translate(-710px, 20px)" }}
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
          <div class="container bootstrap snippets bootdeys">
            <div class="row">
              <div class="col-xs-12 col-sm-9">
                <form class="form-horizontal">
                  <div class="panel panel-default">
                    <div class="profil">
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
                        class="img-circle profile-avatar"
                        alt="User avatar"
                      />
                    </div>
                  </div>
                  <div class="kolom">
                    <div class="panel-heading">
                      <h1
                        style={{
                          textAlign: "center",
                          transform: "translate(15%, -50%)",
                        }}
                        class="panel-title"
                      >
                        MY PROFILE
                      </h1>
                    </div>
                    <div class="panel-body">
                      <div class="form-group">
                        <label
                          class="col-sm-2 control-label"
                          style={{
                            transform: "translate(-200%, -50%)",
                          }}
                        >
                          USERNAME:
                        </label>
                        <br></br>
                        <div class="col-sm-10">
                          <input
                            style={{
                              width: "400px",
                              height: "60px",
                              borderRadius: "20px",
                            }}
                            value={username}
                            type="text"
                            class="form-control"
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label
                          class="col-sm-2 control-label"
                          style={{
                            transform: "translate(-200%, -10%)",
                          }}
                        >
                          EMAIL:
                        </label>
                        <div class="col-sm-10">
                          <input
                            style={{
                              width: "400px",
                              height: "60px",
                              borderRadius: "20px",
                            }}
                            value={email}
                            type="text"
                            class="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label
                          class="col-sm-2 control-label"
                          style={{
                            transform: "translate(-200%, -10%)",
                          }}
                        >
                          ROLE:
                        </label>
                        <div class="col-sm-10">
                          <input
                            style={{
                              width: "400px",
                              height: "60px",
                              borderRadius: "20px",
                            }}
                            value={role}
                            type="text"
                            class="form-control"
                            onChange={(e) => setRole(e.target.value)}
                          />
                          <button
                            style={{
                              transform: "translate(-100px, 20px)",
                              borderRadius: "10px",
                              height: "35px",
                              width: "90px",
                              transform: "translate(-65%, -0%)",
                            }}
                            onClick={handleSubmit}
                          >
                            EDIT
                          </button>
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
