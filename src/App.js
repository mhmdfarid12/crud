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
