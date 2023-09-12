import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const Popup = ({ onClose }) => {
  return (
    <div className="popup p-2" style={{ zIndex: '10000', position: 'absolute', background: 'none'}}>
      <div className="popup-content">
        <button className="close-button-metadata-popup" onClick={onClose}>
        < CloseIcon/>
        </button>
        <iframe title="PDF Viewer" src="/User_manual_frontpage.pdf"></iframe>
      </div>
    </div>
  );
};

export default Popup;