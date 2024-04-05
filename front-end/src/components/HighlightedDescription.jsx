import React, { useState, useEffect } from 'react';
import HighlightedText from './HighlightedText';

const HighlightedDescription = ({ text, stringToHighlight, styleType }) => {
  const [description, setDescription] = useState(text);

    function truncateToFirstInstance(originalString, subString) {
        const index = originalString.toLowerCase().indexOf(subString.toLowerCase());
        if (index !== -1) {
            return originalString.substring(index);
        }
        return originalString;
    }

  useEffect(() => {
    if (text && stringToHighlight) {
      setDescription(`...${truncateToFirstInstance(text, stringToHighlight)}`);
    } else {
      setDescription(text);
    }
  }, [text, stringToHighlight]);

  return (
    <div>
        <HighlightedText text={description} stringToHighlight={stringToHighlight} styleType={styleType} />
    </div>
  );
};

export default HighlightedDescription;
