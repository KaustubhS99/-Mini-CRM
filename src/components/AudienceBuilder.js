import React, { useState } from "react";
import { createAudience } from "../services/api";

const AudienceBuilder = () => {
  const [name, setName] = useState("");
  const [conditions, setConditions] = useState([]);
  const [condition, setCondition] = useState({
    field: "",
    operator: "",
    value: "",
  });

  const addCondition = () => {
    setConditions([...conditions, condition]);
    setCondition({ field: "", operator: "", value: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const conditionObj = conditions.reduce((acc, curr) => {
      acc[curr.field] = { [curr.operator]: curr.value };
      return acc;
    }, {});

    try {
      const response = await createAudience({
        name,
        conditions: conditionObj,
      });
      alert(`Audience created successfully! Size: ${response.data.size}`);
      setName("");
      setConditions([]);
    } catch (error) {
      console.error(
        "Error creating audience:",
        error.response?.data || error.message
      );
      alert("Failed to create audience. Check console for details.");
    }
  };

  return (
    <div>
      <h3>Create Audience</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Audience Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div>
          <h4>Add Condition</h4>
          <select
            value={condition.field}
            onChange={(e) =>
              setCondition({ ...condition, field: e.target.value })
            }
          >
            <option value="">Select Field</option>
            <option value="total_spending">Total Spending</option>
            <option value="visits">Visits</option>
            <option value="last_visit">Last Visit</option>
          </select>
          <select
            value={condition.operator}
            onChange={(e) =>
              setCondition({ ...condition, operator: e.target.value })
            }
          >
            <option value="">Select Operator</option>
            <option value="$gt">Greater Than</option>
            <option value="$lt">Less Than</option>
            <option value="$lte">Less Than or Equal</option>
            <option value="$gte">Greater Than or Equal</option>
            <option value="$eq">Equals</option>
          </select>
          <input
            type="text"
            placeholder="Value"
            value={condition.value}
            onChange={(e) =>
              setCondition({ ...condition, value: e.target.value })
            }
          />
          <button type="button" onClick={addCondition}>
            Add Condition
          </button>
        </div>
        <ul>
          {conditions.map((cond, index) => (
            <li key={index}>
              {cond.field} {cond.operator} {cond.value}
            </li>
          ))}
        </ul>
        <button type="submit">Create Audience</button>
      </form>
    </div>
  );
};

export default AudienceBuilder;
