import React, { useState, useRef, useEffect } from 'react';
function Collapsible({ title, children, style }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isExpanded
        ? `${contentRef.current.scrollHeight}px`
        : '0px';
    }
  }, [isExpanded]);
  const defaultStyle = {
    cursor: 'pointer',
    overflow: 'hidden',
    transition: 'max-height 0.3s ease',
  };
  const combinedStyle = { ...defaultStyle, ...style };
  return (
    <div>
      <div onClick={toggleExpansion} style={{ ...combinedStyle, maxHeight: 'none' }}>
        <p>{title}</p>
      </div>
      <div ref={contentRef} style={combinedStyle}>
        {children}
      </div>
    </div>
  );
}
export default Collapsible;