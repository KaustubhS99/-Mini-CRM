import React from "react";
import CustomerForm from "./components/CustomerForm";
import OrderForm from "./components/OrderForm";

function App() {
  return (
    <div style={{ margin: "20px", textAlign: "center" }}>
      <h1>CRM App</h1>
      <CustomerForm />
      <OrderForm />
    </div>
  );
}

export default App;
