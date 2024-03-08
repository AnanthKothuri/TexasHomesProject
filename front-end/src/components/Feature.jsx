import React from 'react'
const Feature = ({ smalltext, text, icon, iconBg }) => {
    const stackStyle = {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    };
  
    const flexStyle = {
      width: '32px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      backgroundColor: iconBg,
    };
  
    const textStyle = {
      fontWeight: 600,
    };
  
    const smallTextStyle = {
      fontWeight: 200,
    };
  
    return (
      <div style={stackStyle}>
        <div style={flexStyle}>{icon}</div>
        <span style={textStyle}>{text}</span>
        <span style={smallTextStyle}>{smalltext}</span>
      </div>
    );
  };

  export default Feature