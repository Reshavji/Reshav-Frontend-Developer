import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Slider from '../Slider/Slider';
import Rocketpopup from './Rocketpopup'; // Import your RocketPopup component
import './Rockets.css'; // Import your CSS file for styling

function Rockets() {
  const [rockets, setRockets] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [rocketId, setRocketId] = useState(null);

  useEffect(() => {
    // Fetch data from the SpaceX API
    axios
      .get('https://api.spacexdata.com/v3/rockets')
      .then((response) => {
        setRockets(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const openRocketPopup = (rocket) => {
    setRocketId(rocket.rocket_id); // Set the rocket ID in the state
    setIsPopupOpen(true);
  };

  const closeRocketPopup = () => {
    setRocketId(null); // Reset the rocket ID when closing the popup
    setIsPopupOpen(false);
  };

  return (
    <div className="contain">
      <div className="inner-container">
        <Slider />
        <div className="data">
          <h2 className="rocket">ROCKETS</h2>
          <Grid container spacing={2}>
            {rockets.map((rocket) => (
              <Grid item key={rocket.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  className="rocket-card"
                  onClick={() => {
                    openRocketPopup(rocket);
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {rocket.rocket_name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" className="description">
                      Country: {rocket.country}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" className="description">
                      Description: {rocket.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>

      <Rocketpopup
        isOpen={isPopupOpen}
        onClose={closeRocketPopup}
        rocketId={rocketId} // Pass the selected rocket ID as a prop
      />
    </div>
  );
}

export default Rockets;
