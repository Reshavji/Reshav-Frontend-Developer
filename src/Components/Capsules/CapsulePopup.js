import React from 'react';
import './CapsulePopup.css'; // Create CSS for styling the popup
import Capsule from '../Capsule/Capsule'; // Import the Capsule component

function CapsulePopup({ isOpen, onClose, capsuleSerial }) {
  return (
    <div className={`capsule-popup${isOpen ? ' open' : ''}`}>
      <div className="capsule-popup-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        {isOpen && <Capsule capsule_serial={capsuleSerial} />} {/* Render the Capsule component if isOpen is true */}
      </div>
    </div>
  );
}

export default CapsulePopup;
