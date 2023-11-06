import React, { useState, useEffect, useRef } from 'react';
import './Tooltip.css';

const Tooltip = ({ text, children }) => {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipText = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (showTooltip) {

        let tooltipWidth;
        if (tooltipText.current) tooltipWidth = tooltipText.current.offsetWidth;

        const cursorX = e.clientX;
        const cursorY = e.clientY + window.scrollY;

        // center tooltip
        const left = (cursorX - tooltipWidth / 2) + 5;
        const top = cursorY + 10; // position is under the cursor

        setTooltipPosition({ top, left });

      } else {
        // Set the tooltip position to a dummy position to prevent flashing
        setTooltipPosition({ top: -100, left: -100 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
    };
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
      {showTooltip && tooltipPosition && (
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
