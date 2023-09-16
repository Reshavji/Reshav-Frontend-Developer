import React, { useEffect, useState } from 'react';
import './Capsule.css';

function Capsule({ capsule_serial }) {
  // Define state to store the fetched data
  const [capsuleData, setCapsuleData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Construct the API URL using capsule_serial from props
  const apiUrl = `https://api.spacexdata.com/v3/capsules/${capsule_serial}`;

  // Use the useEffect hook to fetch data
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCapsuleData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [apiUrl]);

  // Render the fetched data
  if (isLoading) {
    return <div className="capsule-loading">Loading...</div>;
  }

  if (error) {
    return <div className="capsule-error">Error: {error.message}</div>;
  }

  if (!capsuleData) {
    return <div className="capsule-no-data">No data available for this capsule.</div>;
  }

  return (
    <div className="capsule-details">
      <h2 className="capsule-title">Capsule Details</h2>
      <p className="capsule-data">
        <strong>Capsule Serial:</strong> {capsuleData.capsule_serial}
      </p>
      <p className="capsule-data">
        <strong>Capsule ID:</strong> {capsuleData.capsule_id}
      </p>
      <p className="capsule-data">
        <strong>Status:</strong> {capsuleData.status}
      </p>
      <p className="capsule-data">
        <strong>Original Launch Date:</strong>{' '}
        {new Date(capsuleData.original_launch).toLocaleDateString()}
      </p>
      <p className="capsule-data">
        <strong>Missions:</strong>{' '}
        {capsuleData.missions
          .map((mission) => `${mission.name} (Flight ${mission.flight})`)
          .join(', ')}
      </p>
      <p className="capsule-data">
        <strong>Landings:</strong> {capsuleData.landings}
      </p>
      <p className="capsule-data">
        <strong>Type:</strong> {capsuleData.type}
      </p>
      <p className="capsule-data">
        <strong>Details:</strong> {capsuleData.details || 'N/A'}
      </p>
      <p className="capsule-data">
        <strong>Reuse Count:</strong> {capsuleData.reuse_count}
      </p>
    </div>
  );
}

export default Capsule;
