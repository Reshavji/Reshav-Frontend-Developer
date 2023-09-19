import React, { useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import '../Header.css';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ isOpen, onClose }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Use a timeout for each item with incremental delays (e.g., 500ms, 1000ms)
      setTimeout(() => {
        setAnimate(true);
      }, 500);

      setTimeout(() => {
        setAnimate(true);
      }, 1000);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className='close-btn' onClick={onClose}>
        <CloseIcon />
      </div>
      <ul>
      <Link to="/rockets"><li className={`menu-item ${animate ? 'animate' : ''}`}>Rockets</li></Link>
            <Link to="/capsules"><li className={`menu-item ${animate ? 'animate' : ''}`}>Capsules</li></Link>
      </ul>
    </div>
  );
}

export default Sidebar;
