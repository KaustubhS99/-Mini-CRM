import React from "react";
import SendCampaign from "../components/SendCampaign";
import CampaignHistory from "../components/CampaignHistory";

const CampaignManagement = () => {
  return (
    <div>
      <h2>Campaign Management</h2>
      <SendCampaign />
      <CampaignHistory />
    </div>
  );
};

export default CampaignManagement;
