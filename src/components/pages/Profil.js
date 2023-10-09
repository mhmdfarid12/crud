import "../css/Profile.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profil = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState("");
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
      console.log(account);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccounts();
  }, [email, username, role]);

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
                        src="https://divedigital.id/wp-content/uploads/2021/10/1-min.png"
                        class="img-circle profile-avatar"
                        alt="User avatar"
                      />
                    </div>
                  </div>
                  <div class="kolom">
                    <div class="panel-heading">
                      <h1 style={{ textAlign: "center" }} class="panel-title">
                        MY PROFILE
                      </h1>
                    </div>
                    <div class="panel-body">
                      <div class="form-group">
                        <label class="col-sm-2 control-label">USERNAME</label>
                        <div class="col-sm-10">
                          <input
                            value={username}
                            type="text"
                            class="form-control"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">EMAIL</label>
                        <div class="col-sm-10">
                          <input
                            value={email}
                            type="text"
                            class="form-control"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">ROLE</label>
                        <div class="col-sm-10">
                          <input
                            value={role}
                            type="text"
                            class="form-control"
                          />
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
