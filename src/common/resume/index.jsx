import './resume.css';

import React from 'react';

export default function Resume(props) {
  const { text, lines } = props;

  return (
    <div className="resume" style={ { WebkitLineClamp: lines || 3 } }>      
      { text }
    </div>
  );
}
