import React from 'react';
import Rocket from '../Rocket/Rocket';

function RocketPopup({ isOpen, onClose, rocketId }) {
  return (
    <div className={`capsule-popup${isOpen ? ' open' : ''}`}>
      <div className="capsule-popup-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        {isOpen && <Rocket rocket_id={rocketId} />} {/* Render the Rocket component if isOpen is true */}
      </div>
    </div>
  );
}

export default RocketPopup;
