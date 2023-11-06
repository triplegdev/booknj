import React, { useState, useEffect, useRef } from 'react';
import './Tooltip.css';

const Tooltip = ({ text, children }) => {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipText = useRef();

  const handleMouseMove = (e) => {
      let tooltipWidth;
      if (tooltipText.current) tooltipWidth = tooltipText.current.offsetWidth;

      const cursorX = e.clientX;
      const cursorY = e.clientY + window.scrollY;
      // console.log('cursorX', cursorX)

      // center tooltip
      const left = (cursorX - tooltipWidth / 2) + 5;
      const top = cursorY + 10; // position is under the cursor

      setTooltipPosition({ top, left });
  }

  useEffect(() => {
    if (showTooltip) {
      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    }
    // Set the tooltip position to a dummy position to prevent flashing
    setTooltipPosition({ top: -100, left: -100 });
  }, [showTooltip]);


  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className="tooltip-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip && (
        <div
          className="tooltip-text"
          style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
          ref={tooltipText}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
