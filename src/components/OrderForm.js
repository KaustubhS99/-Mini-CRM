import React, { useState } from "react";
import axios from "axios";

const OrderForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // New state for phone
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending customer data:", { name, email, phone });
      const customerResponse = await axios.post(
        "http://localhost:5002/customers",
        {
          name,
          email,
          phone, // Include phone in the request payload
        }
      );
      console.log("Customer Response:", customerResponse.data);

      const customerId = customerResponse.data._id;

      console.log("Sending order data:", { customer_id: customerId, amount });
      const orderResponse = await axios.post("http://localhost:5002/orders", {
        customer_id: customerId,
        amount,
      });
      console.log("Order Response:", orderResponse.data);

      alert("Order created successfully!");
      setName("");
      setEmail("");
      setPhone(""); // Reset phone input
      setAmount("");
    } catch (error) {
      console.error(
        "Error creating order:",
        error.response?.data || error.message
      );
      alert("Failed to create order. Check the console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <input
        type="text"
        placeholder="Customer Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{ margin: "5px" }}
      />
      <input
        type="email"
        placeholder="Customer Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ margin: "5px" }}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)} // Add phone input
        required
        style={{ margin: "5px" }}
      />
      <input
        type="number"
        placeholder="Order Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        style={{ margin: "5px" }}
      />
      <button type="submit">Add Order</button>
    </form>
  );
};

export default OrderForm;
