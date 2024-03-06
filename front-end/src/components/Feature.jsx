<<<<<<< HEAD
const Feature = ({ smalltext, text, icon, iconBg, href }) => {
=======
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Feature = ({ smalltext, text, icon, iconBg }) => {
>>>>>>> 57b435c (small frontend changes)
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
        <a href={href}>
          <div style={flexStyle}>{icon}</div>
        </a>
        <span style={textStyle}>
          <a href={href} style={{ textDecoration: 'none', color: "#000" }}>
            {text}
          </a>
        </span>
        <span style={smallTextStyle}>{smalltext}</span>
      </div>
    );
  };

  export default Feature