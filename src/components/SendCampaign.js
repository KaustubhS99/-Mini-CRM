import React, { useEffect, useState } from "react";
import { sendCampaign, fetchAudiences } from "../services/api";

const SendCampaign = () => {
  const [audiences, setAudiences] = useState([]);
  const [selectedAudience, setSelectedAudience] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAudiences();
        setAudiences(response.data);
      } catch (error) {
        console.error(
          "Error fetching audiences:",
          error.response?.data || error.message
        );
      }
    };

    fetchData();
  }, []);

  const handleSendCampaign = async () => {
    try {
      const response = await sendCampaign({
        audience_id: selectedAudience,
        message_template: message,
      });
      console.log("Campaign sent:", response.data);
    } catch (error) {
      console.error(
        "Error sending campaign:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <h3>Send Campaign</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendCampaign();
        }}
      >
        <select
          value={selectedAudience}
          onChange={(e) => setSelectedAudience(e.target.value)}
          required
        >
          <option value="">Select Audience</option>
          {audiences.map((audience) => (
            <option key={audience._id} value={audience._id}>
              {audience.name}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Message Template"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Send Campaign</button>
      </form>
    </div>
  );
};

export default SendCampaign;
