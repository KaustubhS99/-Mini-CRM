import React, { useEffect, useState } from "react";
import { fetchCampaigns } from "../services/api";

const CampaignHistory = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCampaigns();
        setCampaigns(response.data);
      } catch (error) {
        console.error(
          "Error fetching campaigns:",
          error.response?.data || error.message
        );
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3>Campaign History</h3>
      <table>
        <thead>
          <tr>
            <th>Audience</th>
            <th>Message</th>
            <th>Total Sent</th>
            <th>Total Failed</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign._id}>
              <td>{campaign.audience_id}</td>
              <td>{campaign.message_template}</td>
              <td>{campaign.stats.total_sent}</td>
              <td>{campaign.stats.total_failed}</td>
              <td>{new Date(campaign.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignHistory;
