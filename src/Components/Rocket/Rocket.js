import React, { useEffect, useState } from 'react';
import './Rocket.css'; // Import your CSS file for styling

function Rocket({ rocket_id }) {
  // Define state to store the fetched rocket data
  const [rocketData, setRocketData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Construct the API URL using the rocket_id
  const apiUrl = `https://api.spacexdata.com/v3/rockets/${rocket_id}`;

  // Use the useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setRocketData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [apiUrl]);

  // Render the fetched data
  if (isLoading) {
    return <div className="rocket-loading">Loading...</div>;
  }

  if (error) {
    return <div className="rocket-error">Error: {error.message}</div>;
  }

  if (!rocketData) {
    return <div className="rocket-no-data">No data available for this rocket.</div>;
  }

  return (
    <div className="rocket-details">
      <h2 className="rocket-title">Rocket Details</h2>
      <p className="rocket-field">
        <span className="rocket-header">Rocket ID:</span> {rocketData.rocket_id}
      </p>
      <p className="rocket-field">
        <span className="rocket-header">Rocket Name:</span> {rocketData.rocket_name}
      </p>
      <p className="rocket-field">
        <span className="rocket-header">Country:</span> {rocketData.country}
      </p>
      <p className="rocket-field">
        <span className="rocket-header">Description:</span> {rocketData.description}
      </p>
      
      {/* Additional Data Fields */}
      <p className="rocket-field">
        <span className="rocket-header">Stages:</span> {rocketData.stages}
      </p>
      <p className="rocket-field">
        <span className="rocket-header">Cost per Launch:</span> {rocketData.cost_per_launch}
      </p>
      <p className="rocket-field">
        <span className="rocket-header">Success Rate (%):</span> {rocketData.success_rate_pct}
      </p>
      <p className="rocket-field">
        <span className="rocket-header">First Flight:</span> {rocketData.first_flight}
      </p>
      {/* Add more fields as needed */}
    </div>
  );
}

export default Rocket;
