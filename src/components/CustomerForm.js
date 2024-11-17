import React, { useState } from "react";
import { createCustomer } from "../services/api";

const CustomerForm = () => {
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCustomer(customer);
      alert("Customer added successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={customer.name}
        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={customer.email}
        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Phone"
        value={customer.phone}
        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
      />
      <button type="submit">Add Customer</button>
    </form>
  );
};

export default CustomerForm;
