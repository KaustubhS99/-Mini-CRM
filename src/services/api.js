import axios from "axios";

// Axios instance with base URL
const API = axios.create({ baseURL: "http://localhost:5002" });

// Export named functions for API interactions
export const createCustomer = (data) => API.post("/customers", data);
export const fetchCustomers = () => API.get("/customers");
export const createOrder = (data) => API.post("/orders", data);
export const fetchOrders = () => API.get("/orders");
export const createAudience = (data) => API.post("/api/audiences", data);
export const fetchAudiences = () => API.get("/api/audiences");
export const sendCampaign = (data) => API.post("/api/campaigns/send", data);
export const fetchCampaigns = () => API.get("/api/campaigns");
