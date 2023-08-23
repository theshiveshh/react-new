import React, { useState, useEffect } from 'react';
import './Tooltip.css';

const Tooltip = ({ position, text, style, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const tooltipStyle = {
    display: showTooltip ? 'block' : 'none',
    ...style,
  };

  const tooltipArrowStyle = {
    display: showTooltip ? 'block' : 'none',
  };

  return (
    <div
      className={`tooltip-container ${position}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div className={`tooltip ${position}`} style={tooltipStyle}>
        <div className={`tooltip-arrow ${position}`} style={tooltipArrowStyle} />
        {text}
      </div>
    </div>
  );
};

export default Tooltip;