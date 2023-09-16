import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CapsulePopup from "./CapsulePopup"
import './Capsules.css';

function Capsules() {
  const [capsules, setCapsules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [statusFilter, setStatusFilter] = useState('');
  const [launchDateFilter, setLaunchDateFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCapsuleSerial, setSelectedCapsuleSerial] = useState(null);

  const openPopup = (capsuleSerial) => {
    setSelectedCapsuleSerial(capsuleSerial);
    setIsPopupOpen(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setSelectedCapsuleSerial(null);
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const apiUrl = 'https://api.spacexdata.com/v3/capsules';

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCapsules(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

 
  const imageUrls = [
    'https://sxcontent9668.azureedge.us/cms-assets/assets/Star_5_12_DSC_6998_desktop_563b34ba45.jpg',
    'https://sxcontent9668.azureedge.us/cms-assets/assets/Mission_launches_47d27b48e1.jpg',
    'https://sxcontent9668.azureedge.us/cms-assets/assets/PSN_Satria_curbh_DSC_2969_desktop_b183afee3c.jpg',
    'https://sxcontent9668.azureedge.us/cms-assets/assets/Star5_11_Star5_11_DSC_6815_desktop_3ed52beef0.jpg',
    'https://sxcontent9668.azureedge.us/cms-assets/assets/LAUNCH_CRS_27_Desktop_6d7404f50b.png',
    'https://sxcontent9668.azureedge.us/cms-assets/assets/MISSION_LAUNCH_desktop_46ec0834ce.jpg',
    'https://www.spacex.com/static/images/backgrounds-2021/sl4-3/post-launch/Starlink4-3_desktop_launches.jpg',
    'https://sxcontent9668.azureedge.us/cms-assets/assets/Star_5_12_DSC_6998_desktop_563b34ba45.jpg',
    'https://sxcontent9668.azureedge.us/cms-assets/assets/Mission_launches_47d27b48e1.jpg',
    'https://sxcontent9668.azureedge.us/cms-assets/assets/PSN_Satria_curbh_DSC_2969_desktop_b183afee3c.jpg',
    'https://sxcontent9668.azureedge.us/cms-assets/assets/Star5_11_Star5_11_DSC_6815_desktop_3ed52beef0.jpg',
    'https://sxcontent9668.azureedge.us/cms-assets/assets/LAUNCH_CRS_27_Desktop_6d7404f50b.png',
    'https://sxcontent9668.azureedge.us/cms-assets/assets/MISSION_LAUNCH_desktop_46ec0834ce.jpg',
    'https://www.spacex.com/static/images/backgrounds-2021/sl4-3/post-launch/Starlink4-3_desktop_launches.jpg',
    'https://sxcontent9668.azureedge.us/cms-assets/assets/Star_5_12_DSC_6998_desktop_563b34ba45.jpg',
    'https://sxcontent9668.azureedge.us/cms-assets/assets/Mission_launches_47d27b48e1.jpg',
    'https://sxcontent9668.azureedge.us/cms-assets/assets/PSN_Satria_curbh_DSC_2969_desktop_b183afee3c.jpg',
    'https://sxcontent9668.azureedge.us/cms-assets/assets/Star5_11_Star5_11_DSC_6815_desktop_3ed52beef0.jpg',
    'https://sxcontent9668.azureedge.us/cms-assets/assets/LAUNCH_CRS_27_Desktop_6d7404f50b.png',
  ];

  const formatLaunchDate = (timestamp) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  };



  return (
    <div className="capsules-container">
      <div className='capsule-img'>LAUNCHES</div>
      {/* <div className="number">{count}</div> */}
        <div className="search-form">
        <div className='search-input'>
          <TextField
            label="Status"
            variant="outlined"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
          <TextField
            label="Launch Date"
            variant="outlined"
            value={launchDateFilter}
            onChange={(e) => setLaunchDateFilter(e.target.value)}
          />
          <TextField
            label="Type"
            variant="outlined"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          />
        </div>
      </div>

      <Grid container spacing={2}>
        {capsules
          .filter((capsule) => {
            const statusMatch =
              statusFilter === '' || capsule.status.toLowerCase() === statusFilter.toLowerCase();
            const launchDateMatch =
              launchDateFilter === '' || formatLaunchDate(capsule.original_launch) === launchDateFilter;
            const typeMatch = typeFilter === '' || capsule.type.toLowerCase() === typeFilter.toLowerCase();

            return statusMatch && launchDateMatch && typeMatch;
          })
          .map((capsule, index) => (
            <Grid item key={capsule.capsule_serial} xs={12} sm={6} md={6} lg={6}>
              <Paper className="capsule-box">
                <img src={imageUrls[index]} alt={capsule.capsule_serial} className="capsule-image" />
                <div className="capsule-details">
                <Typography variant="h6">
                    Launch Date: {formatLaunchDate(capsule.original_launch)}
                    <span className='cap-type'>Types: {capsule.type}</span>
                  </Typography>
                  <Typography variant="h4">{capsule.details || 'STARLINK MISSION'}</Typography>
                </div>
                <button
                  className="home-btn"
                  onClick={() => openPopup(capsule.capsule_serial)}
                >
                  LEARN MORE
                </button>
              </Paper>
            </Grid>
          ))}
      </Grid>
        <CapsulePopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        capsuleSerial={selectedCapsuleSerial}
      />
    </div>
  );
}

export default Capsules;
