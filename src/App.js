import logo from "./logo.svg";
import "./App.css";

import Table from "./components/pages/Table";
import Add from "./components/pages/Add";
import Edit from "./components/pages/Edit";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import TableOrders from "./components/pages/TableOrders";
import TableCustomers from "./components/pages/TableCustomers";
import PrivateHome from "./privateRouter/privateHome";
import EditCustomers from "./components/pages/EditCustomers";
import AddCustomers from "./components/pages/AddCustomers";
import EditOrders from "./components/pages/EditOrders";
import AddOrders from "./components/pages/AddOrders";
import Profile from "./components/pages/Profil";

import ReportSewa from "./components/pages/ReportSewa";
import AddReportSewa from "./components/pages/AddReportSewa";
import EditReportSewa from "./components/pages/EditReportSewa";
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
            path="/edit/:id"
            element={
              <PrivateHome>
                <Edit />
              </PrivateHome>
            }
          />
          <Route
            path="/tableOrders"
            element={
              <PrivateHome>
                <TableOrders />
              </PrivateHome>
            }
          />
          <Route
            path="/tableCustomers"
            element={
              <PrivateHome>
                <TableCustomers />
              </PrivateHome>
            }
          />
          <Route
            path="/editCustomers/:id"
            element={
              <PrivateHome>
                <EditCustomers />
              </PrivateHome>
            }
          />
          <Route
            path="/addCustomers"
            element={
              <PrivateHome>
                <AddCustomers />
              </PrivateHome>
            }
          />
          <Route
            path="/editOrders/:id"
            element={
              <PrivateHome>
                <EditOrders />
              </PrivateHome>
            }
          />
          <Route
            path="/addOrders"
            element={
              <PrivateHome>
                <AddOrders />
              </PrivateHome>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateHome>
                <Profile />
              </PrivateHome>
            }
          />
          <Route
            path="/reportSewa"
            element={
              <PrivateHome>
                <ReportSewa />
              </PrivateHome>
            }
          />
          <Route
            path="/addReportSewa"
            element={
              <PrivateHome>
                <AddReportSewa />
              </PrivateHome>
            }
          />
          <Route
            path="/editReportSewa/:id"
            element={
              <PrivateHome>
                <EditReportSewa />
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
