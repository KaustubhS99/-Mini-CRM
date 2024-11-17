import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5002" });

export const createCustomer = (data) => API.post("/customers", data);
export const createOrder = (data) => API.post("/orders", data);
export const fetchCustomers = () => API.get("/customers");
export const fetchOrders = () => API.get("/orders");
