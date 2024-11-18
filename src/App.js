import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CustomerForm from "./components/CustomerForm";
import OrderForm from "./components/OrderForm";
import AudienceManagement from "./pages/AudienceManagement";
import CampaignManagement from "./pages/CampaignManagement";

function App() {
  return (
    <Router>
      <div style={{ margin: "20px", textAlign: "center" }}>
        <h1>CRM App</h1>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ margin: "10px" }}>
            Customer Form
          </Link>
          <Link to="/order-form" style={{ margin: "10px" }}>
            Order Form
          </Link>
          <Link to="/audience-management" style={{ margin: "10px" }}>
            Audience Management
          </Link>
          <Link to="/campaign-management" style={{ margin: "10px" }}>
            Campaign Management
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<CustomerForm />} />
          <Route path="/order-form" element={<OrderForm />} />
          <Route path="/audience-management" element={<AudienceManagement />} />
          <Route path="/campaign-management" element={<CampaignManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
