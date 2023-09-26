import logo from "./logo.svg";
import "./App.css";

import Table from "./components/pages/Table";
import Add from "./components/pages/Add";
import Edit from "./components/pages/Edit";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import PrivateHome from "./privateRouter/privateHome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/table"
            element={
              <PrivateHome>
                <Table />
              </PrivateHome>
            }
          />

          <Route
            path="/create"
            element={
              <PrivateHome>
                <Add />
              </PrivateHome>
            }
          />

          <Route
            path="/edit"
            element={
              <PrivateHome>
                <Edit />
              </PrivateHome>
            }
          />

          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <PrivateHome>
                <Home />
              </PrivateHome>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
