import React, { useState, useEffect } from 'react';
import Colors from '../assets/Colors';

const HighlightedText = ({ text, stringToHighlight, styleType }) => {
  const [parts, setParts] = useState([]);

  useEffect(() => {
    if (text && stringToHighlight) {
      const newParts = text.split(new RegExp(`(${stringToHighlight})`, 'gi'));
      setParts(newParts);
    } else {
      setParts([]);
    }
  }, [text, stringToHighlight]);

  return (
    <div>
      {/* Render the text with highlighted string */}
      { !stringToHighlight ? (
          <p style={{...styleType, margin: 0}}>{text}</p>
        ) : (
          parts.map((part, index) => (
            part.toLowerCase() === stringToHighlight.toLowerCase() ? (
              <span key={index} style={{...styleType, backgroundColor: Colors.lightYellow, borderRadius: 5 }}>{part}</span>
            ) : (
              <span key={index} style={styleType}>{part}</span>
            )
          ))
        )
      }
    </div>
  );
};

export default HighlightedText;
